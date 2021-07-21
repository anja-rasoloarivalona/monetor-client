import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { icons as iconsCode } from './icons'
import moment from 'moment'
import { ScrollHorizontalBar  } from '../../../../components'

const Container = styled.div`
    margin-top: 3rem;
`

const Slider = styled(ScrollHorizontalBar)`
    width: 100%;
    height: max-content;
    padding-bottom: 3rem;
    cursor: pointer;

    ::-webkit-scrollbar {
        display: none;
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

const SliderContent = styled.div`
    display: flex;
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
`

const ItemIcon = styled.img`
    width: 3.5rem;
    object-fit: contain;
`

const ItemValue = styled.div`
    display: flex;
    font-size: 1.1rem;
`

const ItemValueText = styled.div``

const ItemValueUnit = styled.div``

const NextHours = () => {

    const {
        settings: { locale },
        home: { weather: { location, current, forecast }}
    } = useSelector(state => state)


    const [data, setData] = useState(null)

    useEffect(() => {
        if(forecast){
            formatForecast()
        }
    },[forecast])


    const getIcon = async (is_day, code) => {
        const iconType = is_day ? "day" : "night"
        const iconName = iconsCode[code] || "clear"
        const currentIcon = await import(`../../../../icons/weather/${iconType}/${iconName}.png`)
        return currentIcon
    }


    const formatForecast = async () => {
        const nextHours = {}
        for(let i = 1; i < 25; i++){
            const now = moment()
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
                    time: locale === "en" ? moment(period).format('LT') : period.split(" ")[1],
                    icon: await getIcon(currentData.is_day, currentData.condition.code)
                }
            }
        }))

        setData(nextHours)
    }


    console.log({
        data
    })

    if(!data){
        return null
    }

    return (
        <Container>
            <Slider>
                <SliderContent>
                    {Object.keys(data).map(hour => {
                        const currentData = data[hour]
                        return (
                            <Item key={hour}>
                                <ItemHour>
                                    {currentData.metadata.time}
                                </ItemHour>
                                <ItemIconContainer>
                                    <ItemIcon src={currentData.metadata.icon.default} />
                                </ItemIconContainer>
                                <ItemValue>
                                    <ItemValueText>
                                        {currentData.temp_c}
                                    </ItemValueText>
                                    <ItemValueUnit>
                                        &#8451;
                                    </ItemValueUnit>
                                </ItemValue>
                            </Item>
                        )
                    })}
                </SliderContent>
            </Slider>
        </Container>
     )
};

export default NextHours;
