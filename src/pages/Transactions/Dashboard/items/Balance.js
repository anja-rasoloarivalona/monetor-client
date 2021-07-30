import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Amount } from '../../../../components'
import { Title } from './style'
import { useOnClickOutside } from '../../../../hooks'
import { Input } from '../../../../components/Form/WithoutValidation'
import * as actions from '../../../../store/actions'
import axios from 'axios'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    margin-bottom: 1.5rem;
`

const Content = styled.div`
position: relative;

`

const AmountContainer = styled.div`
    height: 4.5rem;
    display: flex;
    align-items: center;
    width: 80%;
    font-size: 2rem;
    cursor: pointer;
`

const InputContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;

    input {
        font-size: 2rem;
    }
`

const Balance = () => {

    const {
        text: { text },
        user: { balance }
    } = useSelector(s => s)

    const dispatch = useDispatch()

    const inputRef = useRef()

    const currentBalance = balance ? parseFloat(balance.toFixed(2)) : 0.00
    const [ showInput, setShowInput ] = useState(false)
    const [ value, setValue ] = useState(currentBalance)

    useOnClickOutside(inputRef, () => updateBalanceHandler())

    const updateBalanceHandler = async () => {
        const formattedValue = parseFloat(parseFloat(value).toFixed(2))
        if(formattedValue !== currentBalance){
            dispatch(actions.setUserBalance(formattedValue))
            try {
                const res = await axios.put("/user/balance", {balance: formattedValue})
                console.log({
                    res
                })
            } catch(err){
                console.log(err)
            }
        }
        setShowInput(false)
    }

    return (
        <Container>
            <Header>
                <Title>
                    {text.balance}
                </Title>
            </Header>
            <Content>
                <AmountContainer onClick={() => setShowInput(true)}>
                    <Amount value={balance}/>
                </AmountContainer>
                {showInput && (
                    <InputContainer ref={inputRef}>
                        <Input 
                            value={value}
                            onChange={setValue}
                            type="number"
                            focusOnMount
                            isAmount
                        />
                    </InputContainer>
                )}
            </Content>
        </Container>
     )
};

export default Balance;
