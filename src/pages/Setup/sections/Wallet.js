import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Container, Title, SubTitle } from './components'
import { useSelector, useDispatch } from 'react-redux'
import { Form, formProps, Button } from '../../../components'
import * as actions from '../../../store/actions'
import { Wallet as WalletComponent } from '../../../elements'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const FormContainer = styled.div`
    margin-top: 3rem;
    width: 35rem;

`

const WalletList = styled.div`
    width: 50%;
    max-width: 35rem;
    margin-left: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        margin-bottom: 2rem;
    }
`


const Wallet = props => {

    const dispatch = useDispatch()

    const {navigateHandler, enabelSectionHandler } = props

    const {
        user: { wallets },
        text: { text },
        settings: { currency }
    } = useSelector(state => state)

    const initialInputs = [
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

    const creditLimitInput = {
        id: "creditLimit",
        name: "creditLimit",
        input_type: "input",
        type: "number",
        placeholder: text.credit_limit,
        label: text.credit_limit,
        unit: currency ? currency.symbol : null,
        required: true
    }


    const [inputs, setInputs] = useState(initialInputs)
    const [values, getValues] = useState(null)

    useEffect(() => {
        if(values){
            const isCreditCard = values.type === "credit_card"
            const showCreditLimit = inputs.find(input => input.id === "creditLimit")

            let updatedInputs = null
            if(isCreditCard && !showCreditLimit){
                updatedInputs = [...inputs, creditLimitInput]
            }
            if(!isCreditCard && showCreditLimit){
                updatedInputs = inputs.filter(input => input.id !== "creditLimit")
            }
            if(updatedInputs){
                setInputs(updatedInputs)
            }
        }
    },[values])


    const addAssetHandler = data => {
        // enabelSectionHandler("budget")
        formProps.resetForm()
        dispatch(actions.addWallet(data))
    }
    



    return (
        <Container>
            <Content>
                <Title>{text.wallet}</Title>
                <SubTitle>
                    {text.wallet_text}
                </SubTitle>
                    <FormContainer>
                        <Form 
                            inputs={inputs}
                            submitHandler={addAssetHandler}
                            buttonLabel={text.add}
                            getValues={val => getValues(val)}
                            secondaryLabel={wallets ? text.next : null}
                            onClickSecondary={() => navigateHandler("next")}
                            secondaryButtonStyle={{
                                order: 2
                            }}
                        />
                    </FormContainer>
            </Content>
            {wallets && wallets.length > 0 && (
                <WalletList>
                    {wallets.map((wallet) => (
                        <WalletComponent wallet={wallet}/>
                    ))}
                </WalletList>
            )}
        </Container>
     )
};

export default Wallet;
