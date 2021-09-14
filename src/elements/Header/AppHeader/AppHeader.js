import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { NavLink } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import UserProfile from "./UserProfile"
import AppIcon from '../../../icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import Messages from './Messages'
import { IconContainer } from './style'
import { useScroll } from '../../../hooks'
import { useLocation } from 'react-router-dom'
import ProjectsSelector from "./ProjectsSelector"

const Container = styled.div`
    height: 6.5rem;
    width: 28rem;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: background .1s ease-in;
    padding-right: 2rem;

    ${props => {
        if((props.theme.backgroundImage && props.useTransparentHeader)){
            return {
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
    height: 100%;
`


const AppList = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 4rem;
`

const App = styled.div`
    margin-right: 4rem;
    height: 100%;
    position: relative;

    ul {
        display: none;
    }

    :hover {
        ul {
            display: block;
        }
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none !important;
        color: ${props => props.theme.dynamicTextLight} !important;
        font-weight: 500;
        height: 100%;
        padding: 1rem;
        position: relative;

        svg {
            fill: ${props => props.theme.dynamicTextLight} !important;
            margin-left: 1rem;
        }

        &:hover {
            color:  ${props => props.theme.dynamicText} !important;
        }
        &.active {
            color:  ${props => props.theme.dynamicText} !important;
            svg {
                fill: ${props => props.theme.dynamicText} !important;
            }
            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                background: ${({theme})=>theme.dynamicText}
            }
        }
    }

    ${({ theme, isActive}) => {
        if(isActive){
            return {
                "a, a.active": {
                    color:  `${theme.dynamicText} !important`,
                }
            }
        }
    }}
`

const AppLabel = styled.div`
    font-size: 1.5rem;
`

const Toggle = styled(IconContainer)`
    margin-right: 2rem;
    width: 4rem;
    height 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1.1rem;
`

const ToggleBar = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.text};
`

const AppHeader = props => {

    const { setShowSidebar } = props

    const location = useLocation()

    const { 
        text: { text, page },
        theme: { backgroundImage }
    } = useSelector(state => state)

    const initial = backgroundImage ? true : false
    const [ useTransparentHeader, setUseTransparentHeader ] = useState(initial)
    const [ isHovered, setIsHovered ] = useState(null)

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
    },[location])


    const links = [
        {label: text.dashboard, path: text.link_dashboard},
        {label: text.projects, path: text.link_projects, onHover: () => <ProjectsSelector /> },
        {label: text.calendar, path: text.link_calendar},
        {label: text.transactions, path: text.link_transactions },
        {label: text.notes, path: text.link_notes}
    ]

    return (
        <Container
            pageId={page ? page.id : null}
            useTransparentHeader={useTransparentHeader}
        >
            <IconContainer className="icon__container">
                <FontAwesomeIcon icon={faBell}/>
            </IconContainer>
            <UserProfile useTransparentHeader={useTransparentHeader}/>
                    {/* <Section>
                        <Toggle
                            onClick={() => setShowSidebar(true)}
                            className="icon__container"
                        >
                            <ToggleBar/>
                            <ToggleBar/>
                            <ToggleBar/>
                        </Toggle>
                        <AppList>
                            {links.map((link, index) => (
                                <App
                                    key={index}
                                    onMouseEnter={() => setIsHovered(index)}
                                    onMouseLeave={() => setIsHovered(null)}
                                    isActive={isHovered === index}
                                >
                                     <NavLink to={`/${link.path}`}>
                                        <AppLabel>{link.label}</AppLabel>
                                        {link.onHover && <FontAwesomeIcon icon="chevron-down"/>}
                                    </NavLink>
                                    {link.onHover && link.onHover()}
                                </App>
                            ))}
                        </AppList>
                    </Section>
                    <Section>
                        <Messages />
              
                    </Section> */}
        </Container>
     )
};

export default AppHeader;
