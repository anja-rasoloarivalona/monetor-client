import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'

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
    > li:not(:last-child){
        margin-bottom: .5rem;
    }
`

const Project = styled.li`
    padding: 1rem;
    font-size: 1.4rem;
    border-radius: .5rem;
    cursor: pointer;
    :hover {
        background: ${({theme}) => theme.secondarySurface};
    }
`

const ProjectsSelector = () => {


    const {
        todos: { todoBoards }
    } = useSelector(state => state)

    if(!todoBoards){
        return null
    }

    return (
        <Container>
            {Object.values(todoBoards).map(board => (
                <Project key={board.boardId}>
                    {board.title}
                </Project>
            ))}
        </Container>
     )
};

export default ProjectsSelector;
