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
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

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
