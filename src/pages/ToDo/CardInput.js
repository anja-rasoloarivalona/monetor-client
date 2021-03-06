import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import {¬†useOnClickOutside, useKeyboardEvent } from '../../hooks'

const Container = styled.div`
    height: max-content;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    font-size: 1.4rem;
    padding: 0 1rem;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    :focus {
        outline: none;
    }
`

const CardInput = props => {

    const {submitCardHandler, setIsAddingCard } = props

    const [title, setTitle] = useState("")

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    },[])

    const submitHandler = (isClosing) => {
        if(title !== ""){
            submitCardHandler(title)
            setTitle("")
        }
        if(isClosing || title === ""){
            setIsAddingCard(false)
        }
    }
    useOnClickOutside(inputRef, () => submitHandler(true))
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
