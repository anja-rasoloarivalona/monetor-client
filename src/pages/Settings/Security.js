import React from "react"
import styled from "styled-components"
import { Container, Header, HeaderTitle, Title } from './style'
import { useSelector, useDispatch } from 'react-redux'



const Security = () => {

    const { 
        text: { text }
    } = useSelector(state => state)


    return (
        <Container>
            <Header>
                <HeaderTitle>{text.login_and_security}</HeaderTitle>
            </Header>
        </Container>
     )
};

export default Security;
