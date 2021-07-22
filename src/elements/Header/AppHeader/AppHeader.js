import React, { useState } from "react"
import styled from "styled-components"
import {  useSelector } from 'react-redux'
import UserProfile from "./UserProfile"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons'
import AppSelector from "./AppSelector"

const Container = styled.div`
    height: 6.5rem;
    width: 100vw;
    padding-right: 3rem;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadowLight};
    
    ${props => {
        if(props.showList){
            return {
                ".title": {
                    background: props.theme.background,
                    borderRadius: ".5rem",
                    boxShadow: props.theme.boxShadowLight
                }
            }
        }
    }}
`

const Section = styled.div`
    display: flex;
    align-items: center;
`

const IconContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 1rem;

    svg {
        font-size: 1.7rem;
        color: ${props => props.theme.grey};
    }

    :hover {
        background: ${props => props.theme.background};
    }
`


const AppHeader = props => {

    const { setShowSidebar } = props

    return (
        <Container>
            <Section>
                <IconContainer onClick={() => setShowSidebar(true)}>
                    <FontAwesomeIcon icon="bars"/>
                </IconContainer>
            </Section>
            <Section>
                <IconContainer>
                    <FontAwesomeIcon icon={faComment}/>
                </IconContainer>
                <IconContainer>
                    <FontAwesomeIcon icon={faBell}/>
                </IconContainer>
                <UserProfile />
                <AppSelector />  
            </Section>

        </Container>
     )
};

export default AppHeader;
