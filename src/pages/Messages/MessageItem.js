import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import TypingAnimation from "./TypingAnimation"
import { getTimeStamp } from '../../functions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Container = styled.div`
    max-width: 48%;
    display: flex;
    flex-direction: column;
    position: relative;

    ${props => {
        if(props.currentUser){
            return {
                alignSelf: "flex-end",
                ".content": {
                    background: props.theme.primary,
                    color: props.theme.white,
                    alignSelf: "flex-end"
                },
                ".timestamp": {
                    textAlign: "end"
                }
            }
        } else {
            return {
                ".content": {
                    background: props.theme.background,
                },
            }
        }
    }}

    ${props => {
        if(!props.showTimestamp){
            return {
                ".content": {
                    marginBottom: ".6rem"
                }
            }
        }
    }}
`
const Content = styled.div`
    width: max-content;
    max-width: 100%;
    padding: 1rem;
    border-radius: 1.6rem;
    word-wrap: break-word;
    font-size: 1.5rem;

    @media screen and (max-width: 600px) {
        font-size: 14px;
    }
`

const TimeStamps = styled.div`
    font-size: 1.2rem;
    color: ${props => props.theme.textLight};
    margin-top: .8rem;
    margin-bottom: .8rem;
`

const Avatar = styled.div`
    position: absolute;
    bottom: 21px;
    left: -34px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background: ${props => props.theme.onSurface};
`

const AvatarImg = styled.img`
    width: 100%;
    object-fit: contain;
`

const AvatarIcon = styled.div`
`


const MessageItem = props => {

    const { message, isTyping, index, group } = props

    const showTimestamp = () => {
        const lastIndex = group.length - 1
        if(lastIndex === index){
            return true
        }
        if(group[index - 1] && group[index - 1].timestamp !== message.timestamp){
            return true
        }
        return false
    }


    const {
        user: { id: userId },
        settings: { locale }
    } = useSelector(state => state )

    const currentUser = message && message.fromId === userId

    return (
        <Container
            currentUser={currentUser}
            showTimestamp={showTimestamp()}
        >
            <Content className="content">
                {isTyping ?
                    <TypingAnimation /> :
                    message.content
                }
            </Content>
            {showTimestamp() && !isTyping && (
                <TimeStamps className="timestamp">
                  {getTimeStamp(message.createdAt, locale)}
              </TimeStamps>  
            )}
            {((showTimestamp() && !currentUser) || isTyping) && (
                <Avatar className="avatar">
                    <FontAwesomeIcon icon="user"/>
                </Avatar>
            )}

        </Container>
     )
};

export default MessageItem;
