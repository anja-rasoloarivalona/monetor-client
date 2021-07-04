/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import styled from "styled-components"
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import Home from "./Home/Home"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import Setup from "./Setup/Setup"
import Dashboard from './Dashboard/Dashboard'
import ToDo from './ToDo/ToDo'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import links from '../text/links.json'
import Sidebar from "../elements/Sidebar/Sidebar"

const Container = styled.div`
    min-height: 100vh;
    padding-top: 8rem;

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
        text: { text, page },
        settings: { currency, locale },
        user
    } = useSelector(state => state)


    // useEffect(() => {
    //     console.log({
    //         currency,
    //         user
    //     })
    //     if(currency && user.wallets){
    //         props.history.push(text.link_dashboard)
    //     }
    // },[])

    useEffect(() => {
        if(page){
            if(page.id === "home"){
                dispatch(actions.setText("home"))
            } else {
                const translatedPath =  links[`link_${page.id}`][locale]
                props.history.push(`/${translatedPath}`)
            }
        }
    },[locale])

    useEffect(() => {
        const currentPathname = location.pathname.split("/")[1] || "home"
        const pathHasChanged = page && page.locale !== currentPathname
        if(pathHasChanged){
            dispatch(actions.setText(currentPathname))
        }
    },[location])
    

    useEffect(() => {
        if(user){
            const isNotCOnfigured = user.id &&  (!user.wallets || !user.wallets[0].id)
            if(isNotCOnfigured && location.pathname !== `/${text.link_setup}`){
                props.history.push(`/${text.link_setup}`)
            }
        }
    },[currency, user])

    const isSidebarDisplayed = () => {
        const routesWithSidebar = [`${text.link_dashboard}`, `${text["link_to-do"]}`]
        const currentPathName = location.pathname.split("/")[1]
        return routesWithSidebar.includes(currentPathName)
    }


    return (
        <Container isSidebarDisplayed={isSidebarDisplayed()}>
            {isSidebarDisplayed() && (
                <Sidebar />
            )}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path={`/${text.link_login}`} component={Login}/>
                <Route path={`/${text.link_forgot_password}`} component={Login}/>
                <Route path={`/${text.link_signup}`} component={Signup} />
                <Route path={`/${text.link_setup}`} component={Setup} />
                <Route path={`/${text.link_dashboard}`} component={Dashboard} />
                <Route path={`/${text["link_to-do"]}`} component={ToDo} />
                {/* <Redirect to="/"/>  */}
            </Switch>
        </Container>
     )
};

export default  withRouter(Routes);
