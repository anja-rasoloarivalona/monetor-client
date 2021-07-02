import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { Form } from '../../components'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10vh;
`

const FormContainer = styled.div`
    width: 90%;
    max-width: 45rem;
`

const Title = styled.h1`
    color: ${props => props.theme.text};
    margin-bottom: 4rem;
    text-transform: uppercase;
    font-size: 3rem;
    text-align: center;
`

const Signup = () => {

    const { 
        text: { text }
    } = useSelector(state => state)

    const inputs = [
        {
            id: "username",
            name: "username",
            type: "text",
            input_type: "input",
            label: text.username,
            placeholder: text.username,
            required: true
        },
        {
            id: "email",
            name: "email",
            type: "email",
            input_type: "input",
            label: text.email,
            placeholder: text.email,
            required: true
        },
        {
            id: "password",
            name: "password",
            type: "password",
            input_type: "input",
            label: text.password,
            placeholder: text.password,
            required: true
        },
    ]

    const signupHandler = () => {

    }

    return (
        <Container>
            <FormContainer>
                <Title>
                    {text.title}
                </Title>
                <Form 
                    inputs={inputs}
                    submitHandler={signupHandler}
                    buttonLabel={text.signup}
                />
            </FormContainer>
        </Container>
     )
};

export default Signup;
