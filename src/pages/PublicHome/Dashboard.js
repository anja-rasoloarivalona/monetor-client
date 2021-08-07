import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Content = styled.div`
    width: 95%;
    max-width: 110rem;
    min-height: 30vh;
    background: red;
`


const Dashboard = () => {
    return (
        <Container>
            <Content>
            Dashboard

            </Content>
        </Container>
     )
};

export default Dashboard;
