import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ScrollHorizontalBar  } from '../../../../../components'
import WeatherIcon from '../../../../../icons/WeatherIcon'

const Container = styled.div`
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2rem;
`

const Slider = styled(ScrollHorizontalBar)`
    width: 100%;
    height: max-content;
    padding-bottom: 3rem;
    cursor: pointer;
    overflow-x: scroll;
    display: flex;

    ::-webkit-scrollbar {
        // display: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.background};
    }

    &:hover {
        &::-webkit-scrollbar {
            display: initial;
        }
    }
`


const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2rem;
`

const ItemHour = styled.div``

const ItemIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;

    svg {
        width: 3rem;
        height: 3rem;
    }
`


const ItemValue = styled.div`
    display: flex;
    font-size: 1.1rem;
`

const ItemValueText = styled.div``


const NextHours = props => {

    const { cityDateTime } = props

    const {
        settings: { locale },
        home: { weather, currentCity }
    } = useSelector(state => state)


    const [data, setData] = useState(null)

    useEffect(() => {
        if(weather && currentCity && cityDateTime){
            const forecast = weather[currentCity].weather.forecast
            formatForecast(forecast, cityDateTime)
        }

    },[weather, currentCity, cityDateTime])


    const formatTime = date => {
        if(locale === "en"){
            const [hour, period ] = moment(date).format('LT').split(" ")
            return `${hour.split(':')[0]} ${period}`
        }
        return `${ parseInt(date.split(" ")[1].split(":")[0])}h`
    }

    const formatForecast = async (forecast, cityDateTime) => {

        const nextHours = {}
        for(let i = 1; i < ( 72 - cityDateTime.time ); i++){
            const now = moment(cityDateTime.fullDate)
            const next = now.add(i, 'hours').startOf('hour').format('YYYY-MM-DD HH:mm')
            nextHours[next] = {}
        }
        const rawData = []
        forecast.forecastday.forEach(day => {
            day.hour.forEach(time => {
                rawData.push(time)
            })
        })

        await Promise.all(Object.keys(nextHours).map(async period => {
            const currentData = rawData.find(item => item.time === period)
            nextHours[period] = {
                ...currentData,
                metadata: {
                    // time: locale === "en" ? moment(period).format('LT') : period.split(" ")[1],
                    time: formatTime(period),
                }
            }
        }))
        setData(nextHours)
    }

    if(!data){
        return null
    }

    return (
        <Container>
            <Title>Hourly previsions</Title>
            <Slider>
                {Object.keys(data).map(hour => {
                    const currentData = data[hour]
                    return (
                        <Item key={hour}>
                            <ItemHour>
                                {currentData.metadata.time}
                            </ItemHour>
                            <ItemIconContainer>
                                <WeatherIcon data={currentData} />
                            </ItemIconContainer>
                            <ItemValue>
                                <ItemValueText>
                                    {currentData.temp_c}&#176;
                                </ItemValueText>
                            </ItemValue>
                        </Item>
                    )
                })}
            </Slider>
        </Container>
     )
};

export default NextHours;
