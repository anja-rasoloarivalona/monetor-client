import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    min-height: 3.5rem;
    width: 90%;
    margin-bottom: 2rem;
`

const Title = styled.div`
    width: 100%;
    min-height: 3.5rem;
    display: flex;
    align-items: center;
    cursor: ${props => props.isEditingTitle ? "initial" : "cursor"};
    position: relative;

`
const TitleIcon = styled.div`
    min-width: 3rem;
    display: flex;
    align-items: flex-start;
    align-items: center;
    
    svg {
        font-size: 1.8rem;
    }
`

const TitleLabel = styled.div`
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid transparent;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 1rem;
`

const TitleInput = styled.input`
    height: 3.5rem;
    width: 100%;
    font-family: inherit;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    background: ${props => props.theme.form.unfocused.background};
    font-size: 2rem;
    padding: 0 1rem;
    border-radius: .3rem;
    font-weight: bold;

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border};
  
`

const ListName = styled.div`
    margin-left: 4rem;
    font-size: 1.3rem;
    color: ${props => props.theme.grey};
    margin-top: .5rem;
`

const Header = props => {

    const { edited, title, setTitle, todoLists, isEditingTitle, setIsEditingTitle } = props

    const {
        text: { text }
    } = useSelector(state => state)

    const input = useRef()

    useOnClickOutside(input, () => {
        setIsEditingTitle(false)
    })

    useEffect(() => {
        if(isEditingTitle){
            input.current.focus()
        }
    },[isEditingTitle])

    return (
        <Container>
            <Title isEditingTitle={isEditingTitle}>
                <TitleIcon>
                    <FontAwesomeIcon icon="pencil-alt" />
                </TitleIcon>
                    {isEditingTitle ?
                        <TitleInput
                            ref={input} 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        /> :
                        <TitleLabel onClick={() => setIsEditingTitle(true)}>
                            {edited.title}
                        </TitleLabel>
                    }
            </Title>
            <ListName>
                {text.in_list} {todoLists[edited.todoListId].title}
            </ListName>
        </Container>
     )
};

export default Header;
