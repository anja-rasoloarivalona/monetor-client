/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'
import Description from './Description'
import CheckList from './CheckList'
import DueDate from "./DateComponent"
import Header from './Header'
import Labels from "./Labels"
import Attachments from "./Attachments"
import axios from "axios"
import { usePrevious } from '../../../hooks'
import * as actions from '../../../store/actions'
import { isArray } from '../../../functions'
import Sidebar from "./Sidebar"


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: rgba(0,0,0, .3);
    display: flex;
    justify-content: center;
`
const CloseButton = styled.div`
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: .5rem;
    right: .5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;

    svg {
        font-size: 2rem;
    }

    :hover {
        background: ${props => props.theme.background};
    }
`


const Modal = styled.div`
    max-height: 90vh;
    height: 80vh;
    // height: max-content;
    margin-top: 5vh;
    width: 90%;
    max-width: 80rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .5rem;
    position: relative;
    display: flex;
`

const Body = styled.div`
    width: calc(100% - 26rem);
    padding: 2rem;
`

const EditForm = props => {

    const modal = useRef()
    
    const { edited, setIsEdited, todoLists, setTodoLists } = props

    const {
        text: { text },
    } = useSelector(state => state)


    const editedHasDescription = edited.description && edited.description !== "<p><br></p>"
    const editedHasItems = (edited.checkList && edited.checkList.length > 0 ) || edited.dueDate


    const [ isAddingCheckList, setIsAddingCheckList ] = useState(false)
    const [ isEditingTitle, setIsEditingTitle ] = useState(false)
    const [ isEditingDescription, setIsEditingDescription ] = useState(edited.description ? false : editedHasItems ? false : true)

    const [ list, setList ] = useState(edited.todoListId)
    const [ title, setTitle ] = useState(edited.title)
    const [ description, setDescription ] = useState(edited.description)
    const [ dueDate, setDueDate ] = useState(edited.dueDate)
    const [ startDate, setStartDate ] = useState(edited.startDate)
    const [ checkList, setCheckList ] = useState(edited.checkList || [])


    useEffect(() => {
        if(dueDate){
            const dueDateHasChanged = edited.dueDate && dueDate ? new Date(dueDate).getTime() !== new Date(edited.dueDate).getTime() : dueDate
            if(dueDateHasChanged){
                const tobeSaved = {
                    ...edited, 
                    dueDate,
                    type: "todo"
                }
                updateHandler(tobeSaved)
            }
        }
    },[dueDate])

    useEffect(() => {
        const titleHasChanged = edited.title !== title
        if(titleHasChanged && !isEditingTitle){
            const tobeSaved = {
                ...edited, 
                title
            }
            updateHandler(tobeSaved)
        }
    },[title, isEditingTitle])


    useEffect(() => {
        const descriptionHasChanged = edited.description !== description
        if(descriptionHasChanged && !isEditingDescription){
            const tobeSaved = {
                ...edited, 
                description
            }
            updateHandler(tobeSaved)
        }

    },[description, isEditingDescription])


    useEffect(() => {
        if(checkList && checkList.length > 0){
            let payload = null
            let isNew = false

            if(edited.checkList && edited.checkList.length > 0){
                checkList.forEach(item => {
                    if(!item.id && !payload){
                        payload = item
                        isNew = true
                    } else {
                        if(item.hasChanged){
                            payload = payload ? [...payload, item] :  [ item ]
                        }
                    }
                })
            } else {
                payload = checkList[0]
                isNew = true
            }
            if(payload){
                const tobeSaved = {
                    ...edited,
                    checkList: checkList.map(i => ({ ...i, hasChanged: false }))
                }
                updateHandler(tobeSaved, payload, isNew)
            }
        }   
    },[checkList])


    const updateHandler = (tobeSaved, payload, isNew) => {
        setTodoLists(prev => {
            const listId = edited.todoListId
            const tempIndex = prev[listId].todos.findIndex(i => i.id === edited.id)
            const updatedLists = {...prev}
            updatedLists[listId].todos[tempIndex] = tobeSaved
            return updatedLists
        })
        setIsEdited(tobeSaved)
        saveHandler(payload ? payload : tobeSaved, isNew)
    }

    const saveHandler = async (tobeSaved, isNew) => {
        try {
            const res = await axios({
                method: isNew ? 'POST' : 'PUT',
                url: isArray(tobeSaved) ? "/todo/many" :  "/todo",
                data: tobeSaved
            })
            if(isNew){
                if(tobeSaved.type === "checkList"){
                    const index = checkList.findIndex(i => i.index === tobeSaved.index)
                    const updatedCheckList = [...checkList]
                    updatedCheckList[index] = {...res.data.data}
                    let updatedTodo = {}
                    setIsEdited(prev => {
                        updatedTodo = {
                            ...prev,
                            checkList: updatedCheckList
                        }
                        return updatedTodo
                    })
                    setCheckList(updatedCheckList)
                    setTodoLists(prev => {
                        const listId = edited.todoListId
                        const tempIndex = prev[listId].todos.findIndex(i => i.id === edited.id)
                        const updatedLists = {...prev}
                        updatedLists[listId].todos[tempIndex] = updatedTodo
                        return updatedLists
                    })
                }
            }
        } catch(err){
            console.log({
                err
            })
        }
    }



    return (
        <Container>
            <Modal ref={modal}>
                <CloseButton onClick={() => setIsEdited(null)}>
                    <FontAwesomeIcon icon="times" />
                </CloseButton>
                <Body>
                    <Header
                        setIsEdited={setIsEdited} 
                        edited={edited}
                        title={title}
                        setTitle={setTitle}
                        todoLists={todoLists}
                        isEditingTitle={isEditingTitle}
                        setIsEditingTitle={setIsEditingTitle}
                    />
                    {edited.dueDate && (
                        <DueDate
                            edited={edited}
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            // isEditingDate={isEditingDate}
                            // setIsEditingDate={setIsEditingDate}
                        />
                    )}
                    {edited.todoLabels && edited.todoLabels.length > 0 && (
                        <Labels
                            edited={edited}
                            setTodoLists={setTodoLists}
                            setIsEdited={setIsEdited} 
                        />
                    )}
                    {(editedHasDescription || isEditingDescription) && (
                        <Description
                            isEditingDescription={isEditingDescription}
                            setIsEditingDescription={setIsEditingDescription} 
                            description={description}
                            setDescription={setDescription}
                        />
                    )}

                    {edited.attachments && edited.attachments.length > 0 && (
                        <Attachments 
                            edited={edited}
                            setTodoLists={setTodoLists}
                            setIsEdited={setIsEdited}
                        />
                    )}

                    {((checkList && checkList.length > 0) || isAddingCheckList) && (
                        <CheckList
                            edited={edited} 
                            checkList={checkList}
                            setCheckList={setCheckList}
                            isAddingCheckList={isAddingCheckList}
                            setIsAddingCheckList={setIsAddingCheckList}
                        />
                    )}
                </Body>
                <Sidebar 
                    list={list}
                    setList={setList}
                    dueDate={dueDate} 
                    setDueDate={setDueDate}
                    setIsAddingCheckList={setIsAddingCheckList}
                    editedHasItems={editedHasItems}
                    editedHasDescription={editedHasDescription}
                    setIsEditingDescription={setIsEditingDescription}
                    setTodoLists={setTodoLists}
                    setIsEdited={setIsEdited}
                    edited={edited}
                    // setIsEditingDate={setIsEditingDate}
                />
             
            </Modal>
        </Container>
     )
};

export default EditForm;
