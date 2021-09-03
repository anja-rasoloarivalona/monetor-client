import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import Unit from './Unit'
import { useSelector } from 'react-redux'
import { icons as iconsCode } from '../icons'
import moment from 'moment'
import AppIcon from '../../../../../icons'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 2fr 1fr max-content;
    grid-template-rows: max-content 1fr max-content;
`

const Header = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
`
const Day = styled.div`
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: .5rem;
`

const Location = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    * {
        color: ${({theme}) => theme.dynamicTextLight} !important;
    }

    svg {
        font-size: 1rem;
        margin-right: .5rem;
        transform: translateY(-.1rem);
    }
`

const LocationLabel = styled.div`
    font-size: 1.4rem;
`

const Cta = styled.div`
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    svg {
        width: 2rem;
        height: 2rem;
        transform: translateX(1rem);
    }
`

const Summary = styled.div`
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: ${({theme}) => theme.dynamicTextLight} !important;

    svg {
        width: 8rem;
        height: 8rem;
        fill: ${({theme}) => theme.dynamicTextLight} !important;
    }
`

const Temp = styled.div`
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    font-size: 4rem;
    font-weight: 800;
    color: ${({theme}) => theme.dynamicText};
`

const Feels = styled.div`
    grid-column: 3 / 4;
    grid-row: 3 / 4;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: .5rem;
    
`

const FeelsLabel = styled.div`
    font-size: 1.2rem;
    color: ${({theme}) => theme.dynamicTextLight} !important;
`

const FeelsValue = styled.div`
    font-weight: bold;
    font-size: 1.6rem;
`


const Main = props => {

    const { isViewingWeather, setIsViewingWeather } = props

    const {
        home: { weather, currentCity }
    } = useSelector(state => state)

    const { location, forecast} = weather[currentCity].weather
    const currentDate = moment().format("YYYY-MM-DD")
    const currentTime = new Date().getHours()
    const currentData = forecast.forecastday.find(day => day.date === currentDate).hour[currentTime]

    
    return (
        <Container className="main">
            <Header>
                <Day>Tuesday</Day>
                <Location>
                    <FontAwesomeIcon icon="map-marker-alt"/>
                    <LocationLabel>{location.name}, {location.region}</LocationLabel>
                </Location>
            </Header>

            {!isViewingWeather && (
                <Cta onClick={() => setIsViewingWeather(true)}>
                    <AppIcon id="expand"/>
                </Cta>
            )}

            <Summary>
                <AppIcon id={iconsCode[currentData.condition.code]}/>
                {currentData.condition.text}
            </Summary>
            <Temp>
                <Unit>{currentData.temp_c}</Unit>
            </Temp>
            {!isViewingWeather && (
                <Feels>
                    <FeelsLabel>Feels like</FeelsLabel>
                    <FeelsValue>
                        <Unit>{currentData.feelslike_c}</Unit>
                    </FeelsValue>
                </Feels>
            )}
 
        </Container>
     )
};

export default Main;
