import React from "react"
import styled from "styled-components"
import Sidebar from './Sidebar'
import Chat from './Chat'
import MessageBar from "./MessageBar"
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    background: green;
    padding-left: 35rem;
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: red;
`

const Messages = () => {

    const {
        user
    } = useSelector(state => state)

    if(!user.contacts){
        return null
    }

    return (
        <Container>
            <Sidebar />
            <Content>
                <Chat />
                <MessageBar />
            </Content>
        </Container>
     )
};

export default Messages;
