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


const Weather = () => {


    const {
        home: { weather }
    } = useSelector(state => state)

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
