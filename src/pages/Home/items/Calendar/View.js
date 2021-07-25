import React from "react"
import styled from "styled-components"
import { getHoursDate } from '../../../Calendar/functions'
import { useSelector } from 'react-redux'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
`

const Item = styled.div`
    width: 100%;
    height: 4.6rem;
    position: relative;
    border-bottom: 1px solid ${props => props.theme.background};

    :before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 1px;
        background: ${props => props.theme.background};
    }
`

const View = () => {

    const {
        settings: { unitType }
    } = useSelector(state => state)

    return (
        <Container>
            {getHoursDate(unitType).map((h, index) => (
                <Item key={index}>
                </Item>
            ))}
        </Container>
     )
};

export default View;
