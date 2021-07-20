import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddDueDate from "./DueDateInput"
import { faClock } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    width: 20rem;
    position: absolute;
    top: 9rem;
    right: 2rem;
`

const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: 2rem;
`

const List = styled.ul`
    list-style: none;
`

const ListItem = styled.li`
    margin-bottom: 1rem;
    position: relative;
`

const ListItemContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: ${props => props.theme.background};
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: .3rem;

    svg {
        margin-right: 1rem;
    }
`

const ListItemLabel = styled.div`
    font-size: 1.4rem;
`


const AddComponent = props => {

    const { dueDate, setDueDate, setIsAddingCheckList} = props

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
        {id: "labesl", label: text.labels, icon: "tag"},
        {id: "attachments", label: text.attachments, icon: "paperclip"}
    ]


    return (
        <Container>
            <Title>{text.add_to_card}</Title>
            <List>
                {addActions.map(action => {

                    const cta = action.Component

                    return (
                        <ListItem
                            key={action.id}
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
