import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {  useSelector } from 'react-redux'
import UserProfile from "./UserProfile"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import AppSelector from "./AppSelector"
import Searchbar from "./Searchbar"
import Messages from './Messages'
import { Link } from '../../../components'
import { IconContainer } from './style'
import { useScroll } from '../../../hooks'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
    height: 6.5rem;
    width: 100vw;
    padding-right: 3rem;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    transition: background .1s ease-in;

    * {
        transition: color .1s ease-in;

    }
    
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

    ${props => {
        if((props.theme.backgroundImage && props.useTransparentHeader) || props.useSecondary){
            return {
                background: props.useSecondary ? props.theme.secondarySurface : props.theme.transparentSurface,
                boxShadow: props.theme.boxShadowLight,
                ".toggle__menu": {
                    "a": {
                        color: `${props.theme.white} !important`
                    }
                },
                ".icon__container": {
                    "svg": {
                        color: props.theme.white
                    }
                }
            }
        } else {
            return {
                background: props.theme.surface,
                boxShadow: props.theme.boxShadowLight
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
        color: ${props =>  props.theme.text} !important;
    }
`

const AppHeader = props => {

    const { setShowSidebar } = props

    const location = useLocation()

    const { 
        user,
        text: { text, page },
        theme: { backgroundImage }
    } = useSelector(state => state)

    const initial = backgroundImage ? true : false
    const [ useTransparentHeader, setUseTransparentHeader ] = useState(initial)
    const [ useSecondary, setUseSecondary ] = useState(false)

    const { scrollY } = useScroll()

    useEffect(() => {
        if(scrollY > 90 && useTransparentHeader){
            setUseTransparentHeader(false)
        }
        if(scrollY < 5 && !useTransparentHeader){
            setUseTransparentHeader(true)
        }
    },[scrollY])

    useEffect(() => {
        const currentPathname = location.pathname.split("/")[1]
        if(currentPathname === text.link_transactions){
            setUseTransparentHeader(false)
        }
        if(currentPathname === text.link_calendar){
            setUseSecondary(true)
        } else {
            setUseSecondary(false)
        }
    },[location])

    return (
        <Container
            pageId={page ? page.id : null}
            useTransparentHeader={useTransparentHeader}
            useSecondary={useSecondary}
        >
            {user.setupAt ?
                <>
                    <ToggleMenu className="toggle__menu">
                        <IconContainer
                            onClick={() => setShowSidebar(true)}
                            className="icon__container"
                        >
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
                        <IconContainer className="icon__container">
                            <FontAwesomeIcon icon={faBell}/>
                        </IconContainer>
                        <UserProfile 
                            useTransparentHeader={useTransparentHeader}
                            useSecondary={useSecondary}
                        />
                        <AppSelector 
                            useSecondary={useSecondary}
                        />  
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
