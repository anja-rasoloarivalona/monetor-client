import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${props => {
        if(props.isChecked){
            return {
                ".check-container": {
                    borderColor: props.theme.primary
                },
                ".label": {
                    color: props.theme.textActive
                }
            }
        }
    }}
`

const Label = styled.div`
    color: ${props => props.theme.text};
    font-size: 1.4rem;
`

const CheckContainer = styled.div`
    width: 2rem;
    height: 2rem;
    border: .5px solid ${props => props.theme.text};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Check = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${props => props.theme.primary};
`


const RadioInput = props => {

    const { input, currentValue, onChange  } = props

    const isChecked = input.value === currentValue

    return (
        <Container
            isChecked={isChecked}
            onClick={() => onChange(input.value)}
        >
            <Label className="label">
                {input.label}
            </Label>
            <CheckContainer className="check-container">
                {isChecked && (
                    <Check />
                )}
            </CheckContainer>
        </Container>
     )
};

export default RadioInput;
