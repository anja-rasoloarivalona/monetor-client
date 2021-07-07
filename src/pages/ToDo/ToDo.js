import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import List from './List'


const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 8rem);
    padding: 2rem;
    color: ${props => props.theme.text};
`

const Header = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.textActive};
`

const HeaderTitle = styled.div``

const Content = styled.div`
    width: 100%;
    display: flex;

    > div {
        margin-right: 2rem;
    }
`



const ToDo = () => {

    const { 
        text: { text }
    } = useSelector(state => state)


    const insertInToArray = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
    ]

    const updateIndexes = arr => {
        const data = [...arr]
        data.forEach((i, index) => {
            data[index].index = index
        })
        return data
    }


    const initial = {
        "todo": {
            title: "To do",
            id: "todo",
            todos: [
                {
                    id: "123(D)AWOD",
                    title: "Groceries",
                    todoListId: "todo",
                    index: 0,
                },
                {
                    id: "456DQWLK",
                    title: "LOl",
                    todoListId: "todo",
                    index: 1,
                },
            ]
        },
        "doing": {
            title: "Doing",
            id: "doing",
            todos: [
                {
                    id: "456DQWLKA",
                    title: "KOC",
                    todoListId: "doing",
                    index: 0
                }
            ]
        },
        "done": {
            title: "Done",
            id: "done",
            todos: []
        }
    }


    const [todoLists, setTodoLists] = useState(initial)
    const [draggedCard, setDraggedCard] = useState(null)




    const moveHandler = data => {
        const { movedItem, hoveredItem, toListId } = data

        if(toListId){
            console.log("ABOUT TO MOVE TO LIST")

            if(!hoveredItem){
                console.log("NO HOVEREDITEM")
                const movedItemIsAlreadyInsideList = todoLists[toListId].todos.findIndex(t => t.id === movedItem.id) > -1
                if(!movedItemIsAlreadyInsideList){
                    const updatedList = moveCardBetweenList(movedItem, null, toListId)
                    setTodoLists(updatedList)
                }
            } else {
                console.log("GOT HOVERED ITEM")
            }
        } else {
            if(movedItem && hoveredItem){

                const isMovingInSameList = movedItem.todoListId === hoveredItem.todoListId

                if(isMovingInSameList){

                    console.log("ABOUT TO MOVE IN SAME LIST")

                    const updatedList = todoLists[movedItem.todoListId]
                    const updatedContent = updatedList.todos
                    const aux = updatedContent[hoveredItem.index]
                    updatedContent[hoveredItem.index] = updatedContent[movedItem.index]
                    updatedContent[movedItem.index] = aux

                    setTodoLists(prev => {
                        return {
                            ...prev,
                            [updatedList.id]: {
                                ...prev[updatedList.id],
                                todos: updateIndexes(updatedContent) 
                            }
                        }
                    })
                } else {

                    console.log("ABOUT TO MOVE OUTSIDE")
                    const movedItemIsAlreadyInsideList = todoLists[hoveredItem.todoListId].todos.findIndex(i => i.id === movedItem.id) > -1
                    
                    if(!movedItemIsAlreadyInsideList){
                        const updatedList = moveCardBetweenList(movedItem, hoveredItem)
                        setTodoLists(updatedList)
                    }

          
                }

           
            }
  
        }
    }


    const moveCardBetweenList = (movedItem, hoveredItem, toListId) => {

        const updatedList = {...todoLists}

        if(movedItem){
            const movedItemListId = movedItem.todoListId
            updatedList[movedItemListId] = {
                ...updatedList[movedItemListId],
                todos: updatedList[movedItemListId].todos.filter(i => i.id !== movedItem.id)
            }
        }

        if(!toListId && hoveredItem){
            const hoveredItemListId = hoveredItem.todoListId
            updatedList[hoveredItemListId] = {
                ...updatedList[hoveredItemListId],
                todos: insertInToArray(updatedList[hoveredItemListId].todos, hoveredItem.index, {
                    ...movedItem,
                    todoListId: hoveredItem.todoListId
                })
            }
        } else {
            updatedList[toListId].todos.push({
                ...movedItem,
                todoListId: toListId
            })
        }

        return updatedList
    }



    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.to_do_title}
                </HeaderTitle>
            </Header>

            
             <Content>
                {Object.keys(todoLists).map(listId => {
                    return (
                        <List 
                            key={listId}
                            list={todoLists[listId]}
                            moveHandler={moveHandler}
                            setDraggedCard={setDraggedCard}
                            draggedCard={draggedCard}
                            todoLists={todoLists}
                        />
                    )
                })}
            </Content>
        </Container>
     )
};

export default ToDo;
