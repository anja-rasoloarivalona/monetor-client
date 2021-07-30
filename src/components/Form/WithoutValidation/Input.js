import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    ${props => {
        if(props.isFocused){
            return {
                ".currency": {
                    color: props.theme.text
                }
            }
        }
    }}
`


const Input = styled.input`
    width: 100%;
    height: 100%;
    padding-left: 1.2rem;
    background: ${props => props.theme.form.unfocused.background};
    border: 1px solid ${props => props.theme.form.unfocused.border};
    color: ${props => props.theme.textLight};
    font-family: Roboto;
    border-radius: .3rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border};
    }

`

const Currency = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 1.2rem;
    margin: auto;
    color: ${props => props.theme.form.unfocused.border};
    display: flex;
    align-items: center;
    font-size: 1.3rem;
`

const InputComponent = props => {

    const { value, onChange, onFocus, onBlur, customRef, focusOnMount, isAmount, type } = props


    const {
        settings: { currency }
    } = useSelector(s => s)

    const input = useRef()

    const [ isFocused, setIsFocused ] = useState(false)

    const handleOnFocus = () => {
        setIsFocused(true)
        if(onFocus){
            onFocus()
        }
    }

    const handleOnBlur = () => {
        setIsFocused(false)
        if(onBlur){
            onBlur()
        }
    }

    useEffect(() => {
        if(focusOnMount){
            input.current.focus()
        }
    }, [])

    return (
        <Container isFocused={isFocused}>
            <Input
                ref={customRef || input}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                type={type}
            />
            {isAmount && (
                <Currency className="currency">
                    {currency.symbol}
                </Currency>
            )}
        </Container>

          
     )
};

export default InputComponent;
