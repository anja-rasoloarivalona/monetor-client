/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import List from './List'
import AddList from './AddList'
import EditForm from "./TodoForm/TodoForm"
import * as actions from '../../store/actions'
import { insertInToArray } from '../../functions'
import { Loader } from '../../components'
import axios from 'axios'
import Preview from './CardPreview'
import Header from './Header/Header'

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 8rem);
    padding: 2rem;
    color: ${props => props.theme.text};
`

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
        settings: { defaultBackground },
        user: {
            activeTodoBoardId,
            todoBoards
        }
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
    const [ lastSavedTodoLists, setLastSavedTodoLists] = useState(null)
    const [ draggedCard, setDraggedCard ] = useState(null)
    const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(false)
    const [ toBeSaved, setToBeSaved ] = useState(null)


    const [ isSaving, setIsSaving ] = useState(false)
    const [ edited, setIsEdited ] = useState(null)
    let timeout

    useEffect(() => {
        setMounted(true)
        if(todoBoards[activeTodoBoardId].backgroundImage){
            dispatch(actions.setBackgroundImage(todoBoards[activeTodoBoardId].backgroundImage))
        }
        return () => {
            if(defaultBackground && defaultBackground !== todoBoards[activeTodoBoardId].backgroundImage){
            dispatch(actions.setBackgroundImage(defaultBackground))

            }
        }
    },[])

    useEffect(() => {
        if(activeTodoBoardId && !isInitialized){
            setTodoLists(todoBoards[activeTodoBoardId].todoLists)
            setLastSavedTodoLists(todoBoards[activeTodoBoardId].todoLists)
            setIsInitialized(true)
        }
    },[activeTodoBoardId])

    useEffect(() => {
        if(mounted){

            dispatch(actions.setTodoLists(todoLists))

            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if(hasUnsavedChanges){
                    const hasChanged = []
                    Object.keys(todoLists).forEach(todoListId => {
                        todoLists[todoListId].todos.forEach((todo, index) => {
                            if(!lastSavedTodoLists[todoListId].todos[index] || lastSavedTodoLists[todoListId].todos[index].id !== todo.Id){
                                hasChanged.push({
                                    ...todo,
                                    type: "todo"
                                })
                            }
                        })
                    })
                    if(hasChanged.length > 0){
                        setToBeSaved(hasChanged)
                    }
                }
            }, 1500)
        }
    },[todoLists])

    useEffect(() => {
        if(toBeSaved){
            saveHandler(toBeSaved)
        }
    },[toBeSaved])


    const saveHandler = async data => {
        if(!isSaving){
            setIsSaving(true)
            try {
                
                const res = await axios({
                    method: "put",
                    url: "/todo/many",
                    data
                })
                if(res.status === 200){
                    setIsSaving(false)
                    setHasUnsavedChanges(false)
                    setToBeSaved(null)
                }
            } catch(err){
                console.log({
                    err
                })
            }
        }
        

    }

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
                    setHasUnsavedChanges(true)
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
                    setHasUnsavedChanges(true)
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
                        setHasUnsavedChanges(true)
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

        // console.log("MOVING CARD BETWEEN LIST", {
        //     movedItem,
        //     hoveredItem,
        //     toListId
        // })

        const updatedList = {...todoLists}
        if(movedItem){
            const movedItemListId = movedItem.todoListId
            updatedList[movedItemListId] = {
                ...updatedList[movedItemListId],
                todos: updatedList[movedItemListId].todos.filter(i => i.id !== movedItem.id)
            }
            updatedList[movedItemListId].todos.forEach((todo, index) => {
                updatedList[movedItemListId].todos[index].index = index
            })
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
        // console.log("AFTER MOVING CARD BETWEEN LIST", updatedList)
        return updatedList
    }


    return (
        <Container>

            {!isInitialized ?
                <Loader /> :
                <>

                    <Header />
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
                            setIsEdited={setIsEdited}
                            setTodoLists={setTodoLists}
                            todoLists={todoLists}
                        />
                    )}
                </>
            }
            <Preview />
        </Container>
     )
};

export default ToDo;
