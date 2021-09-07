import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import AppIcon from '../../../../icons'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../../store/actions'
import { HeaderCta, HeaderCtaItem,HeaderLabel } from '../style'

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    padding: 2rem;
    background: ${({ theme }) => theme.surface};
    position: relative;

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
    background: ${({ theme }) => theme.secondarySurface};
    // box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
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
                <HeaderLabel>{text.my_projects}</HeaderLabel>
                <HeaderCta>
                    <HeaderCtaItem onClick={() => props.history.push(`/${text.link_projects}?add=true`)}>
                        <AppIcon id="plus"/>
                    </HeaderCtaItem>
                    <HeaderCtaItem className="small">
                        <AppIcon id="ellipsis-h"/>
                    </HeaderCtaItem>
                </HeaderCta>
            </Header>
            <List>
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
