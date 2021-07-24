import React, { useState } from "react"
import styled from "styled-components"
import {  useSelector } from 'react-redux'
import UserProfile from "./UserProfile"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons'
import AppSelector from "./AppSelector"
import Searchbar from "./Searchbar"
import Messages from './Messages'
import { Link } from '../../../components'

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

const ToggleMenu = styled(Section)`
    width: 30rem;
    height: 100%;

    a {
        font-size: 1.8rem;
        margin-left: 1rem;
    }

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
        color: ${props => props.themetextLight};
    }

    :hover {
        background: ${props => props.theme.background};
    }
`


const AppHeader = props => {

    const { setShowSidebar } = props

    const { 
        user,
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            
            {user.setupAt ?
                <>
                    <ToggleMenu>
                        <IconContainer onClick={() => setShowSidebar(true)}>
                            <FontAwesomeIcon icon="bars"/>
                        </IconContainer>
                        <Link to={`/${text.link_app_home}`}>
                            {text.home}
                        </Link>
                    </ToggleMenu>
                    <Section>
                        <Searchbar />
                    </Section>
                    <Section>
                        <Messages />
                        <IconContainer>
                            <FontAwesomeIcon icon={faBell}/>
                        </IconContainer>
                        <UserProfile />
                        <AppSelector />  
                    </Section>
                </> :
                <>
                    <Section>

                    </Section>
                    <Section>
                        <UserProfile />
                    </Section>
                </>
           
            }
        </Container>
     )
};

export default AppHeader;
