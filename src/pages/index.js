/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import styled from "styled-components"
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import PublicHome from "./PublicHome/Home"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import Setup from "./Setup/Setup"
import Transactions from './Transactions/Transactions'
import Todo from './Todo/Todo'
import Home from './Home/Home'
import Messages from './Messages/Messages'
import Calendar from './Calendar/Calendar'
import Settings from './Settings/Settings'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import links from '../text/links.json'

const Container = styled.div`
    min-height: 100vh;
    padding-top: 6.5rem;

    ${props => {
        if(props.isSidebarDisplayed){
            return {
                paddingLeft: "23rem"
            }
        }
    }}
`

const Routes = props => {

    const dispatch = useDispatch()
    const location = useLocation()

    const {
        text: { text, page, type: pageType },
        settings: { currency, locale },
        user
    } = useSelector(state => state)


    useEffect(() => {
        if(pageType === "app" && !user.id){
           props.history.push(`/${text.link_login}`)
        }
    },[text, user, location])

    useEffect(() => {
        if(page){
            if(page.id === "home"){
                dispatch(actions.setText("home"))
            } else {
                const translatedPath =  links[`link_${page.id}`][locale]
                if(page.locale !== translatedPath){
                    props.history.push(`/${translatedPath}`)
                }
            }
        }
        dispatch(actions.setFinancialFilters())
    },[locale])

    useEffect(() => {
        const currentPathname = location.pathname.split("/")[1] || "home"
        const pathHasChanged = page && page.locale !== currentPathname
        if(pathHasChanged){
            dispatch(actions.setText(currentPathname))
        }
    },[location])
    

    useEffect(() => {
        if(user && user.token){
            if(!user.setupAt){
                if(location.pathname !== `/${text.link_setup}`){
                    props.history.push(`/${text.link_setup}`)
                }
            } else {
                const forbiddenPages = [text.link_login, text.link_signup, text.link_setup]
                const currentPathname = location.pathname.split("/")[1]
                if(forbiddenPages.includes(currentPathname)){
                    props.history.push(`/${text.link_home}`)
                }
            }
        }
    },[currency, user, location])

    return (
        <Container>
            <Switch>
                <Route exact path="/" component={PublicHome} />
                <Route path={`/${text.link_login}`} component={Login}/>
                <Route path={`/${text.link_forgot_password}`} component={Login}/>
                <Route path={`/${text.link_signup}`} component={Signup} />
                <Route path={`/${text.link_setup}`} component={Setup} />
                <Route path={`/${text.link_transactions}`} component={Transactions} />
                <Route path={`/${text.link_todo}`} component={Todo} />
                <Route path={`/${text.link_app_home}`} component={Home} />
                <Route path={`/${text.link_messages}`} component={Messages} />
                <Route path={`/${text.link_calendar}`} component={Calendar} />
                <Route path={`/${text.link_settings}`} component={Settings} />
                {/* <Redirect to="/"/>  */}
            </Switch>
        </Container>
     )
};

export default  withRouter(Routes);
