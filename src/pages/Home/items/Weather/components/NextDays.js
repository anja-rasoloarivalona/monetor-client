import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import moment from 'moment'
import WeatherIcon from '../../../../../icons/WeatherIcon'
import { days } from '../../../../../assets/dateLocale'

const Container = styled.div`
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
    * {
        line-height: 1.4;
    }
`

const List = styled.ul`
    list-style: none;
    display: flex;
`

const Item = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5rem;
    background: ${({ theme }) => theme.background};
    width: 28rem;
    padding: 1rem;
    border-radius: 1rem;
`

const ItemHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const ItemHeaderDetail = styled.div`
    display: flex;
    flex-direction: column;
`

const ItemDay = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`

const ItemCondition = styled.div`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textLight};
`

const ItemIcon = styled.div`
    svg {
        width: 4rem;
        height: 4rem;
    }
`

const ItemBody = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 3rem;
`

const ItemBodyDetails = styled.ul`
    flex: 1;
    list-style: none;
`

const ItemBodyDetailsItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.3rem;

    span:first-child {
    }

    span:last-child {
        color: ${({ theme }) => theme.textLight};

    }
`


const ItemTemp = styled.div`
    
    display: flex;
    background: red;
    align-items: flex-end;
    font-size: 2.4rem;
`


const NextDays = () => {
    const {
        text: { text },
        settings: { locale },
        home: { weather, currentCity }
    } = useSelector(state => state)

    const data = weather[currentCity].weather.forecast.forecastday
    const today = new Date().getDay() - 1

    return (
        <Container>
            <List>
                {data.map((item, index) => {
                    const day = new Date(item.date).getDay()
                    return (
                        <Item key={index}>
                            <ItemHeader>
                                <ItemHeaderDetail>
                                    <ItemDay>{day === today ? text.today : days[locale][day].long}</ItemDay>
                                    <ItemCondition>{item.day.condition.text}</ItemCondition>
                                </ItemHeaderDetail>
                            </ItemHeader>
                            <ItemIcon>
                                <WeatherIcon data={item.day}/>
                            </ItemIcon>
                            <ItemTemp>
                                {item.day.avgtemp_c}&#176;
                            </ItemTemp>
                            <ItemBody>
                                <ItemBodyDetails>
                                    <ItemBodyDetailsItem>
                                        <span>P.O.P:</span>
                                        <span>{item.day.daily_chance_of_rain}%</span>
                                    </ItemBodyDetailsItem>
                                    <ItemBodyDetailsItem>
                                        <span>Wind:</span>
                                        <span>{item.day.maxwind_kph}km/h</span>
                                    </ItemBodyDetailsItem>
                                    <ItemBodyDetailsItem>
                                        <span>Humidity:</span>
                                        <span>{item.day.avghumidity}%</span>
                                    </ItemBodyDetailsItem>
                                </ItemBodyDetails>
                            </ItemBody>
                        </Item>    
                    )
                })}
            </List>
        </Container>
     )
};

export default NextDays;
