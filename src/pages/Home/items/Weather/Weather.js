import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Main from './components/Main'
import MainSummary from './components/MainSummary'
import Searchbar from './components/Searchbar'
import NextHours from './NextHours'
import { useSelector } from 'react-redux'

const Container = styled.div`
    background: ${({theme}) => theme.surface};
    box-shadow: ${({theme}) => theme.boxShadowLight};
    width: calc(100vw - 3rem);
    height: 80vh;
    position: fixed;
    top: 14rem;
    left: 1.5rem;
    transition: all .3s ease-in;
    border-radius: 2rem;
    z-index: 9;
    display: grid;
    grid-template-columns: ${({ originPos }) =>  `${originPos.width}px 1fr`};
    grid-template-rows: ${({ originPos }) =>  `${originPos.height}px 1fr`};
    overflow: hidden;

    .main-container {
        width: ${({originPos}) => `${originPos.width}px`};
        height: 100%;
    }

    .main {
        width: ${({originPos}) => `${originPos.width}px`};
        height: ${({originPos}) => `${originPos.height}px`};
    }


    ${props => {
        const { isViewingWeather, originPos, theme } = props
        if(!isViewingWeather){
            return {
                borderRadius: "1rem",
                boxShadow: "none",
                top: `${originPos.top}px`,
                left: `${originPos.left}px`,
                width: `${originPos.width}px`,
                height: `${originPos.height}px`,
                zIndex: -1,
                ".main-container": {
                    height: `${originPos.height}px`,
                    background: theme.surface
                }
            }
        }
    }}
`

const MainContainer = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    border-radius: 2rem;
    background: ${({theme}) => theme.primary};
    transition: all .3s ease-in;
    box-shadow: ${({theme}) => theme.boxShadow};
    padding: 1rem 0;

    * {
        color: ${({theme}) => theme.white};
    }
`

const Body = styled.div`
    width: 100%;
    height: 100%;
    grid-row: 1 / -1;
    grid-column: 2 / 3;
    padding: 2rem 3rem;
`

const CloseButton = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
`

const View = props => {

    const { isViewingWeather,  setIsViewingWeather, weatherRef, isManagingDashboard } = props

    const {
        home: { weather }
    } = useSelector(state => state)

    const [ pos, setPos ] = useState(null)

    useEffect(() => {
        if(weatherRef.current){
            const originPos = weatherRef.current.getBoundingClientRect()
            setPos(originPos)
        }

    },[weatherRef, isViewingWeather])

    if(!pos || !weather || isManagingDashboard){
        return null
    }

    return (
        <Container
            originPos={pos}
            isViewingWeather={isViewingWeather}
        >
            <MainContainer className="main-container"> 
                <Main 
                    isViewingWeather={isViewingWeather}
                    setIsViewingWeather={setIsViewingWeather}
                />
                <MainSummary />
            </MainContainer>
            <Body>
                <Searchbar />
                {/* <NextHours /> */}
            </Body>

            <CloseButton onClick={() => setIsViewingWeather(false)}>
                <FontAwesomeIcon icon="times-circle"/>
            </CloseButton>
        </Container>
     )
};

export default View;
