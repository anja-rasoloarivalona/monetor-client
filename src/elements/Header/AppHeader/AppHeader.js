import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { NavLink } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import UserProfile from "./UserProfile"
import AppIcon from '../../../icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import AppSelector from "./AppSelector"
import Searchbar from "./Searchbar"
import Messages from './Messages'
import { Link } from '../../../components'
import { IconContainer } from './style'
import { useScroll } from '../../../hooks'
import { useLocation } from 'react-router-dom'
import logo from '../../../images/logos/logo-primary.png'
import { ReactComponent as Text} from '../../../icons/test.svg'

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
    svg {
        width: 2rem;
        height: 2rem;
    }

    
    ${props => {
        if(props.showList){
            return {
                ".title": {
                    background: props.theme.background,
                    borderRadius: ".5rem",
                    boxShadow: props.theme.boxShadowExtraLight
                }
            }
        }
    }}

    ${props => {
        if((props.theme.backgroundImage && props.useTransparentHeader)){
            return {
                background: props.theme.transparentSurface,
                boxShadow: props.theme.boxShadowExtraLight,
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
                boxShadow: props.theme.boxShadowExtraLight
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

const AppList = styled.div`
    display: flex;
    align-items: center;
`

const App = styled.div`
    margin: 0 2rem;
    border-radius: 1.5rem;
    overflow: hidden;

    svg {
        margin-right: 1rem;
        fill: ${props => props.theme.textLight};
    }

    
    a {
        display: flex;
        align-items: center;
        padding: 1.3rem 1.8rem;
        text-decoration: none !important;
        color: ${props => props.theme.textLight} !important;

        :hover {
            // background: ${props => props.theme.background};
            // color: ${props => props.theme.primary} !important;
            // svg {
            //     fill: ${props => props.theme.primary} !important;
            // }
        }
        
        &.active {
            color: ${props => props.theme.primary} !important;
            // background: ${props => props.theme.primaryLight};
            svg {
                fill: ${props => props.theme.primary} !important;
            }
        }
    }
`

const AppLabel = styled.div`
    font-size: 1.6rem;
    font-weight: 500;
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


    const links = [
        {label: text.home, icon: "home", path: text.link_app_home},
        {label: text.to_do, icon: "todo", path: text.link_todo + "/AF620495C2F748BCB7193E4337EEHG7P"},
        {label: text.calendar, icon: "calendar", path: text.link_calendar},
        {label: text.transactions, icon: "transactions", path: text.link_transactions },
        {label: text.notes, icon: "notes", path: text.link_notes}
    ]

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
                        {/* <LogoContainer>
                            <Logo src={logo}/>
                        </LogoContainer> */}
                        {/* <Link to={`/${text.link_app_home}`}>
                            {text.home}
                        </Link> */}
                    </ToggleMenu>
                    <Section>
                        <AppList>
                            {links.map((link, index) => (
                                    <App key={index} >
                                        <NavLink to={`/${link.path}`}>
                                            <AppIcon id={link.icon} className="icon"/>
                                            <AppLabel>{link.label}</AppLabel>
                                        </NavLink>
                                    </App>
                            ))}
                        </AppList>
                        

                        {/* <Searchbar /> */}
                    </Section>
                    <Section>
                        {/* <Messages />
                        <IconContainer className="icon__container">
                            <FontAwesomeIcon icon={faBell}/>
                        </IconContainer> */}
                        <IconContainer>
                            <AppIcon id="bell" />
                        </IconContainer>
                        <UserProfile 
                            useTransparentHeader={useTransparentHeader}
                            useSecondary={useSecondary}
                        />
                        {/* <AppSelector useSecondary={useSecondary}/>   */}
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
