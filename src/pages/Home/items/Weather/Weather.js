import React, { useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import Header from './Header'
import NextHours from "./NextHours"

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
`

const HeaderLocation = styled.div`
    font-size: 1.6rem;
    margin-bottom: 1rem;
`

const HeaderWeather = styled.div`
`

const HeaderWeatherValue = styled.div`
    display: flex;
    width: max-content;
    height: max-content;
    position: relative;
`



const HeaderWeatherValueText = styled.span`
    font-size: 4.5rem;
    font-weight: bold;
    line-height: .9;
`

const HeaderWeatherValueUnit = styled.span`
    font-size: 1.4rem;
    height: 100%;
    flex: 1;
    position: absolute;
    left: 100%;
    top: 0;
`

const Weather = () => {


    const {
        home: { weather }
    } = useSelector(state => state)

    console.log({
        weather
    })

    if(!weather){
        return <div>Loading..</div>
    }

    const { location, current, forecast } = weather

    return (
        <Container>
            <Header />
            <NextHours />
        </Container>
     )
};

export default Weather;
