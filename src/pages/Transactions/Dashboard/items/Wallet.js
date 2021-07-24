import React from "react"
import styled from "styled-components"
import { ReactComponent as Chip } from '../../../../icons/sim-card.svg'
import { ReactComponent as Money } from '../../../../icons/money.svg'
import { useSelector } from 'react-redux'
import { Amount } from '../../../../components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.surface};
    padding: 2rem;
    border-radius: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);


    svg {
        width: 3rem;
        height: 3rem;
        transform: ${props => props.type !== "cash" ? "rotate(90deg)" : "0"};
        fill: grey;
        margin-right: 1rem;
    }

    & > div:nth-child(2) {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
        display: flex;
        align-items: flex-end;
        font-size: 2.3rem;
    }

    .amount {
        grid-column: 1 / -1 !important;
    }
`

const Name = styled.div`
        font-size: 2rem;
        text-align: right;
`

const Type = styled.div`
    display: flex;
    align-items: center;
    height: min-content;
    font-size: 1.6rem;
`

const Wallet = props => {
    const {
        text: { text }
    } = useSelector(state => state)
    const { wallet } = props
    return (
        <Container type={wallet.type}>
        <Type>
            {wallet.type === "cash" ? <Money /> : <Chip />}
            {text[wallet.type]}
        </Type>
        <Amount
            value={parseFloat(wallet.amount)}
            className="amount"
        />
        <Name>{wallet.name}</Name>
    </Container>
    )
};

export default Wallet;
