import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside, useKeyboardEvent } from '../../../hooks'
import { SectionTitle } from './style'
import { List } from './CheckListStyle'
import CheckListInput from "./CheckListInput"
import CheckListItem from "./CheckListItem"
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import axios from "axios"

const Container = styled.div`
    margin: 3rem 0;
`

const Content = styled.div`
    width: 100%;
    margin-top: 2rem;
`

const CheckList = props => {

    const { edited, checkList, setCheckList, isAddingCheckList, setIsAddingCheckList} = props

    const {
        text: { text }
    } = useSelector(state => state)

    const [ title, setTitle ] = useState("")
    const [ dueDate, setDueDate ] = useState(new Date())
    const [ editedCheckList, setEditedChecklist ] = useState(null)


    const input = useRef()

    useOnClickOutside(input, () => {
        if(isAddingCheckList){
            cancelHandler()
        }
    })
    useKeyboardEvent('Enter', () => submitHandler("entered"))

    const deleteHandler = async id => {
        const updatedList = checkList.filter(item => item.id !== id)
        updatedList.forEach((i, index) => {
            updatedList[index].index = index
            updatedList[index].hasChanged=true
        })
        setCheckList(updatedList)
        const toBeDeleted = checkList.find(item => item.id === id)
        await axios({
            method: "DELETE",
            url: "/todo",
            data: {
                id,
                type: toBeDeleted.type
            }
        })
    }

    const submitHandler = from => {
        if(title !== ""){
            const updatedList = [...checkList]
            let needUpdate = false

            if(editedCheckList !== null){
                if(updatedList[editedCheckList].title !== title){
                    needUpdate = true
                    updatedList[editedCheckList].title = title
                    updatedList[editedCheckList].hasChanged = true
                }
               
            } else {
                needUpdate = true
                updatedList.push({
                    title,
                    todoId: edited.id, 
                    index: checkList.length,
                    type: "checkList" 
                })
            }
            setTitle("")
            setEditedChecklist(null)

            if(needUpdate){
                setCheckList(updatedList)
            }

            if(from === "saveButton"){
                setIsAddingCheckList(false)
            }

        } else {
            setIsAddingCheckList(false)
        }
    }

    const cancelHandler = () => {
        setTitle("")
        setIsAddingCheckList(false)
        setEditedChecklist(null)
    }

    useEffect(() => {
        if(isAddingCheckList && input.current){
            input.current.focus()
        }
    },[isAddingCheckList, input])

 
    const clickListItemHandler = index => {
        if(!editedCheckList || (editedCheckList && editedCheckList !== index)){
            setEditedChecklist(index)
            setTitle(checkList[index].title)
            setIsAddingCheckList(false)
        }
    }

    const onChangeDueDateHandler = value => {
        setCheckList(prev => {
            const updated = []
            prev.forEach(item => {
                if(item.index === checkList[editedCheckList].index){
                    updated.push({
                        ...item,
                        dueDate: value,
                        hasChanged: true
                    })
                } else {
                    updated.push(item)
                }
            })
            return updated
        })
    }

    return (
        <Container>
            <SectionTitle>
                <FontAwesomeIcon 
                    icon={faCalendarCheck}
                />
                {text.check_list}
            </SectionTitle>
            <Content>
                <List>
                    {checkList && checkList.length > 0 && checkList.sort((a, b) => a.index - b.index).map((item ,index) => (
                        <CheckListItem 
                            index={index}
                            item={item}
                            title={title}
                            setTitle={setTitle}
                            setEditedChecklist={setEditedChecklist}
                            editedCheckList={editedCheckList}
                            clickListItemHandler={clickListItemHandler}
                            checkList={checkList}
                            setCheckList={setCheckList}
                            onChangeDueDateHandler={onChangeDueDateHandler}
                            cancelHandler={cancelHandler}
                            submitHandler={submitHandler}
                            deleteHandler={deleteHandler}
                        />
                    ))}


                        <CheckListInput 
                            customRef={input}
                            customStyle={{
                                gridTemplateColumns: "4rem 1fr",
                                gridTemplateRows: "4rem max-content",
                                width: "100%",
                                gridColumn: 'unset',
                                gridRow: "unset",
                                marginTop: "1rem",
                                display: editedCheckList === null && isAddingCheckList ? "grid" : "none",
                            }}
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                            text={text}
                            title={title}
                            setTitle={setTitle}
                            cancelHandler={cancelHandler}
                            submitHandler={() => submitHandler("saveButton")}
                            setCheckList={setCheckList}
                            onChangeDueDateHandler={val => onChangeDueDateHandler(val)}
                        />
                </List>
            </Content>
        </Container>
     )
};

export default CheckList;
