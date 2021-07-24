import React, {useState, useEffect } from 'react'
import styled from "styled-components"
import { ScrollBar } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { getTimeStamp, sortMessages } from '../../functions'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import * as actions from '../../store/actions'
import MessageItem from './MessageItem'
import { uuid } from 'uuidv4'
import ChatLoading from './ChatLoading'


const Container = styled(ScrollBar)`
    width: 100%;
    height: calc(100% - ${props => props.messageBarHeight}px);
    padding: 2rem;
    padding-right: 4rem;
    position: relative;
    background: ${props => props.theme.surface};
`

const Convo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-right: .3rem;

    > div:not(:last-child) {
        margin-bottom: 1.2rem;
    }
    
`

const ConvoEnd = styled.div``

const ConvoGroup = styled.div`
    display: flex;
    flex-direction: column;
`


const Chat = props => {

    const [messages, setMessages ] = useState(null)

    const { 
        user: { id: userId },
        settings: { socket },
        messages: conversations
    } = useSelector(state => state)

    const { messageBarHeight, current } = props

    useEffect(() => {
        if(current){
            if(conversations[current.id] && conversations[current.id].loaded){
                setMessages(sortMessages(conversations[current.id].data))
            } else {
                socket.emit('get-messages', {
                    associationId: current.id,
                    userId
                })
            }
        }
    },[current, conversations])

    useEffect(() => {
        const convoEnd = document.getElementById("convo_end")
        if(convoEnd){
            convoEnd.scrollIntoView()
        }  
    },[messages])


    return (
        <Container messageBarHeight={messageBarHeight}>
            <Convo>
                {!messages && <ChatLoading />}
                
                {messages && messages.map(group => (
                    <ConvoGroup key={uuid()}>
                        {group.map((item, index) => (
                            <MessageItem 
                                key={item.id} 
                                message={item}
                                index={index}
                                group={group}
                            />
                        ))}
                    </ConvoGroup>
                ))}
                <ConvoEnd id="convo_end"/>
            </Convo>
        </Container>
     )
};

export default Chat;
