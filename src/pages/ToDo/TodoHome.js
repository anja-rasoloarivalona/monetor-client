import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import ProjectForm from "./ProjectForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 6.5rem);
    padding: 3rem 4rem;
    padding-bottom: 5rem;
    background: ${({ theme }) => theme.backgroundImage ? "none" : theme.background};
`

const Header = styled.div`
    width: 100%;
    margin-bottom: 2rem;
`

const HeaderTitle = styled.h1`

`

const List = styled.div``


const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${({theme}) => theme.surface};
    box-shadow: ${({theme}) => theme.boxShadowLight};
    width: 30rem;
    height: 16rem;
    border-radius: 1rem;
    transition: all .3s ease-in;
    cursor: pointer;
    svg {
        font-size: 2.4rem;
        margin-bottom: 1rem;
        color: ${({theme}) => theme.textLight};
        transition: all .3s ease-in;
    };
    :hover {
        box-shadow: ${({theme}) => theme.boxShadow};
        svg {
            color: ${({theme}) => theme.text};
        };
    }
`

const ListItemLabel = styled.label`
    font-size: 1.4rem;
`

const TodoHome = () => {

    const dispatch = useDispatch()


    const [ isAdding, setIsAdding ] = useState(false)

    const {
        todos: { 
            todoBoards,
        },
        text: { text }
    } = useSelector(state => state)

    useEffect(() => {
        if(!todoBoards){
            dispatch(actions.getUserTodos())
        }
    }, [])

    

    return (
        <Container>
            {isAdding ?
                <ProjectForm />
            :
                <>
                    <Header>
                        <HeaderTitle>
                            {text.my_projects}
                        </HeaderTitle>
                    </Header>
                    <List>
                        <ListItem onClick={() => setIsAdding(true)}>
                            <FontAwesomeIcon icon="plus-circle"/>
                            <ListItemLabel>Add new project</ListItemLabel>
                        </ListItem>
                    </List>
                </>
            }

        </Container>
     )
};

export default TodoHome;
