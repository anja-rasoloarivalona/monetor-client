import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useWindowSize } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard/Dashboard'
import List from './List/List'
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
                <Route exact path={`/${text.link_transactions}`} component={Dashboard} />
                <Route path={`/${text.link_transactions}/${text.link_dashboard}`} component={Dashboard} />
                <Route path={`/${text.link_transactions}/${text.link_list}`} component={List} />
            </PageContainer>
        </Container>
     )
};

export default Transactions;
