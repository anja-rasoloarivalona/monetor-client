import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import ProjectForm from "./ProjectForm"
import AppIcon from '../../icons'
import { useLocation, Link } from 'react-router-dom'
import queryString from 'query-string'
import { stringToQueryParam } from '../../functions'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    padding-left: 4rem;
    background: ${({ theme }) => theme.backgroundImage ? "none" : theme.background};
`

const Header = styled.div`
    width: 100%;
    height: 6.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
`

const HeaderTitle = styled.h1`

`

const List = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 30rem);
    grid-template-rows: 16rem;
    grid-auto-rows: 16rem;
    row-gap: 2rem;
    column-gap: 2rem;
`


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
    position: relative;
    font-size: 1.4rem;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: .5rem;
        color: ${({ theme }) => theme.text} !important;
        padding: 1rem;
        text-decoration: none !important;
    }

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

const Add = styled(ListItem)`
    position: relative;
    * {
        cursor: pointer;
    }
    :hover {
        label {
            opacity: 1;
            transform: translateY(1rem);
        };
        div {
            transform: translateY(-1.7rem);
        }
    }
`
const AddIcon = styled.div`
    transition: all .3s ease-in;
    svg {
        width: 3.5rem;
        height: 3.5rem;
        margin-bottom: 0rem;
    }
`
const AddLabel = styled(ListItemLabel)`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: translateY(2.7rem);
    width: max-content;
    height: max-content;
    opacity: 0;
    transition: all .3s ease-in;
`

const TodoHome = props => {

    const dispatch = useDispatch()
    const location = useLocation()


    const [ isAdding, setIsAdding ] = useState(false)
    const [ initFromUrl, setInitFromUrl ] = useState(false)
    const [ isReady, setIsReady ] = useState(false)

    const {
        todos: { 
            todoBoards,
        },
        text: { text }
    } = useSelector(state => state)

    useEffect(() => {
        const queries = queryString.parse(location.search)
        if(queries && queries.add === "true"){
            setIsAdding(true)
            setInitFromUrl(true)
        }
        if(!todoBoards){
            dispatch(actions.getUserTodos())
        }
        setIsReady(true)
    }, [])

    const closeHandler = () => {
        if(initFromUrl){
            props.history.goBack()
        } else {
            setIsAdding(false)
        }
    }
    
    if(!isReady){
        return null
    }

    return (
        <Container>
            {isAdding ?
                <ProjectForm closeHandler={closeHandler} />
            :
                <>
                    <Header>
                        <HeaderTitle>
                            {text.my_projects}
                        </HeaderTitle>
                    </Header>
                    <List>
                        <Add onClick={() => setIsAdding(true)}>
                            <AddIcon><AppIcon id="plus"/></AddIcon>
                            <AddLabel>Start a new project</AddLabel>
                        </Add>
                        {todoBoards && Object.values(todoBoards).map(board => (
                            <ListItem
                                key={board.boardId}
                                onClick={() => dispatch(actions.setActiveTodoBoard(board.boardId))}
                            >
                                <Link to={`/${text.link_projects}/${stringToQueryParam(board.title)}`}>
                                    {board.title}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </>
            }

        </Container>
     )
};

export default TodoHome;
