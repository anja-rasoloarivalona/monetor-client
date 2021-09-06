import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div``

const Amount = props => {

    const { value } = props
    const {
        settings : { locale, currency },
    } = useSelector(state => state)

    const addSpaces = value => {
        let parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    if(locale === "fr"){
        return (
            <Container>
                {addSpaces(value.toFixed(2))}{currency?.symbol}
            </Container>
        )
    } else {
        return (
            <Container>
                {currency?.symbol}{addSpaces(value.toFixed(2))} 
            </Container>
        )
    }
}

export {
    Amount
}