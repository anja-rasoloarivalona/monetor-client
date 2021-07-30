import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'


const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Balance = () => {

    const {
        home: { weather }
    } = useSelector(state => state)

    return (
        <Container>
            Balance
        </Container>
     )
};

export default Balance;
