import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Unit from './Unit'
import { useSelector } from 'react-redux'
import moment from 'moment'
import AppIcon from '../../../../../icons'
import WeatherIcon from '../../../../../icons/WeatherIcon'
import { days } from '../../../../../assets/dateLocale'
import { formatDate, capitalizeFirstLetter } from '../../../../../functions'
import { HeaderCta, HeaderCtaItem } from '../../style'


const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 1fr max-content;
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
    text-transform: capitalize;
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
    grid-column: 2 / 3;
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
    grid-column: 2 / 3;
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
const Time = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    font-size: 1.4rem;
`

const Main = props => {

    const { isViewingWeather, setIsViewingWeather, cityDateTime, setCityDateTime } = props

    const {
        settings: { locale },
        home: { weather, currentCity },
        user: { locations: { current: currentLocation } }
    } = useSelector(state => state)

    const [ data, setData ] = useState(null)

    useEffect(() => {
        if(currentLocation && currentCity){
        // Used only if the user selected his current city location
            if(currentLocation.city.toLowerCase() === currentCity){
                const currentDate = moment().format("YYYY-MM-DD")
                const currentTime = new Date().getHours()
                setCityDateTime({
                    date: currentDate,
                    time: currentTime,
                    fullDate: new Date()
                })
            } else {
                const currentCityData = weather[currentCity]
                const { diffHour, offSetHour } = currentCityData.dateTime.metadata
                const dateTime =  new Date(new Date().setHours(new Date().getHours() + (diffHour + offSetHour)))
                const currentTime = dateTime.getHours()
                const currentDate = moment(dateTime).format("YYYY-MM-DD")
                setCityDateTime({
                    ...currentCityData.dateTime,
                    time: currentTime,
                    date: currentDate,
                    fullDate: dateTime
                })
            }
        }
    },[currentLocation, currentCity])

    useEffect(() => {
        if(cityDateTime){
            const { fullDate } =  cityDateTime
            const currentDateTime = moment(new Date(moment(fullDate).set("minute", 0).set("second", 0))).format("YYYY-MM-DD HH:mm")  
            const hours = weather[currentCity].weather.hourly
            const currentData = hours.find(h => h.dateTime.string === currentDateTime)
            setData(currentData)
        }
    },[cityDateTime])


    if(!data){
        return null
    }

    const day = cityDateTime.fullDate.getDay() > 0 ? cityDateTime.fullDate.getDay() - 1 : 6

    const renderLocation = () => {
        const location = weather[currentCity].location
        if(location.city !== location.region){
            return `${location.city}, ${location.region}`
        }
        return `${location.city}, ${location.country}`
    }


    return (
        <Container className="main">
            <Header>
                <Day>{days[locale][day].long}</Day>
                <Location>
                    <FontAwesomeIcon icon="map-marker-alt"/>
                    <LocationLabel>{renderLocation()}</LocationLabel>
                </Location>
            </Header>
            {isViewingWeather ?
                <Time>{formatDate(cityDateTime.fullDate, "hh:min", locale)}</Time> :
                <HeaderCta>
                    <HeaderCtaItem onClick={() => setIsViewingWeather(true)}>
                        <AppIcon id="expand" />
                    </HeaderCtaItem>
                </HeaderCta>
            }
            <Summary>
                <WeatherIcon data={data.weather[0]}/>
                {capitalizeFirstLetter(data.weather[0].description)}
            </Summary>
            <Temp>
                <Unit>{Math.round(data.temp)}</Unit>
            </Temp>
            {!isViewingWeather && (
                <Feels>
                    <FeelsLabel>Feels like</FeelsLabel>
                    <FeelsValue>
                        <Unit>{Math.round(data.feels_like)}</Unit>
                    </FeelsValue>
                </Feels>
            )}
 
        </Container>
     )
};

export default Main;
