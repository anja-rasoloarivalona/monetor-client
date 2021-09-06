import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import AppIcon from '../../../../icons'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../../store/actions'

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
`
const Header = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2rem;
`
const List = styled.div`
`

const ListItem = styled.div`
    padding: 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    margin-bottom: 1rem;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.line};
    border-radius: .5rem;
`

const Add = styled(ListItem)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    :hover {
        background: ${props => props.theme.background};
    }
    svg {
        width: 2rem;
        height: 2rem;
    }
`


const Projects = props => {

    const dispatch = useDispatch()

    const {
        text: { text },
        todos: { todoBoards }
    } = useSelector(state => state)

    const selectProjectHandler = id => {
        dispatch(actions.setActiveTodoBoard(id))
        props.history.push(`/${text.link_projects}/${id}`)
    }

    return (
        <Container>
            <Header>
                {text.my_projects}
            </Header>
            <List>
                <Add onClick={() => props.history.push(`/${text.link_projects}?add=true`)}>
                    <AppIcon id="plus"/>
                </Add>
                {todoBoards && Object.values(todoBoards).map(board => (
                    <ListItem key={board.boardId} onClick={() => selectProjectHandler(board.boardId)}>
                        {board.title}
                    </ListItem>
                ))}
            </List>
        </Container>
     )
};

export default withRouter(Projects);
