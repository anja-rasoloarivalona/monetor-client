import React from "react"
import styled from "styled-components"
import Main from './components/Main'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const Weather = props => {
    const { customRef, setIsViewingWeather,isViewingWeather, isManagingDashboard } = props
    const {
        home: { weather }
    } = useSelector(state => state)

    if(!weather){
        return null
    }

    return (
        <Container ref={customRef || null}>
            <Main 
                isViewingWeather={isViewingWeather}
                setIsViewingWeather={setIsViewingWeather}
                isManagingDashboard={isManagingDashboard}
            />
        </Container>
     )
};

export default Weather;
