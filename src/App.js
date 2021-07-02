import React, { useEffect } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Header } from './elements'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter  } from 'react-router-dom'
import Routes from './pages'
import * as actions from './store/actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

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
`

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
      const currentPathname = window.location.pathname.split("/")[1] || "home"
      dispatch(actions.setText(currentPathname))
    },[])

    const { 
      theme,
      text
    } = useSelector(state => state)

    const isTextReady = text.header && text.text

    return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {isTextReady && (
              <Container>
                <Header />
                <Routes />
              </Container>
            )}
          </ThemeProvider>
      </BrowserRouter>
    )
};

export default App;
