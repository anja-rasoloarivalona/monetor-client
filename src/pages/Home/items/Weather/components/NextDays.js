import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import WeatherIcon from '../../../../../icons/WeatherIcon'
import { days } from '../../../../../assets/dateLocale'
import { capitalizeFirstLetter, formatDate } from '../../../../../functions'
import { ScrollHorizontalBar  } from '../../../../../components'

const Container = styled.div`
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
    * {
        line-height: 1.4;
    }
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2rem;
`

const ListContainer = styled(ScrollHorizontalBar)`
    width: 100%;
    overflow-x: scroll;
    padding: .5rem;
    padding-bottom: 1.5rem;    
`

const List = styled.ul`
    list-style: none;
    display: flex;
    width: max-content;
    
    .item:not(:last-child){
        margin-right: 3rem;
    }
    .item:last-child {
        margin-right: .5rem;
    }
`

const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.background};
    min-width: 25rem;
    padding:  1rem 2rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.boxShadowLight};
`

const ItemHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const ItemHeaderDetail = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`

const ItemDay = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
`

const ItemOverview = styled.div`
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ItemOverviewIcon = styled.div`
    img {
        width: 5rem;
        height: 5rem;
    }
`
const ItemOverviewCondition = styled.div`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.textLight};
`

const ItemBody = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
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
    margin-bottom: .3rem;

    span:first-child {
        color: ${({ theme }) => theme.textLight};
    }

    span:last-child {
    }
`


const ItemTemp = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 2.2rem;
    font-weight: 600;
    width: 100%;
    margin-bottom: 1rem;
`

const ItemDate = styled.div`
    font-size: 1.2rem;
    padding-bottom: .2rem;
`


const NextDays = () => {
    const {
        settings: { locale },
        home: { weather, currentCity }
    } = useSelector(state => state)

    const data = weather[currentCity].weather.daily

    return (
        <Container>
            <Title>Next 7 days</Title>
            <ListContainer light>
                <List>
                    {data.map((item, index) => {
                        const date = new Date(item.dt * 1000)
                        const day = date.getDay() === 0 ? 6 : date.getDay() - 1
                        const listItems = [
                            { label: "Range", value: `${Math.round(item.temp.min)}-${Math.round(item.temp.max)}`, type: "range"},
                            { label: "P.O.P", value: item.pop * 100, unit: "%"},
                            { label: "Humidity", value: item.humidity, unit: "%"},
                            { label: "Wind", value: item.wind_speed, unit: "km/h"}
                        ]
                        const renderListItemValue = ({ value, type, unit }) => {
                            if(type === "range"){
                                return <>{value}&#176;</>
                            }
                            if(type === "degree"){
                                return <>{Math.round(value)}&#176;</>
                            }
                            if(type === "date"){
                                return value
                            }
                            return <>{Math.round(value)}{unit && unit}</>
                        }
                        return (
                            <Item key={index} className="item">
                                <ItemHeader>
                                    <ItemHeaderDetail>
                                        <ItemDay>{days[locale][day].long}</ItemDay>
                                        <ItemDate>{formatDate(new Date(item.dt * 1000), locale === "fr" ? "dd mm" : "mm dd" ,locale, "short")}</ItemDate>
                                    </ItemHeaderDetail>
                                </ItemHeader>
                                <ItemOverview>
                                    <ItemOverviewIcon>
                                        <WeatherIcon data={item.weather[0]}/>
                                    </ItemOverviewIcon>
                                    <ItemOverviewCondition>
                                        {capitalizeFirstLetter(item.weather[0].description)}
                                    </ItemOverviewCondition>
                                </ItemOverview>
                                <ItemTemp>
                                    {Math.round(item.temp.day)}&#176;
                                </ItemTemp>
                                <ItemBody>
                                    <ItemBodyDetails>
                                        {listItems.map((listItem, listItemIndex) => (
                                            <ItemBodyDetailsItem key={listItemIndex}>
                                                <span>{listItem.label}:</span>
                                                <span>{renderListItemValue(listItem)}</span>
                                            </ItemBodyDetailsItem>
                                        ))}
                                    </ItemBodyDetails>
                                </ItemBody>
                            </Item>    
                        )
                    })}
                </List>
            </ListContainer>
        </Container>
     )
};

export default NextDays;
