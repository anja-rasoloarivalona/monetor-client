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
    transition: background .1s ease-in;
    
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
        if(props.isBackgroundDisplayed && props.useTransparentHeader){
            const pagesIdWihoutBackground = ["transactions"]
            return {
                background: !pagesIdWihoutBackground.includes(props.pageId) ? props.theme.transparentSurface : props.theme.surface,
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

    const { 
        user,
        text: { text, page },
        theme: { backgroundImage }
    } = useSelector(state => state)

    const [ useTransparentHeader, setUseTransparentHeader ] = useState(false)

    const { scrollY } = useScroll()

    useEffect(() => {
        if(scrollY > 90 && useTransparentHeader){
            setUseTransparentHeader(false)
        }
        if(scrollY < 5 && !useTransparentHeader){
            setUseTransparentHeader(true)

        }
    },[scrollY])

    return (
        <Container
            pageId={page ? page.id : null}
            isBackgroundDisplayed={backgroundImage}
            useTransparentHeader={useTransparentHeader}
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
                        />
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
