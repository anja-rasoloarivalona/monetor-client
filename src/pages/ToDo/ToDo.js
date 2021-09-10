/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import Header from './Header/Header'
import TodoLayout from './TodoLayout/TodoLayout'
import EditForm from "./TodoForm/TodoForm"
import { Loader } from '../../components'
import axios from 'axios'
import {  useParams  } from 'react-router-dom'
import { stringToQueryParam } from '../../functions'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    padding: 2rem 0;
    color: ${props => props.theme.text};
    background: ${props => props.theme.backgroundImage ? 'none' : props.theme.background};

    .layout {
        width: 100%;
    }
`

const Content = styled.div`
    width: 100%;
    display: flex;
`

const ToDo = props => {

    const dispatch = useDispatch()
    const { projectName } = useParams()

    const { 
        text: { text },
        settings: { defaultBackground },
        todos: { 
            todoBoards,
            activeBoardId
        }
    } = useSelector(state => state)

    const [ mounted, setMounted ] = useState(false)
    const [ isInitialized, setIsInitialized ] = useState(false)
    const [ todoLists, setTodoLists ] = useState(null)
    const [ lastSavedTodoLists, setLastSavedTodoLists] = useState(null)
    const [ toBeSaved, setToBeSaved ] = useState(null)
    const [ isSaving, setIsSaving ] = useState(false)
    const [ edited, setIsEdited ] = useState(null)
    
    let timeout

    useEffect(() => {
        if(!todoBoards){
            dispatch(actions.getUserTodos())
        }
    }, [])

    useEffect(() => {
        if(todoBoards){
            if(projectName){
                const currentBoard = Object.values(todoBoards).find(board => stringToQueryParam(board.title) === projectName)
                if(!currentBoard){
                    props.history.push(`/${text.link_projects}`)
                } else {
                    if(!activeBoardId){
                        dispatch(actions.setActiveTodoBoard(currentBoard.boardId))
                    }
                }
            }
        }
    },[todoBoards])

    useEffect(() => {
        console.log({
            todoBoards,
            activeBoardId
        })
        if(todoBoards && activeBoardId){
            if(!mounted){
                setMounted(true)
                if(todoBoards[activeBoardId].backgroundImage){
                    dispatch(actions.setBackgroundImage(todoBoards[activeBoardId].backgroundImage))
                }
            }
        }
        return () => {
            if(todoBoards && activeBoardId){
                if(defaultBackground && defaultBackground !== todoBoards[activeBoardId].backgroundImage){
                    dispatch(actions.setBackgroundImage(defaultBackground))
                }
            }
        }
    },[todoBoards, activeBoardId])


    useEffect(() => {
        if(mounted  && !isInitialized ){
            setTodoLists({...todoBoards[activeBoardId].todoLists})
            const deepCopy = {}
            Object.values(todoBoards[activeBoardId].todoLists).forEach(list => {
                deepCopy[list.id] = {
                    ...list,
                    todos: list.todos.map(todo => ({ ...todo }))
                }
            })
            setLastSavedTodoLists(deepCopy)
            setIsInitialized(true)
        }
    },[mounted])

    useEffect(() => {
        if(mounted){
            dispatch(actions.setTodoLists({
                todoLists,
                boardId: activeBoardId
            }))
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                const hasChanged = []
                Object.keys(todoLists).forEach(todoListId => {
                    todoLists[todoListId].todos.forEach((todo, index) => {
                        if(!lastSavedTodoLists[todoListId].todos[index] || lastSavedTodoLists[todoListId].todos[index].id !== todo.id){
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
            }, 1000)
        }
    },[todoLists])

    useEffect(() => {
        if(toBeSaved){
            saveHandler(toBeSaved)
            console.log({
                toBeSaved
            })
        }
    },[toBeSaved])


    const saveHandler = async data => {
        if(!isSaving){
            // setIsSaving(true)
            // try {
            //     const res = await axios({
            //         method: "put",
            //         url: "/todo/many",
            //         data
            //     })
            //     if(res.status === 200){
            //         setIsSaving(false)
            //         setToBeSaved(null)
            //     }
            // } catch(err){
            //     console.log({
            //         err
            //     })
            // }
        }
    }

    return (
        <Container>
            {!isInitialized ?
                <Loader /> :
                <>
                    <Header />
                     <Content>
                        <TodoLayout 
                            todoLists={Object.values(todoLists)}
                            setTodoLists={setTodoLists}
                            setIsEdited={setIsEdited}
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
        </Container>
     )
};

export default ToDo;
