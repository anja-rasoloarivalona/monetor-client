import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 6.5rem);
    background: red;
`

const Header = styled.div`
    width: 100%;
`

const HeaderTitle = styled.div`

`


const TodoHome = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Header>
                <HeaderTitle>

                </HeaderTitle>
            </Header>
        </Container>
     )
};

export default TodoHome;
