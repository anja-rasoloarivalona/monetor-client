import React from "react"
import styled from "styled-components"
import { Container, Title, SubTitle } from './components'
import { useSelector } from 'react-redux'
import { Form, formProps } from '../../../components'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FormContainer = styled.div`
    margin-top: 3rem;
    width: 35rem;

`

const Wallet = () => {

    const {
        text: { text },
        settings: { currency }
    } = useSelector(state => state)

    const inputs = [
        {
            id: "type",
            input_type: "select",
            name: "type",
            label: text.type,
            placeholder: text.type,
            options: [
                {value: "debit_card", label: text.debit_card},
                {value: "credit_card", label: text.credit_card},
                {value: "cash", label: text.cash}
            ],
            required: true
        },
        {
            id: "name",
            input_type: "input",
            type: "text",
            placeholder: text.name,
            label: text.name,
            name: "name",
            required: true
        },
        {
            id: "amount",
            input_type: "input",
            type: "number",
            placeholder: text.balance,
            label: text.balance,
            name: "amount",
            unit: currency ? currency.symbol : null,
            required: true
        }
    ]


    const addAssetHandler = data => {

    }

    return (
        <Container>
            <Content>
                <Title>
                    {text.wallet}
                </Title>
                <SubTitle>
                    {text.wallet_text}
                </SubTitle>
                <FormContainer>
                    <Form 
                        inputs={inputs}
                        submitHandler={addAssetHandler}
                        buttonLabel={text.add}
                    />
                </FormContainer>

            </Content>
        </Container>
     )
};

export default Wallet;
