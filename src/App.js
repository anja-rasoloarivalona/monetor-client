import React, { useState, useEffect, useLayoutEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Header, Sidebar, Forms, AddComponent, Draggable } from "./elements";
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
import io from 'socket.io-client'

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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  ${props => {
    if(props.theme.backgroundImage){
      return {
        backgroundImage: `url(${props.theme.backgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        filter: "brightness(60%)"
      }
    }
  }}
`

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
        // background: props.theme.background,
      };
    }
  }}

`;

const App = () => {
  
  const API_URL = process.env.REACT_APP_API_URL

  const dispatch = useDispatch();
  const {
      theme,
      text, 
      user,
      categories,
      settings: { socket: reduxSocket } 
  } = useSelector((state) => state);

  const [ showSidebar, setShowSidebar ] = useState(false)


  useEffect(() => {
    const currentPathname = window.location.pathname.split("/")[1] || "home";
    dispatch(actions.setText(currentPathname));
    dispatch(actions.initApp());
  }, []);


  useEffect(() => {
    if(user.id && !reduxSocket){
      const connectSocket = () => {
        const res = io(API_URL, {
            "transports": ["polling","websocket"],
            "transportOptions": {
              "polling": {
                  "extraHeaders": {
                      "Authorization": `Bearer ${user.token}`
                  }
              }
            }
        })
        return res
      }
      const socket = connectSocket()
      socket.on("connect", () => {
        const userContacts = []
        if(user.contacts){
            user.contacts.forEach(contact => {
              userContacts.push(contact.user.id)
            })
        }

        socket.emit('join', { userId: user.id, contacts: userContacts })

        socket.on("joined", data => {
            dispatch(actions.setSocket(socket))
            dispatch(actions.setOnlineContacts({
              action: "joined",
              data
            }))
        })


        socket.on("contact-left", data => {
          dispatch(actions.setOnlineContacts({
            action: "contact-left",
            data
          }))
        })

        socket.on("contact-joined", data => {
          dispatch(actions.setOnlineContacts({
            action: "contact-joined",
            data
          }))
        })

        socket.on("new-message", data => {
          dispatch(actions.addMessage(data))
        })

        socket.on('messages', messages => {
          if(messages){
            const id = messages[0].associationId
            dispatch(actions.setMessages({
              messages: messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt )),
              id
            }))
          }
        })
      });
    }
  },[user.id])

  const isTextReady = text.header && text.text && Object.keys(text.header).length > 2 && Object.keys(text.text).length > 2;
  const areDataloaded = isTextReady && user.checkedToken && categories;
  const isAppReady = user.id ? (reduxSocket && areDataloaded) : areDataloaded

  return (
    <BrowserRouter>
      <ThemeProvider theme={{
        ...theme,
        // backgroundImage: null
      }}>
        <GlobalStyle />
        <Background />
        <Container
          loading={!isAppReady}
          type={text.type}
        >
          {isAppReady ? (
            <>
              <Header 
                setShowSidebar={setShowSidebar}
              />
              <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <Draggable />
              <Forms />
              {/* <AddComponent /> */}
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
