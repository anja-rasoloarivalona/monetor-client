import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import List from './List'
import AddList from './AddList'
import EditForm from "./EditForm/EditForm"
import * as actions from '../../store/actions'
import { insertInToArray } from '../../functions'
import { Loader } from '../../components'

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

    const dispatch = useDispatch()

    const { 
        text: { text },
        user: { todoLists: initial }
    } = useSelector(state => state)


    const updateIndexes = arr => {
        const data = [...arr]
        data.forEach((i, index) => {
            data[index].index = index
        })
        return data
    }

    const [ mounted, setMounted ] = useState(false)
    const [ isInitialized, setIsInitialized ] = useState(false)
    const [ todoLists, setTodoLists ] = useState(null)
    const [ draggedCard, setDraggedCard ] = useState(null)
    const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(false)
    const [ edited, setIsEdited ] = useState(null)


    useEffect(() => {
        setMounted(true)
    },[])

    useEffect(() => {
        if(initial && !isInitialized){
            setTodoLists(initial)
            setIsInitialized(true)
        }
    },[initial])

    useEffect(() => {
        let timeout
        if(mounted){
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if(hasUnsavedChanges){
                    console.log("I M READy")
                }
            }, 1000)
        }
        // dispatch(actions.setTodoLists(todoLists))
    },[todoLists])


    const moveHandler = data => {

        const { movedItem, hoveredItem, toListId } = data

        if(toListId){
            // console.log("ABOUT TO MOVE TO LIST")
            if(!hoveredItem){
                // console.log("NO HOVEREDITEM")
                const movedItemIsAlreadyInsideList = todoLists[toListId].todos.findIndex(t => t.id === draggedCard.id) > -1
                if(!movedItemIsAlreadyInsideList){
                    const updatedList = moveCardBetweenList(draggedCard, null, toListId)
                    setTodoLists(updatedList)
                    setDraggedCard(prev => ({
                        ...prev,
                        todoListId: toListId
                    }))
                }
            }
        } else {
            if(draggedCard && hoveredItem){
                const isMovingInSameList = draggedCard.todoListId === hoveredItem.todoListId
                if(isMovingInSameList){
                    const updatedList = todoLists[draggedCard.todoListId]
                    const updatedContent = updatedList.todos
                    const aux = updatedContent[hoveredItem.index]
                    updatedContent[hoveredItem.index] = updatedContent[draggedCard.index]
                    updatedContent[draggedCard.index] = aux
                    const res = {
                        ...todoLists,
                        [updatedList.id]: {
                            ...todoLists[updatedList.id],
                            todos: updateIndexes(updatedContent) 
                        }
                    }
                    // console.log("ABOUT TO MOVE IN SAME LIST", {
                    //     draggedCard,
                    //     hoveredItem,
                    //     todoLists,
                    //     updatedList: res
                    // })
                    setTodoLists(res)
                } else {
                    const movedItemIsAlreadyInsideList = todoLists[hoveredItem.todoListId].todos.findIndex(i => i.id === draggedCard.id) > -1
                    if(!movedItemIsAlreadyInsideList){
                        const updatedList = moveCardBetweenList(draggedCard, hoveredItem)
                        // console.log("ABOUT TO MOVE OUTSIDE", {
                        //     draggedCard,
                        //     hoveredItem,
                        //     todoLists,
                        //     updatedList
                        // })
                        setTodoLists(updatedList)
                        setDraggedCard(prev => ({
                            ...prev,
                            todoListId: hoveredItem.todoListId
                        }))
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

            {!isInitialized ?
                <Loader /> :
                <>
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
                                    setTodoLists={setTodoLists}
                                    setIsEdited={setIsEdited}
                                />
                            )
                        })}
                        <AddList
                            setTodoLists={setTodoLists}
                            todoLists={todoLists}
                        />
                    </Content>

                    {edited && (
                        <EditForm 
                            edited={edited}
                            todoLists={todoLists}
                        />
                    )}
                </>
            }

        </Container>
     )
};

export default ToDo;
