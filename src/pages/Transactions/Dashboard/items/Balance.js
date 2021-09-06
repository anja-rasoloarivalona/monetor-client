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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 4rem .5rem 4.5rem;
`

const Header = styled.div`
    grid-column: 1 / -1;
`

const Content = styled.div`
    position: relative;
    grid-column: 1 / -1;
    grid-row: 3 / 4;
`

const AmountContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    grid-row: 3 / 4;
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
