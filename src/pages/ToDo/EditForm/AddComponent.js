import React, { useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddDueDate from "./AddDueDate"

const Container = styled.div`
    width: 20rem;
`

const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: 2rem;
`

const List = styled.ul`
    list-style: none;
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    background: ${props => props.theme.background};
    font-size: 1.4rem;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    cursor: pointer;
    border-radius: .3rem;
    position: relative;

    svg {
        margin-right: 1rem;
    }
`

const ListItemLabel = styled.div`
 
`


const AddComponent = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    const [currentAction, setCurrentAction ] = useState("due-date")

    const addActions = [
        {id: "due-date",  label: text.due_date, icon: "clock", Component: <AddDueDate />},
        {id: "chech-list", label: text.check_list, icon: "list-ul"},
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
                        <ListItem key={action.id}>
                                <FontAwesomeIcon icon={action.icon}/>
                                <ListItemLabel>
                                    {action.label}
                                </ListItemLabel>
                                {currentAction === action.id && cta}
                        </ListItem>
                    )
                })}    
            </List>

      
        </Container>
     )
};

export default AddComponent;
