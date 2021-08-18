import React, { useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LabelsSelector from "./LabelsSelector"

const Container = styled.div`
    padding: 0 2rem;
`

const Title = styled.div`
    font-size: 1.4rem;
    color: ${props => props.theme.textLight};
    text-transform: uppercase;
    margin-bottom: .7rem;
`

const List = styled.div`
    display: flex;
    align-items: center;
`

const ListItem = styled.div`
    width: max-content;
    padding: 0 1rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: ${props => props.theme.white};
`

const AddContainer = styled.div`
    width: 3rem;
    height: 3rem;
    position: relative;
`

const AddButton = styled.div`
    background: ${props => props.theme.onSurface};
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        color: ${props => props.theme.textLight};
    }
`

const Labels = props => {

    const { edited, setTodoLists, setIsEdited } = props

    const {
        text: { text },
        user: { todoBoards, activeTodoBoardId }
    } = useSelector(s => s)

    const [ isAdding, setIsAdding ] = useState(false)

    const labels = todoBoards[activeTodoBoardId].labels

    console.log({
        edited
    })

    return (
        <Container>
            <Title>{text.labels}</Title>
            <List>
                {edited.todoLabels.map(label => {
                    const currentLabel = labels.find(i => i.id === label.id)
                    if(currentLabel){
                        return (
                            <ListItem
                                key={label.id}
                                style={{
                                    background: currentLabel.color
                                }}
                            >
                                {currentLabel.title}
                            </ListItem>
                        )
                    }return null
                })}
                <AddContainer>
                    <AddButton onClick={() => setIsAdding(prev => !prev)}>
                        <FontAwesomeIcon icon="plus"/>
                    </AddButton>
                    {isAdding && (
                        <LabelsSelector 
                            edited={edited}
                            setTodoLists={setTodoLists}
                            setIsEdited={setIsEdited}
                            closeHandler={() => setIsAdding(false)} 
                        />
                    )}
                </AddContainer>
            </List>
        </Container>
     )
};

export default Labels;
