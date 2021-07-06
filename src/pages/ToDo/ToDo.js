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
            tilte: "Done",
            id: "done",
            todos: []
        }
    }


    const [todoLists, setTodoLists] = useState(initial)

    const moveHandler = data => {
        const { movedItem, hoveredItem, toList } = data

        if(toList){
            console.log({
                movedItem,
                hoveredItem,
                toList 
            })
        } else {
            if(movedItem && hoveredItem){

                const isMovingInSameList = movedItem.todoListId === hoveredItem.todoListId

                if(isMovingInSameList){
                    const updatedList = todoLists[movedItem.todoListId]
                    const updatedContent = updatedList.todos
                    const aux = updatedContent[hoveredItem.index]
                    updatedContent[hoveredItem.index] = updatedContent[movedItem.index]
                    updatedContent[movedItem.index] = aux
                    updatedContent.forEach( (t, index) => {
                        updatedContent[index].index = index
                    })
                    setTodoLists(prev => {
                        return {
                            ...prev,
                            [updatedList.id]: {
                                ...prev[updatedList.id],
                                todos: updatedContent
                            }
                        }
                    })
                } else {
                    console.log("MOVING OUTSIDE", {
                        movedItem,
                        hoveredItem
                    })
                }

           
            }
  
        }
    }

 
    const updateToDosIndex = data => {
        // const updatedTodos = []
        // const splitedToDo = {}
        // data.forEach(i => {
        //     updatedTodos.push(i)
        //     if(splitedToDo[i.parentId]){
        //         splitedToDo[i.parentId].push(i)
        //     } else {
        //         splitedToDo[i.parentId] = [i]
        //     }
        // })
        // Object.keys(splitedToDo).forEach(key => {
        //     splitedToDo[key].forEach((i, newIndex) => {
        //         const foundIndex = updatedTodos.findIndex(a => a.id === i.id)
        //         updatedTodos[foundIndex].index = newIndex
        //     })
        // })
        // return updatedTodos
    }


    const moveCardBetweenList = data => {
        // const updatedTodos = []
        // toDos.forEach(toDo => {
        //     const updatedToDo = {
        //         ...toDo,
        //         parentId: movedToDo.id === toDo.id ? list.id : toDo.parentId
        //     }
        //     updatedTodos.push(updatedToDo)
        // })
        // const formatted = updateToDosIndex(updatedTodos)
        // setToDos(formatted)
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
                        />
                    )
                })}
            </Content>
        </Container>
     )
};

export default ToDo;
