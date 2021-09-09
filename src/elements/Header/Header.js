import React from "react"
import styled from "styled-components"
import HomeHeader from "./HomeHeader/HomeHeader";
import AppHeader from "./AppHeader/AppHeader"
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: max-content;
    z-index: 10;
`

const Header = props => {

    const location = useLocation()

    const { setShowSidebar } = props

    const {
        text: { type },
    } = useSelector(state => state)

    const useHomeHeader = type === "public" ||  location.pathname === "/"

    return (
        <Container>
            {useHomeHeader ?
                <HomeHeader /> :
                <AppHeader setShowSidebar={setShowSidebar}/> 
            }   
        </Container>
     )
};

export default Header;
