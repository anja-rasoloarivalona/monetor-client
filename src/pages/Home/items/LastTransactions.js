import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import Transactions from '../../Transactions/Dashboard/items/Transactions'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const LastTransactions = () => {

    const {
        home: { weather }
    } = useSelector(state => state)

    return (
        <Container>
            <Transactions />
        </Container>
     )
};

export default LastTransactions;
