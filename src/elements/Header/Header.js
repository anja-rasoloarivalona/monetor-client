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
    
    if(type === "public" || location.pathname === "/"){
        return (
            <Container>
                <HomeHeader />
            </Container>
        )
    }
    return <AppHeader setShowSidebar={setShowSidebar} />
};

export default Header;
