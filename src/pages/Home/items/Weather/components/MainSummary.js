import React from "react"
import styled from "styled-components"
import moment from 'moment'
import { useSelector } from 'react-redux'

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

const MainSummary = () => {

    const {
        home: { weather, currentCity }
    } = useSelector(state => state)
    
    const { forecast} = weather[currentCity].weather

    const getCurrentData = () => {
        const currentDate = moment().format("YYYY-MM-DD")
        const currentTime = new Date().getHours()
        const currentData = forecast.forecastday.find(day => day.date === currentDate).hour[currentTime]
        const data = [
            { label: "Feels like", value: `${currentData.feelslike_c}`, degree: true},
            { label: "P.O.P", value: `${currentData.chance_of_rain}%`},
            { label: "Humidity", value: `${currentData.humidity}%`},
            { label: "Wind", value: `${currentData.wind_kph}km/h`},
            { label: "Gust wind", value: `${currentData.gust_kph}km/h`},
        ]
        return data
    }

    const getDayData = () => {
        const currentData = forecast.forecastday[0]
        const data = [
            { label: "Min temp", value: `${currentData.day.mintemp_c}`, degree: true},
            { label: "Max temp", value: `${currentData.day.maxtemp_c}`, degree: true},
            { label: "Sunrise", value: `${currentData.astro.sunrise}`},
            { label: "Sunset", value: `${currentData.astro.sunset}`},
        ]
        return data
    }


    const renderListItem = (item, index) => {
        return (
            <ListItem key={index}>
                <ListItemLabel>
                    {item.label}
                </ListItemLabel>
                <ListItemValue>
                    {item.degree ? <>{item.value}&#176;</> : item.value }
                </ListItemValue>
            </ListItem>
        )
    }


    console.log({
        forecast
    })



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
