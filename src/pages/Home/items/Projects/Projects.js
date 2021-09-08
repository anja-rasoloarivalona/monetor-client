import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import AppIcon from '../../../../icons'
import { withRouter, Link } from 'react-router-dom'
import * as actions from '../../../../store/actions'
import { HeaderCta, HeaderCtaItem, HeaderCtaItemIcon, HeaderLabel, Cta, CtaItem } from '../style'
import { stringToQueryParam } from '../../../../functions'
import { useOnClickOutside } from '../../../../hooks'
import { Button } from '../../../../components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    padding: 2rem;
    background: ${({ theme }) => theme.surface};
    position: relative;
    padding-bottom: 2rem;

`
const Header = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2rem;
`
const List = styled.ul`
    list-style: none;
`

const ListItem = styled.li`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.secondarySurface};
    display: flex;
    position: relative;
    border-radius: .5rem;

    a {
        width: 100%;
        min-height: 5rem;
        border-radius: .5rem;
        color: ${({ theme }) => theme.text} !important;
        padding: 1rem;
        padding-left: 2rem;
        text-decoration: none !important;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`

const ListItemContent = styled.div`
    width: 100%;
    min-height: 5rem;
    border-radius: .5rem;
    color: ${({ theme }) => theme.text} !important;
    padding: 1rem;
    padding-left: 2rem;
    text-decoration: none !important;
    display: flex;
    align-items: center;
`


const ListItemAvatar = styled.div`
    width: 4rem;
    height: 4rem;
    margin-right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ currentColor }) => currentColor};
    border-radius: 50%;
    font-size: 1.8rem;
`
const ListItemColorContainer = styled.div`
    width: 4rem;
    height: 4rem;
    margin-right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`
const ListItemColor = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: .3rem;
    border: 1px solid ${({ theme }) => theme.form.unfocused.border};
    background: ${({ currentColor }) => currentColor};
    cursor: pointer;
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 5rem;
`

const Colors = styled.div`
    position: absolute;
    top: calc(100%);
    left: 1rem;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 4rem);
    grid-template-rows: 3.5rem;
    grid-auto-rows: 3rem;
    grid-gap: .7rem;
    row-gap: .7rem;
    z-index: 2;
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: .5rem;
`

const Color = styled.div`
    cursor: pointer;
    background: ${({ color }) => color};
    border-radius: .5rem;
`

const Projects = props => {

    const { setIsManaginDashboard, setIsInFront, index } = props

    const dispatch = useDispatch()

    const {
        text: { text },
        todos: { todoBoards }
    } = useSelector(state => state)

    const [ showCta, setShowCta ] = useState(false)
    const [ isManagingColor, setIsManagingColor ] = useState(false)
    const [ isSelectingColor, setIsSelectingColor ] = useState(false)

    const ctaRef = useRef()
    const containerRef = useRef()

    const selectColorHandler = color => {
        const updatedBoard = {
            ...todoBoards[isSelectingColor],
            color
        }
        dispatch(actions.setTodoBoard(updatedBoard))
    }

    const renderColorSelector = () => {
        const colors = ["#ffdfe4","#c2eef5", "#def2ff",  "#FA8072","#FF7F50", "#D8BFD8"]
        const allowedColors = todoBoards ? colors.filter(color => Object.values(todoBoards).findIndex(i => i.color === color) === -1) : colors
        return (
            <Colors>
                {allowedColors.map((color, index) => (
                    <Color key={index} color={color} onClick={() => selectColorHandler(color)}/>
                ))}
            </Colors>
        )
    }

    useOnClickOutside(ctaRef, () => {
        if(showCta){
            setShowCta(false)
        }
    })

    useOnClickOutside(containerRef, () => {
        if(isManagingColor){
            setIsManagingColor(false)
        }
    })

    const toggleList = () => {
        if(!showCta){
            setIsInFront(index)
            setShowCta(true)
        } else {
            setShowCta(false)
        }
    }

    const startManage = () => {
        setShowCta(false)
        setIsManagingColor(true)
    }


    const selectDashboard = boardId => {
        if(!isManagingColor){
            dispatch(actions.setActiveTodoBoard(boardId))
        }
    }

  

    const saveHandler = async => {

    }

    const ctaList = [
        { label: text.new_project, onClick: () => props.history.push(`/${text.link_projects}?add=true`)},
        { label: text.move_and_resize, onClick: () => setIsManaginDashboard(true)},
        { label: text.manage_colors, onClick: () => startManage()}
    ]

  
    return (
        <Container ref={containerRef}>
            <Header>
                <HeaderLabel>{text.my_projects}</HeaderLabel>
                <HeaderCta>
                    <HeaderCtaItem onClick={() => props.history.push(`/${text.link_projects}?add=true`)}>
                        <HeaderCtaItemIcon>
                            <AppIcon id="plus"/>
                        </HeaderCtaItemIcon>
                        
                    </HeaderCtaItem>
                    <HeaderCtaItem className="small" ref={ctaRef} >
                        <HeaderCtaItemIcon className="small"  onClick={toggleList} isActive={showCta}>
                            <AppIcon id="ellipsis-h"/>
                        </HeaderCtaItemIcon>
                        
                        {showCta && (
                            <Cta>
                                {ctaList.map((action, index) => (
                                    <CtaItem
                                        key={index}
                                        onClick={action.onClick}
                                    >
                                        {action.label}
                                    </CtaItem>
                                ))}
                            </Cta>
                        )}
                    </HeaderCtaItem>
                </HeaderCta>
            </Header>
            <List>
                {todoBoards && Object.values(todoBoards).map(board => {
                    const CurrentContent = isManagingColor ? ListItemContent : Link
                    return (
                        <ListItem
                            key={board.boardId}
                            onClick={() =>selectDashboard(board.boardId)}     
                        >
                            <CurrentContent to={`/${text.link_projects}/${stringToQueryParam(board.title)}`}>
                                {isManagingColor ?
                                    <ListItemColorContainer>
                                        <ListItemColor currentColor={board.color} onClick={() => setIsSelectingColor(board.boardId)}/>
                                        {isSelectingColor === board.boardId && renderColorSelector()}
                                    </ListItemColorContainer> :
                                    <ListItemAvatar currentColor={board.color}>
                                        {board.title[0]}
                                    </ListItemAvatar>
                                }
                                    {board.title}
                            </CurrentContent>
                        </ListItem>
                    )
                })}
                {isManagingColor && (
                    <ButtonContainer>
                        <Button small transparent onClick={() => setIsManagingColor(false)}>
                            {text.cancel}
                        </Button>
                        <Button small primary onClick={saveHandler}>
                            {text.save}
                        </Button>
                    </ButtonContainer>
                )}

            </List>
        </Container>
     )
};

export default withRouter(Projects);
