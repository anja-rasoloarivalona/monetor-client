import React, { useEffect } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Header } from './elements'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter  } from 'react-router-dom'
import Routes from './pages'
import { Loader } from './components'
import * as actions from './store/actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
library.add(fas)
axios.defaults.baseURL  = process.env.REACT_APP_API_URL

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto;      
        &::-webkit-scrollbar {
            display: none !important;
        }
    }
`

const Container = styled.div`
  background: ${props => props.theme.appBackground};
  min-height: 100vh;

  ${props => {
    if(props.loading){
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }
  }}

  ${props => {
    if(props.type === "app"){
      return {
        background: props.theme.background
      }
    }
  }}
`

const App = () => {


    const dispatch = useDispatch()

    const { 
      theme,
      text,
      user
    } = useSelector(state => state)

    useEffect(() => {
      const currentPathname = window.location.pathname.split("/")[1] || "home"
      dispatch(actions.setText(currentPathname))
      dispatch(actions.initApp())
    },[])


    const isTextReady = text.header && text.text
    const isAppReady = isTextReady && user.checkedToken 

    return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Container
              loading={!isAppReady}
              type={text.type}
            >
            {isAppReady ?
              <>
                <Header />
                <Routes />
              </> :
              <Loader size={3}/>
            }
            </Container>
          </ThemeProvider>
      </BrowserRouter>
    )
};

export default App;
