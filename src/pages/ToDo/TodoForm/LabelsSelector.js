import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOnClickOutside } from '../../../hooks'
import LabelsEditor from "./LabelsEditor"
import axios from 'axios'
import {SidebarItemContainer,  SidebarHeader, SidebarHeaderTitle, SidebarHeaderIcon } from './style'


const List = styled.div`
    padding: 1rem 1rem;
`
const ListItem = styled.div`
    margin-bottom: .5rem;
    display: flex;
    align-items: center;
    height: 3.4rem;
    position: relative;
    cursor: pointer;
    border-radius: .3rem;
    overflow: hidden;
    z-index: 2;
    :hover {
        .color {
            width: calc(100% -   ${props => props.isSelected ? "7rem" : "3.5rem"});
            &__cta {
                width: ${props => props.isSelected ? "7rem" : "3.5rem"})
            }
        }
    }
`

const ListItemColor = styled.div`
    width: 100%;
    height: 100%;
    transition: all .3s ease-in;
    display: flex;
    align-items: center;
    color: ${props => props.theme.white};
    font-size: 1.4rem;
    padding: 0 1rem;
`

const ListItemCtaContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0rem;
    display: flex;
    z-index: -1;
`

const ListItemCta = styled.div`
    width: 3.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.3rem;
        color: ${props => props.theme.text};
    }
`

const CreateContainer = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 1rem;
`

const LabelsSelector = props => {

    const container = useRef()

    const { setIsEdited , setTodoLists, edited, closeHandler } = props

    const {
        todos: {
            todoBoards,
            activeBoardId,
        },
        text: { text }
    } = useSelector (s => s)


    const [ editedColor, setEditedColor ] = useState(false)


    useOnClickOutside(container, () => {
        setEditedColor(false)
        closeHandler()
    })

    const currentLabels = todoBoards[activeBoardId].labels
    const colors = ["green", "gold", "orange", "red", "violet", "pink", "cornFlowerBlue"]

    const displayedLabels = []

    colors.forEach(color => {
        const displayedLabel = currentLabels.find(label => label.color === color) || { color }
        displayedLabels.push(displayedLabel)
    })

    const toggleLabelHandler = async color => {

        const labelId = color.id

        if(labelId){
            try {
                const isAdding = edited.todoLabels.findIndex(label => label.id === labelId) === -1
                const updatedTodo = {
                    ...edited,
                    todoLabels: isAdding ? 
                        [{boardId: activeBoardId, id: labelId }, ...edited.todoLabels] :
                        edited.todoLabels.filter(label => label.id !== labelId )
                }   
                setTodoLists(prev => {
                    const listId = edited.todoListId
                    const tempIndex = prev[listId].todos.findIndex(i => i.id === edited.id)
                    const updatedLists = {...prev}
                    updatedLists[listId].todos[tempIndex] = updatedTodo
                    return updatedLists
                })
                setIsEdited(updatedTodo)
    
                const res = await axios({
                    method: isAdding ? "POST" : "DELETE",
                    url: "/todo/label",
                    data: { todoId: edited.id, labelId }
                })
    
                console.log({ res })
    
            } catch(err){
                console.log(err)
            }
        } else {
            setEditedColor(color)
        }

    }


    return (
        <SidebarItemContainer ref={container}>
            <SidebarHeader>
                <SidebarHeaderIcon
                    editedColor={editedColor}
                    className={!editedColor ? "hide" : ""}
                    onClick={editedColor ? () => setEditedColor(false) : null}
                >
                    <FontAwesomeIcon icon="arrow-left"/>
                </SidebarHeaderIcon>
                <SidebarHeaderTitle>
                    {text.labels}
                </SidebarHeaderTitle>
                <SidebarHeaderIcon onClick={closeHandler}>
                    <FontAwesomeIcon icon="times"/>
                </SidebarHeaderIcon>
            </SidebarHeader>
            {editedColor ?
                <LabelsEditor 
                    colors={colors}
                    editedColor={editedColor}
                    setEditedColor={setEditedColor}
                /> :
                <>
                <List>
                    {displayedLabels.map((color, index) => {
                        const isSelected = color.id ?  edited.todoLabels.findIndex(label => label.id === color.id) > -1 : false
                        return (
                            <ListItem
                                key={index}
                                isSelected={isSelected}
                            >
                                <ListItemColor
                                    className="color"
                                    style={{background: color.color }}
                                    onClick={() => toggleLabelHandler(color)}
                                >
                                    {color.title || ""}
                                </ListItemColor>
                                <ListItemCtaContainer className="color__cta">
                                    {isSelected && (
                                        <ListItemCta onClick={() => toggleLabelHandler(color)} className="cta">
                                            <FontAwesomeIcon icon="trash-alt"/>
                                        </ListItemCta>
                                    )}
                                    <ListItemCta onClick={() => setEditedColor(color)} className="cta">
                                        <FontAwesomeIcon icon="pencil-alt"/>
                                    </ListItemCta>
                                </ListItemCtaContainer>
                            </ListItem>
                        )
                    })}
                </List>
                <CreateContainer>
                    {text.create}
                </CreateContainer>
                </>
            }
        </SidebarItemContainer>
     )
};

export default LabelsSelector;
