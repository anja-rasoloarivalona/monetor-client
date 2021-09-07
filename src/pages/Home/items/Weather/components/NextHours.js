import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ScrollHorizontalBar  } from '../../../../../components'
import WeatherIcon from '../../../../../icons/WeatherIcon'
import { formatDate } from "../../../../../functions"
import { days } from '../../../../../assets/dateLocale'

const Container = styled.div`
    margin-top: 3rem;
    * {
        line-height: 1.4;
    }
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 3rem;
`

const Slider = styled(ScrollHorizontalBar)`
    width: 100%;
    height: max-content;
    padding-bottom: 1.5rem;
    overflow-x: scroll;
    display: flex;
`


const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2rem;
    min-width: 9rem;
`

const ItemDay = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 3px;
    text-transform: capitalize;
`

const ItemHour = styled.div`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textLight};
`

const ItemIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;

    img  {
        width: 3.5rem;
        height: 3.5rem;
    }
`


const ItemValue = styled.div`
    display: flex;
    font-size: 1.4rem;
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
            const currentDateTime = moment(new Date(moment(cityDateTime.fullDate).set("minute", 0).set("second", 0))).format("YYYY-MM-DD HH:mm")  
            const hourlyData = weather[currentCity].weather.hourly
            const currentIndex = hourlyData.findIndex(h => h.dateTime.string === currentDateTime )
            setData(hourlyData.slice(currentIndex))            
        }

    },[weather, currentCity, cityDateTime])


    if(!data){
        return null
    }


    return (
        <Container>
            <Title>Next 48 hours</Title>
            <Slider light>
                {data.map(hour => {
                    const date = hour.dateTime.date
                    const day = date.getDay() === 0 ? 6 : date.getDay() - 1
                    return (
                        <Item key={hour}>
                            <ItemDay>
                                {days[locale][day].short}.
                            </ItemDay>
                            <ItemHour>
                                {formatDate(date, "hh:min", locale )}
                            </ItemHour>
                            <ItemIconContainer>
                                <WeatherIcon data={hour.weather[0]} />
                            </ItemIconContainer>
                            <ItemValue>
                                <ItemValueText>
                                    {Math.round(hour.temp)}&#176;
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
