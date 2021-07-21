/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import styled from "styled-components"
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import Home from "./Home/Home"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import Setup from "./Setup/Setup"
import Dashboard from './FinanceDashboard/FinanceDashboard'
import Todo from './Todo/Todo'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import links from '../text/links.json'
import Sidebar from "../elements/Sidebar/Sidebar"
import AddComponent from "../elements/AddComponent/AddComponent"
import Forms from '../elements/Forms/Forms'

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
            const userHasWallet = user.wallets && user.wallets.length > 0 && user.wallets[0].id
            if(!userHasWallet && location.pathname !== `/${text.link_setup}`){
                props.history.push(`/${text.link_setup}`)
            }
            if(userHasWallet && currency){
                const forbiddenPages = [text.link_login, text.link_signup, text.link_setup]
                const currentPathname = location.pathname.split("/")[1]
                if(forbiddenPages.includes(currentPathname)){
                    props.history.push(`/${text.link_dashboard}`)
                }

            }
        }
    },[currency, user, location])

    const isSidebarDisplayed = () => {
        const routesWithSidebar = [`${text.link_dashboard}`, `${text.link_todo}`, `finance`]
        const currentPathName = location.pathname.split("/")[1]
        return routesWithSidebar.includes(currentPathName)
    }



    return (
        <Container isSidebarDisplayed={isSidebarDisplayed()}>
            {isSidebarDisplayed() && (
                <>
                    <Sidebar />
                    <AddComponent />
                </>
            )}
            <Forms />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path={`/${text.link_login}`} component={Login}/>
                <Route path={`/${text.link_forgot_password}`} component={Login}/>
                <Route path={`/${text.link_signup}`} component={Signup} />
                <Route path={`/${text.link_setup}`} component={Setup} />
                <Route path={`/${text.link_finance}/${text.link_dashboard}`} component={Dashboard} />
                <Route path={`/${text.link_todo}`} component={Todo} />
                {/* <Redirect to="/"/>  */}
            </Switch>
        </Container>
     )
};

export default  withRouter(Routes);
