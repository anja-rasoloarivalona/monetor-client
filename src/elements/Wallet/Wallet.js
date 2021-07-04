import React from "react"
import styled from "styled-components"
import { Amount } from '../../components'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { useSelector  } from 'react-redux'
const Container = styled.div`
    width: 26rem;
    height: 13rem;
    background: #e4e4e4;
    border-radius: .5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-content: space-between;
    align-content: space-between;
    padding: 2rem;
`

const Nickname = styled.div`
    font-size: 1.4rem;
`

const AmountContainer = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 2rem;
`

const CtaContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Type = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 1.4rem;
`

const Wallet = props => {
    const { wallet } = props

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Nickname>
                {wallet.name}
            </Nickname>
            <CtaContainer>
                <FontAwesomeIcon 
                    icon="ellipsis-v"
                />
            </CtaContainer>
            <AmountContainer>
                <Amount value={wallet.amount}/>
            </AmountContainer>
            <Type>
                {text[`${wallet.type}`]}
            </Type>
        </Container>
     )
};

export default Wallet;
