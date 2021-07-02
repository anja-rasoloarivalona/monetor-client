import React from "react"
import styled from "styled-components"
import HomeHeader from "./HomeHeader/HomeHeader";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: max-content;
    z-index: 9;
`

const Header = () => {
    return (
        <Container>
            <HomeHeader />
        </Container>
     )
};

export default Header;
