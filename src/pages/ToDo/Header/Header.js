import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import {  useOnClickOutside } from '../../../hooks'
import Settings from './Settings'
import InviteMember from './InviteMember'
import DashboardSelector from './DashboardSelector'

const Container = styled.div`
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TitleContainer = styled.div`
    height: 4rem;
    position: relative;
    width: max-content;
    min-width: 20rem;
    max-width: 30vw;
`

const Title = styled.div`
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.backgroundImage ? "white" : props.theme.text};
`

const TitleInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 2rem;
    font-weight: 600;
    border: none;
    font-family: Roboto;
    background: transparent;
    color: ${props => props.theme.backgroundImage ? "white" : props.theme.text};
    :focus {
        outline: none;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`

const TodoHeader = () => {

    const {
        text: { text },
        user: { todoBoards, activeTodoBoardId }
    } = useSelector(s => s)

    const inputRef = useRef()
    const containerRef = useRef()


    const initialTitle = todoBoards[activeTodoBoardId].title === "title" ? text.title : todoBoards[activeTodoBoardId].title 
    const [ isEditingTitle, setIsEditingTitle ] = useState(false)
    const [ title, setTitle ] = useState(initialTitle)

    const [ showList, setShowList ] = useState(null)

    useOnClickOutside(inputRef, () => setIsEditingTitle(false))
    useOnClickOutside(containerRef, () => setShowList(null))

    useEffect(() => {
        if(isEditingTitle && inputRef.current){
            inputRef.current.focus()
        }
    },[isEditingTitle])


    const selectDashboardHandler = () => {

    }

    return (
        <Container ref={containerRef}>
            <TitleContainer>
                <Title onClick={() => setIsEditingTitle(true)}>
                    {title}
                </Title>
                {isEditingTitle && (
                    <TitleInput 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        ref={inputRef}
                    />
                )}
            </TitleContainer>
            <ButtonsContainer>
                {/* <InviteMember 
                    showList={showList}
                    setShowList={setShowList}
                /> */}
                <Settings 
                    showList={showList}
                    setShowList={setShowList}
                />
                <DashboardSelector />
            </ButtonsContainer>
        </Container>
     )
};

export default TodoHeader;
