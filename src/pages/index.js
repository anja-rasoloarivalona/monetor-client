/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import styled from "styled-components"
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import PublicHome from "./PublicHome/Home"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import Setup from "./Setup/Setup"
import Transactions from './Transactions/Transactions'
import Todo from './Todo/ToDo'
import TodoHome from './Todo/TodoHome'
import Home from './Home/Home'
import Messages from './Messages/Messages'
import Calendar from './Calendar/Calendar'
import Settings from './Settings/Settings'
import Notes from './Notes/Notes'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import links from '../text/links.json'
import NotesElement from '../elements/Notes/Notes'

const Container = styled.div`
    min-height: 100vh;
`

const Routes = props => {

    const dispatch = useDispatch()
    const location = useLocation()

    const {
        text: { text, page, type: pageType },
        settings: { currency, locale, defaultBackground },
        user,
        notes,
    } = useSelector(state => state)


    useEffect(() => {
        if(pageType === "app" && !user.id && location.pathname !== "/"){
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
        if(currentPathname === text.link_app_home){
            dispatch(actions.setBackgroundImage(defaultBackground))
        }
    },[location])
    

    useEffect(() => {
        if(user && user.token){
            const forbiddenPages = [text.link_login, text.link_signup, text.link_setup]
            const currentPathname = location.pathname.split("/")[1]
            if(forbiddenPages.includes(currentPathname)){
                props.history.push(`/${text.link_dashboard}`)
            }
        }
    },[currency, user, location])

    return (
        <Container location={location}>
            {notes.open && <NotesElement />}
            <Switch>
                <Route exact path="/" component={PublicHome} />
                <Route path={`/${text.link_login}`} component={Login}/>
                <Route path={`/${text.link_forgot_password}`} component={Login}/>
                <Route path={`/${text.link_signup}`} component={Signup} />
                <Route path={`/${text.link_setup}`} component={Setup} />
                <Route path={`/${text.link_transactions}`} component={Transactions} />
                <Route exact path={`/${text.link_projects}`} component={TodoHome} />
                <Route path={`/${text.link_projects}/:projectName`} component={Todo} />
                <Route path={`/${text.link_dashboard}`} component={Home} />
                <Route path={`/${text.link_messages}`} component={Messages} />
                <Route path={`/${text.link_calendar}`} component={Calendar} />
                <Route path={`/${text.link_notes}/:folder?/:noteId?`} component={Notes} />
                <Route path={`/${text.link_settings}`} component={Settings} />
                {/* <Redirect to="/"/>  */}
            </Switch>
        </Container>
     )
};

export default  withRouter(Routes);
