import React, { useState } from "react"
import styled from "styled-components"
import Main from './components/Main'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 1rem;
`
const Weather = props => {
    const { customRef, setIsViewingWeather,isViewingWeather, isManagingDashboard } = props
    const {
        home: { weather,currentCity }
    } = useSelector(state => state)

    const [ cityDateTime, setCityDateTime ] = useState(null)


    if(!weather || !currentCity){
        return null
    }

    return (
        <Container ref={customRef || null}>
            <Main 
                isViewingWeather={isViewingWeather}
                setIsViewingWeather={setIsViewingWeather}
                isManagingDashboard={isManagingDashboard}
                cityDateTime={cityDateTime}
                setCityDateTime={setCityDateTime}
            />
        </Container>
     )
};

export default Weather;
