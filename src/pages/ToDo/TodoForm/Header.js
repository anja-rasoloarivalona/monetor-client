import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    min-height: 4.5rem;
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.div`
    width: 100%;
    min-height: 4.5rem;
    display: flex;
    align-items: center;
    cursor: ${props => props.isEditingTitle ? "initial" : "cursor"};
    position: relative;
    margin-right: 1rem;
    border-radius: .5rem;
    overflow: hidden;

    :hover {
        background: ${props => props.theme.surface};
    }
`

const TitleLabel = styled.div`
    font-size: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid transparent;
    height: 100%;
    width: max-content;
    max-width: calc(100% - 3rem);
    display: flex;
    align-items: center;
    padding-left: 1rem;
    border: 1px solid transparent;
    :hover {
        svg {
            opacity: 1;
        }
    }
`

const TitleLabelIcon = styled.div`
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    svg {
        font-size: 2rem;
        opacity: 0;
    }
`

const TitleInput = styled.input`
    height: 4.5rem;
    width: 100%;
    font-family: inherit;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    background: ${props => props.theme.form.unfocused.background};
    font-size: 2.5rem;
    padding: 0 1rem;
    font-weight: bold;
    border-radius: .5rem;


    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border};
  
`

const Header = props => {

    const { edited, title, setTitle, isEditingTitle, setIsEditingTitle } = props

    const {
        text: { text },
        user: { todoBoards, activeTodoBoardId }
    } = useSelector(state => state)

    const input = useRef()
    const container = useRef()

    useEffect(() => {
        if(isEditingTitle){
            input.current.focus()
        }
    },[isEditingTitle])

    
    const listOptions = []
    Object.values(todoBoards[activeTodoBoardId].todoLists).forEach(list => {
        listOptions.push({
            label: list.title,
            value: list.id
        })
    })
    

    return (
        <Container ref={container}>
            <Title isEditingTitle={isEditingTitle}>
                {isEditingTitle ?
                    <TitleInput
                        ref={input} 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                    /> :
                    <TitleLabel onClick={() => setIsEditingTitle(true)}>
                        {edited.title}
                        <TitleLabelIcon>
                            <FontAwesomeIcon icon="pencil-alt"/>
                        </TitleLabelIcon>
                    </TitleLabel>
                }
            </Title>
        </Container>
     )
};

export default Header;
