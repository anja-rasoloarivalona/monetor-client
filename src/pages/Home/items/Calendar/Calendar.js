import React, { useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import Header from "./Header"
import Sidebar from './Sidebar'
import View from './View'
import { ScrollBar } from '../../../../components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadowLight};
`

const Title = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    border-bottom: 1px solid ${props => props.theme.background};
    color: ${props => props.theme.textLight};
`

const Content = styled(ScrollBar)`
    max-height: calc(100% - 9rem);
    display: flex;
    padding-bottom: .2rem;

    ::-webkit-scrollbar {
        display: none;
    }

    :hover {
        ::-webkit-scrollbar {
            display: initial;
        }
    }
`

const Calendar = () => {

    const container = useRef()

    console.log({
        container
    })

    return (
        <Container ref={container}>
            <Header />
            <Title>
                Today
            </Title>
            <Content
                container={container}
            >
                <Sidebar />
                <View />
            </Content>

        </Container>
     )
};

export default Calendar;
