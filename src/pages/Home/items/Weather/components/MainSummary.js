import React, { useState, useEffect } from "react"
import styled from "styled-components"
import moment from 'moment'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../../../functions'

const Container = styled.div``

const List = styled.ul`
    padding: 1rem 2rem 2rem 2rem;
    list-style: none;
    > li:not(:last-child){
        margin-bottom: .7rem;
    }
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
    line-height: 1.4;
`

const ListItemLabel = styled.div`
    color: ${({theme}) => `${theme.textLight} !important`}
`

const ListItemValue = styled.div``

const MainSummary = props => {

    const { cityDateTime } = props

    const {
        settings: { locale },
        home: { weather, currentCity }
    } = useSelector(state => state)

    const [ currentData, setCurrentData ] = useState(null)
    const [ dayData, setDayData ] = useState(null)

    useEffect(() => {
        if(cityDateTime){
            const { fullDate } =  cityDateTime
            const currentDateTime = moment(new Date(moment(fullDate).set("minute", 0).set("second", 0))).format("YYYY-MM-DD HH:mm")  
            const hours = weather[currentCity].weather.hourly
            const currentData = hours.find(h => h.dateTime.string === currentDateTime)
            setCurrentData(currentData)
            setDayData( weather[currentCity].weather.daily[0])
        }
    },[cityDateTime])

    const getCurrentData = () => {
        const data = [
            { label: "Feels like", value: currentData.feels_like, type: "degree"},
            { label: "P.O.P", value: currentData.pop * 100, unit: "%"},
            { label: "Humidity", value: currentData.humidity, unit: "%"},
            { label: "Wind", value: currentData.wind_speed, unit: "km/h"},
            { label: "Gust wind", value: currentData.wind_gust, unit: "km/h"},
        ]
        return data
    }

    const getDayData = () => {
        const data = [
            { label: "Min temp", value: dayData.temp.min, type: "degree"},
            { label: "Max temp", value: dayData.temp.max, type: "degree"},
            { label: "Sunrise", value: `${formatDate(dayData.sunrise * 1000, "hh:min", locale)}`, type: "date"},
            { label: "Sunset", value: `${formatDate(dayData.sunset * 1000, "hh:min", locale)}`, type: "date"} ,
        ]
        return data
    }


    const renderListItem = (item, index) => {
        const renderListItemValue = () => {
            if(item.type === "degree"){
                return <>{Math.round(item.value)}&#176;</>
            }
            if(item.type === "date"){
                return item.value
            }
            return <>{Math.round(item.value)}{item.unit && item.unit}</>
        }
        return (
            <ListItem key={index}>
                <ListItemLabel>
                    {item.label}
                </ListItemLabel>
                <ListItemValue>
                    {renderListItemValue()}
                </ListItemValue>
            </ListItem>
        )
    }

    if(!currentData || !dayData){
        return null
    }


    return (
        <Container>
            <List>
                {getCurrentData().map((item, index) => renderListItem(item, index))}
            </List>
            <List>
                {getDayData().map((item, index) => renderListItem(item, index))}
            </List>
        </Container>
     )
};

export default MainSummary;
