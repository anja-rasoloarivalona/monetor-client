import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddDueDate from "./DueDateInput"
import LabelsSelector from "./LabelsSelector"
import AttachmentsForm from "./AttachmentsForm"
import { faClock } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    width: 100%;
`

const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: 2rem;
`

const List = styled.ul`
    list-style: none;
    position: relative;
`

const ListItem = styled.li`
    margin-bottom: 1rem;
    position: relative;
`

const ListItemContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: ${props => props.theme.surface};
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: .3rem;
    box-shadow: ${props => props.theme.boxShadowExtraLight};
    :hover {
        box-shadow: ${props => props.theme.boxShadowLight};
    }

    svg {
        margin-right: 1rem;
    }
`

const ListItemLabel = styled.div`
    font-size: 1.4rem;
`


const AddComponent = props => {

    const { dueDate, setDueDate, setIsAddingCheckList, editedHasItems, editedHasDescription, setIsEditingDescription, setTodoLists, setIsEdited, edited} = props

    const {
        text: { text }
    } = useSelector(state => state)

    const [currentAction, setCurrentAction ] = useState(null)

    const addActions = [
        {
            id: "due-date", 
            label: text.due_date,
            icon: faClock,
            Component: (
                <AddDueDate 
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    closeHandler={() => setCurrentAction(null)}
                />
            ),
            action: () => setCurrentAction("due-date")
        },
        {
            id: "chech-list",
            label: text.check_list,
            icon: "list-ul",
            action: () => setIsAddingCheckList(true)
        },
        {
            id: "labels",
            label: text.labels,
            icon: "tag",
            Component: (
                <LabelsSelector 
                    setTodoLists={setTodoLists}
                    setIsEdited={setIsEdited}
                    edited={edited}
                    closeHandler={() => setCurrentAction(null)}
                />
            ),
            action: () => setCurrentAction("labels")
        },
        {
            id: "attachments",
            label: text.attachments,
            icon: "paperclip",
            Component: (
                <AttachmentsForm 
                    edited={edited}
                    setTodoLists={setTodoLists}
                    setIsEdited={setIsEdited}
                    closeHandler={() => setCurrentAction(null)}
                />
            ),
            action: () => setCurrentAction("attachments"),
            listItemStyle: {
                position: "unset"
            }
        }
    ]

    if(!editedHasDescription && editedHasItems){
        addActions.unshift({
                id: "description", 
                label: text.description,
                icon: "bars",
                action: () => setIsEditingDescription(true)
        })
    }


    return (
        <Container>
            <Title>{text.add_to_card}</Title>
            <List>
                {addActions.map(action => {

                    const cta = action.Component

                    return (
                        <ListItem
                            key={action.id}
                            style={action.listItemStyle}
                        >
                            <ListItemContent onClick={() => action.action()}>
                                <FontAwesomeIcon icon={action.icon}/>
                                <ListItemLabel>
                                    {action.label}
                                </ListItemLabel>
                            </ListItemContent>
                            {action.Component && currentAction === action.id && cta}
                        </ListItem>
                    )
                })}    
            </List>

      
        </Container>
     )
};

export default AddComponent;
