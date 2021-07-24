import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useWindowSize } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard/Dashboard'
import { Route } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 6.5rem);
    padding-left: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.theme.background};
    position: relative;
    z-index: 2;
    overflow-x: hidden;
`

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    background: red;
`

const Transactions = () => {

    const dispatch = useDispatch()
    const { windowWidth } = useWindowSize()

    const { 
        text: { text }
    } = useSelector(state => state)


    return (
        <Container>
            <Sidebar />
            <PageContainer>
                <Route path="/" component={Dashboard} />
                <Route path={`/${text.link_dashboard}`} component={Dashboard} />
            </PageContainer>
        </Container>
     )
};

export default Transactions;
