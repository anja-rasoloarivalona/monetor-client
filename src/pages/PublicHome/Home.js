import React from "react"
import styled from "styled-components"
import Hero from './Hero'
import Dashboard from './Dashboard'
import Overview from './Overview'

const Container = styled.div`
    background: ${props => props.theme.type === "dark" ? props.theme.background : props.theme.surface};
`

const Home = () => {
    return (
        <Container>
            <Hero />
            <Dashboard />
            <Overview  />
        </Container>
     )
};

export default Home;
