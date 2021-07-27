import React from "react"
import styled from "styled-components"
import { Container, Header, HeaderTitle, Title } from './style'
import { useSelector, useDispatch } from 'react-redux'


const Display = () => {

    const { 
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Header>
                <HeaderTitle>{text.display}</HeaderTitle>
            </Header>
            
        </Container>
     )
};

export default Display;
