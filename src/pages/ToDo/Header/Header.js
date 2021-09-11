import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import {  useOnClickOutside } from '../../../hooks'
import Settings from './Settings'
import InviteMember from './InviteMember'
import DashboardSelector from './DashboardSelector'
import { Button } from '../../../components'

const Container = styled.div`
    padding: 0 3rem;
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

const TodoHeader = props => {

    const { setIsEditingListOrder, isEditingListOrder,saveListHandler } = props

    const {
        text: { text },
        todos: {
            todoBoards,
            activeBoardId
        },
    } = useSelector(s => s)

    const inputRef = useRef()
    const containerRef = useRef()
    const initialTitle = todoBoards[activeBoardId].title === "title" ? text.title : todoBoards[activeBoardId].title 
    const [ isEditingTitle, setIsEditingTitle ] = useState(false)
    const [ title, setTitle ] = useState(initialTitle)


    useOnClickOutside(inputRef, () => setIsEditingTitle(false))

    useEffect(() => {
        if(isEditingTitle && inputRef.current){
            inputRef.current.focus()
        }
    },[isEditingTitle])

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

                {isEditingListOrder ?
                    <>
                        <Button transparent square onClick={() => setIsEditingListOrder(false)}>
                            {text.cancel}
                        </Button>
                        <Button square onClick={saveListHandler}>
                            {text.save}
                        </Button>
                    </> :
                    <>
                        {/* <InviteMember 
                            showList={showList}
                            setShowList={setShowList}
                        /> */}
                        <Settings />
                        <DashboardSelector />
                    </>
                }
            </ButtonsContainer>
        </Container>
     )
};

export default TodoHeader;
