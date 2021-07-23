import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Sidebar from './Sidebar'
import Chat from './Chat'
import MessageBar from "./MessageBar"
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    padding-left: 35rem;
`

const Content = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    position: relative;
`

const Messages = props => {

    const {
        user: { contacts },
        text: { text }
    } = useSelector(state => state)

    const location = useLocation()
    const [ messageBarHeight, setMessageBarHeight ] = useState(null)
    const [ current, setCurrent ] = useState(null)

    useEffect(() => {
        const contactId = queryString.parse(location.search).id
        const userHasContacts = contacts && contacts.length > 0
        if(contacts){
            if(contactId){
                const currentContact = contacts.find(i => i.id === contactId)
                setCurrent(currentContact)
                if(!currentContact){
                    if(userHasContacts){
                        setCurrent(contacts[0].id)
                        props.history.push(`/${text.link_messages}?id=${contacts[0].id}`)
                    } else {
                        props.history.push(`/${text.link_messages}`)
                    }
                }
            } else {
                if(userHasContacts){
                    setCurrent(contacts[0].id)
                    props.history.push(`/${text.link_messages}?id=${contacts[0].id}`)
                }
            }
        }
    },[])

    if(!contacts){
        return null
    }

    return (
        <Container>
            <Sidebar />
            <Content>
                <Chat 
                    current={current}
                    messageBarHeight={messageBarHeight} 
                />
                <MessageBar
                    current={current}
                    messageBarHeight={messageBarHeight} 
                    setMessageBarHeight={setMessageBarHeight} 
                />
            </Content>
        </Container>
     )
};

export default Messages;
