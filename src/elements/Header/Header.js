import React from "react"
import styled from "styled-components"
import HomeHeader from "./HomeHeader/HomeHeader";
import AppHeader from "./AppHeader/AppHeader"
import { useSelector } from 'react-redux'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: max-content;
    z-index: 9;
`

const Header = props => {

    const { setShowSidebar } = props

    const {
        text: { type },
        user
    } = useSelector(state => state)

    return (
        <Container>
            {type === 'app' || user.setupAt ?
                <AppHeader setShowSidebar={setShowSidebar}/> :
                <HomeHeader />
            }
        </Container>
     )
};

export default Header;
