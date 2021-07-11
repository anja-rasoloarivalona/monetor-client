import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useOnClickOutside, useKeyboardEvent } from '../../hooks'

const Container = styled.div`
    height: 100%;
    width: 100%;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background: white;
    font-size: 1.4rem;
    padding: 1rem;
    box-shadow: ${props => props.theme.boxShadowLight};
    border-radius: .3rem;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    :focus {
        outline: none;
        ::placeholder {
            color: transparent;
        }
    }
`

const CardInput = props => {

    const { addCardHandler, setIsAddingCard } = props

    const [title, setTitle] = useState("")

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    },[])

    const submitHandler = () => {
        if(title === ""){
             setIsAddingCard(false)
        } else {
             addCardHandler(title)
            setTitle("")
        }
    }
    useOnClickOutside(inputRef, () => submitHandler())
    useKeyboardEvent("Enter",  () => submitHandler())

    return (
        <Container>
            <Input
                ref={inputRef} 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title..."
            />
        </Container>
     )
};

export default CardInput;
