/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import GridHeader from './Header/Header'
import TodoLayout from './TodoLayout/TodoLayout'
import TodoListLayout from "./TodoListLayout/TodoListLayout"
import EditForm from "./TodoForm/TodoForm"
import { Loader } from '../../components'
import axios from 'axios'
import {  useParams  } from 'react-router-dom'
import { stringToQueryParam } from '../../functions'


const Container = styled.div`
    width: 100%;
    height: 100vh;
    color: ${props => props.theme.text};
    background: ${props => props.theme.backgroundImage ? 'none' : props.theme.background}; 
    padding-left: 4rem;
`

const Content = styled.div`
    height: calc(100vh - 15.5rem);
    display: flex;
    background: blue;
    position: relative;


    // max-width: 100vw;
    // overflow-x: scroll;
`
const Header = styled.div`
    width: 100%;
    height: 6.5rem;
    display: flex;
    align-items: center;
    background: orange;
`

const HeaderTitle = styled.h1`
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
    const [ isEditingListOrder, setIsEditingListOrder ] = useState(false)
    
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
                        if(
                            !lastSavedTodoLists[todoListId].todos[index] || 
                            lastSavedTodoLists[todoListId].todos[index].id !== todo.id ||
                            (!lastSavedTodoLists[todoListId].todos[index].archivedAt && todo.archivedAt)
                        ){
                            hasChanged.push({
                                ...todo,
                                type: "todo"
                            })
                        }
                    })

                })
                if(hasChanged.length > 0){
                    setToBeSaved(hasChanged)
                    setLastSavedTodoLists(todoLists)
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


    const saveListHandler = async () => {
        // const payload = []
        // const updatedTodoLists = {}
        // listLayout.forEach(list => {
        //     if(list.x !== list.list.index){
        //         payload.push({
        //             title: list.list.title,
        //             index: list.x,
        //             id: list.list.id,
        //             type: "list"
        //         })
        //     }
        //     updatedTodoLists[list.list.id] = {
        //         ...list.list,
        //         index: list.x
        //     }
        // })

        // setIsEditingListOrder(false)
        // setTodoLists(updatedTodoLists)
        // try {
        //     const res = await axios({
        //         method: "put",
        //         url: "/todo/many",
        //         data: payload
        //     })   
        //     console.log({
        //         res
        //     })
        // } catch(err){
        //     console.log({ err })
        // }
    }

    const saveHandler = async data => {
        if(!isSaving){
            setIsSaving(true)
            setToBeSaved(null)
            try {
                const res = await axios({
                    method: "put",
                    url: "/todo/many",
                    data
                })
                if(res.status === 200){
                    setIsSaving(false)

                }
            } catch(err){
                console.log({
                    err
                })
            }
        }
    }

    const config = {
        rowHeight: 10,
        listWidth: 320,
        margin: [0,0]
    }

    console.log({
        isEditingListOrder
    })

    return (
        <Container>
            {!isInitialized ?
                <Loader /> :
                <>
                    <Header>
                        <HeaderTitle>
                            {todoBoards[activeBoardId].title}
                        </HeaderTitle>
                    </Header>
                    <Content>
                        <TodoLayout 
                            todoLists={Object.values(todoLists)}
                            setTodoLists={setTodoLists}
                            setIsEdited={setIsEdited}
                            config={config}
                            setIsEditingListOrder={setIsEditingListOrder}
                            isEditingListOrder={isEditingListOrder}
                        />
                        <TodoListLayout 
                            todoLists={Object.values(todoLists)}
                            setTodoLists={setTodoLists}
                            config={config}
                            setIsEditingListOrder={setIsEditingListOrder}
                        />
                    </Content>
                        
                    {/*  <Content>
                        <TodoLayout 
                            todoLists={Object.values(todoLists)}
                            setTodoLists={setTodoLists}
                            setIsEdited={setIsEdited}
                            config={config}
                            setIsEditingListOrder={setIsEditingListOrder}
                        />
                        {!isEditingListOrder ?
                            <TodoLayout 
                                todoLists={Object.values(todoLists)}
                                setTodoLists={setTodoLists}
                                setIsEdited={setIsEdited}
                                config={config}
                                setIsEditingListOrder={setIsEditingListOrder}
                            /> :
                            <TodoListLayout 
                                todoLists={Object.values(todoLists)}
                                setListLayout={setListLayout}
                                listLayout={listLayout}
                            />
                        }
                    </Content> */}
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
