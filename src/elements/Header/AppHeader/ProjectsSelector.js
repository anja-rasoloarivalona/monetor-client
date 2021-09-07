import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { stringToQueryParam } from '../../../functions'
import { Link } from 'react-router-dom'
import * as actions from '../../../store/actions'

const Container = styled.ul`
    position: absolute;
    top: 90%;
    left: 0;
    min-width: 20rem;
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: .5rem;
    list-style: none;
    padding: .5rem;
    z-index: 10;
    
    > li:not(:last-child){
        margin-bottom: .5rem;
    }
`
const Project = styled.li`
    font-size: 1.4rem;
    cursor: pointer;
    a {
        color: ${({ theme }) => theme.text} !important;
        text-decoration: none !important;
        padding: 1rem;
        border-radius: .5rem;
    }
    :hover {
        background: ${({theme}) => theme.secondarySurface};
    }
`

const ProjectsSelector = () => {
    const dispatch = useDispatch()
    const {
        text: { text },
        todos: { todoBoards }
    } = useSelector(state => state)

    if(!todoBoards){
        return null
    }
    return (
        <Container>
            {Object.values(todoBoards).map(board => (
                <Project key={board.boardId} onClick={() => dispatch(actions.setActiveTodoBoard(board.boardId))}>
                    <Link to={`/${text.link_projects}/${stringToQueryParam(board.title)}`}>
                        {board.title}
                    </Link>
                </Project>
            ))}
        </Container>
     )
};

export default ProjectsSelector
