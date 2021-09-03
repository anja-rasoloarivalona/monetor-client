import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Input } from '../../../../../components/Form/WithoutValidation'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Container = styled.div`
    max-width: 50rem;
    height: 4rem;
    display: flex;
    border: 1px solid ${({theme}) => theme.form.unfocused.border};
    overflow: hidden;
    border-radius: .5rem;

    input {
        border: none !important;
    }
`

const IconContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.background};
`

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY


const Searchbar = () => {

    const {
        settings: { locale },
        home: { weather, currentCity }
    } = useSelector(state => state)

    const { location } = weather[currentCity].weather

    const formatLocation = ({ name, region }) => {
        return `${name}, ${region}`
    }

    const [ city, setCity ] = useState(formatLocation(location))
    const [ isFocused, setIsFocused ] = useState(false)


    const getResults = () => {
        const url = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=kinshasa&hateoasMode=false&limit=5&offset=0&sort=-population"
    }

    const getWeatherData = async value => {
        if(value !== formatLocation(location)){
            try {
                const res = await axios.get(`http://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${value.toLowerCase()}&&lang=${locale}`)
                console.log({
                    res
                })
            } catch(err){
                console.log({
                    err
                })
            }
        }
    }

    const focusHandler = e => {
        setIsFocused(true)
        if(city === formatLocation(location)){
            e.target.select()
        }
    }

    const blurHandler = () => {
        setIsFocused(false)
    }


    return (
        <Container>
            <Input 
                value={city}
                onChange={setCity}
                onFocus={e => focusHandler(e)}
                onBlur={blurHandler}
            />
            <IconContainer
                // onClick={() => getLocationHandler(city)}
            >
                <FontAwesomeIcon icon="search"/>
            </IconContainer>
        </Container>
     )
};

export default Searchbar;
