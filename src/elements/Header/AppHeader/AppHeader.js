import React from "react"
import styled from "styled-components"
import {  useSelector } from 'react-redux'
import UserProfile from "./UserProfile"

const Container = styled.div`
    height: 6.5rem;
    width: 100vw;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadowLight};

`

const AppHeader = () => {

    const {
        user
    } = useSelector(state => state)

    const isUserReady = user.assets

    return (
        <Container>
            <UserProfile />
        </Container>
     )
};

export default AppHeader;
