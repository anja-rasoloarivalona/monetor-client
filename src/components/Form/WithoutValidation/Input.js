import React from "react"
import styled from "styled-components"

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

const InputComponent = props => {

    const { value, onChange, onFocus, onBlur, customRef } = props

    const handleOnFocus = () => {
        if(onFocus){
            onFocus()
        }
    }

    const handleOnBlur = () => {
        if(onBlur){
            onBlur()
        }
    }

    return (
        <Input
            ref={customRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        />
          
     )
};

export default InputComponent;
