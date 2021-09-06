import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Main from './components/Main'
import MainSummary from './components/MainSummary'
import Searchbar from './components/Searchbar'
import NextHours from './components/NextHours'
import NextDays from "./components/NextDays"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions'

const Container = styled.div`
    background: ${({theme}) => theme.surface};
    box-shadow: ${({theme}) => theme.boxShadowLight};
    width: calc(100vw - 3rem);
    height: 80vh;
    position: fixed;
    top: 14rem;
    left: 1.5rem;
    right: 0;
    transition: all .3s ease-in;
    border-radius: 1rem;
    z-index: 9;
    display: grid;
    overflow: hidden;
    grid-template-columns: ${({ originPos }) =>  `${originPos.width}px calc(100% - ${originPos.width}px)`};
    grid-template-rows: ${({ originPos }) =>  `${originPos.height}px 1fr`};

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
    border-radius: 1rem;
    transition: all .3s ease-in;
    background: ${({theme}) => theme.surface};
    box-shadow: ${({theme}) => theme.boxShadow};
    padding: 1rem 0;
`

const Body = styled.div`
    width: 100%;
    height: 100%;
    grid-row: 1 / -1;
    grid-column: 2 / 3;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
`

const CloseButton = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
`

const View = props => {
    const dispatch = useDispatch()
    const { isViewingWeather,  setIsViewingWeather, weatherRef, isManagingDashboard } = props

    const {
        home: { weather, currentCity },
        user: { locations }
    } = useSelector(state => state)

    const [ pos, setPos ] = useState(null)
    const [ cityDateTime, setCityDateTime ] = useState(null)
    // const [ hasInitializedWeather, setHasInitializedWeather ] = useState(false)
 
    useEffect(() => {
        if(!locations || (locations && !locations.current)){
            dispatch(actions.getUserCurrentLocation())
            dispatch(actions.getUserLocations())
        }
    },[])

    useEffect(() => {
        if(locations && locations.current && !weather){
            dispatch(actions.initWeatherData())
        }
    },[locations])

    useEffect(() => {
        if(weatherRef.current){
            const originPos = weatherRef.current.getBoundingClientRect()
            setPos(originPos)
        }
    },[weatherRef, isViewingWeather])

    if(!pos || !weather || isManagingDashboard || !currentCity){
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
                    cityDateTime={cityDateTime}
                    setCityDateTime={setCityDateTime}
                />
                <MainSummary cityDateTime={cityDateTime} />
            </MainContainer>
            <Body>
                <Searchbar />
                <NextHours cityDateTime={cityDateTime}/>
                <NextDays />
            </Body>

            <CloseButton onClick={() => setIsViewingWeather(false)}>
                <FontAwesomeIcon icon="times-circle"/>
            </CloseButton>
        </Container>
     )
};

export default View;
