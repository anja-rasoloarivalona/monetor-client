import React from "react"
import styled from "styled-components"
import { Container, Header, HeaderTitle, Title } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { Form, formProps } from '../../components'


const FormContainer = styled.div`
    max-width: 50rem;
    margin-top: 2rem;

    form {
        > div:last-child {
            margin-bottom: 0rem;
        }
    }

    
`

const General = () => {

    const { 
        text: { text },
        user,
        settings
    } = useSelector(state => state)


    const inputs =  [
        {
            name: "firstName",
            label: text.first_name,
            placeholder: text.first_name,
            type: "text",
            input_type: "input",
            required: true
        },
        {
            name: "lastName",
            label: text.first_name,
            placeholder: text.first_name,
            type: "text",
            input_type: "input",
        },
        {
            name: "email",
            label: text.email,
            placeholder: text.email,
            type: "email",
            input_type: "input",
            disabled: true,
            containerStyle: {
                gridColumn: "1 / -1"
            }
        }
    ]

    const submitHandler = async data => {
        console.log({
            data
        })
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.profile}
                </HeaderTitle>
            </Header>
            <FormContainer>
                <Form 
                    inputs={inputs}
                    buttonLabel={text.save}
                    submitHandler={submitHandler}
                    formStyle="grid"
                    hideSubmitCta
                />
            </FormContainer>

        </Container>
     )
};

export default General;
