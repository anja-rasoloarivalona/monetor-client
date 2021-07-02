import React, { useEffect } from "react"
import styled from "styled-components"
import { Route, Switch, Redirect, useLocation, withRouter } from 'react-router-dom'
import Home from "./Home/Home"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import Setup from "./Setup/Setup"
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { usePrevious } from '../hooks'
import links from '../text/links.json'

const Container = styled.div`
    min-height: 100vh;
    padding-top: 8rem;
`

const Routes = props => {

    const dispatch = useDispatch()
    const location = useLocation()

    const {
        text: { text, page },
        settings: { currency, locale },
        user: { id: userId}
    } = useSelector(state => state)

    const previousLocale = usePrevious(locale)

    useEffect(() => {
        const localeHasChanged = locale !== previousLocale
        if(localeHasChanged){
            if(page.id === "home"){
                dispatch(actions.setText("home"))
            } else {
                const translatedPath =  links[`link_${page.id}`][locale]
                props.history.push(`/${translatedPath}`)
            }
        }
    },[locale, previousLocale])

    useEffect(() => {
        const currentPathname = location.pathname.split("/")[1] || "home"
        const pathHasChanged = page.locale !== currentPathname
        if(pathHasChanged){
            dispatch(actions.setText(currentPathname))
        }
    },[location])
    

    useEffect(() => {
        const isNotCOnfigured = userId && !currency
        if(isNotCOnfigured && location.pathname !== `/${text.link_setup}`){
            props.history.push(`/${text.link_setup}`)
        }
    },[currency, userId, location.pathname, props.history, text])

    return (
        <Container>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path={`/${text.link_login}`} component={Login}/>
                <Route path={`/${text.link_forgot_password}`} component={Login}/>
                <Route path={`/${text.link_signup}`} component={Signup} />
                <Route path={`/${text.link_setup}`} component={Setup} />
                {/* <Redirect to="/"/>  */}
            </Switch>
        </Container>
     )
};

export default  withRouter(Routes);
