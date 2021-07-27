import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import Account from './Account'
import General from './General'
import Display from './Display'
import Security from "./Security"

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
    min-height: calc(100vh - 6.5rem);
    padding: 3rem 8rem;
    display: flex;
    flex-direction: column;
`

const Settings = () => {

    const { 
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Sidebar />
            <PageContainer>
                <Account />
                <General />
                <Display />
                <Security />
{/* 
                <Switch>
                    <Route exact path={`/${text.link_settings}`} component={General} />
                    <Route path={`/${text.link_settings}/${text.link_settings_general}`} component={General} />
                    <Route path={`/${text.link_settings}/${text.link_settings_display}`} component={Display} />
                    <Route path={`/${text.link_settings}/${text.link_settings_security}`} component={Security} />
                </Switch> */}
       
            </PageContainer>       
        </Container>
     )
};

export default Settings;
