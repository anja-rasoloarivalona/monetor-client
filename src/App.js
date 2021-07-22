import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Header, Sidebar, Forms, AddComponent } from "./elements";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./pages";
import { Loader } from "./components";
import * as actions from "./store/actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import en from "date-fns/locale/en-US";
import fr from "date-fns/locale/fr-CA";
import { registerLocale } from "react-datepicker";
import axios from "axios";
library.add(fas);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
registerLocale("en", en);
registerLocale("fr", fr);

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto;      
        &::-webkit-scrollbar {
            display: none !important;
        }
    }
`;

const Container = styled.div`
  background: ${(props) => props.theme.homeBackground};
  min-height: 100vh;
  color: ${props => props.theme.text};

  ${(props) => {
    if (props.loading) {
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    }
  }}

  ${(props) => {
    if (props.type === "app") {
      return {
        background: props.theme.background,
      };
    }
  }}
`;

const App = () => {
  
  const dispatch = useDispatch();
  const { theme, text, user, categories } = useSelector((state) => state);

  const [ showSidebar, setShowSidebar ] = useState(false)

  useEffect(() => {
    const currentPathname = window.location.pathname.split("/")[1] || "home";
    dispatch(actions.setText(currentPathname));
    dispatch(actions.initApp());
  }, []);

  const isTextReady = text.header && text.text;
  const isAppReady = isTextReady && user.checkedToken && categories;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container loading={!isAppReady} type={text.type}>
          {isAppReady ? (
            <>
              <Header 
                setShowSidebar={setShowSidebar}
              />
              <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <Forms />
              <AddComponent />
              <Routes />
            </>
          ) : (
            <Loader size={3} />
          )}
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
