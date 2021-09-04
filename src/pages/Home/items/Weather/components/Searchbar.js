import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Input } from '../../../../../components/Form/WithoutValidation'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../../store/actions'
import moment from 'moment'

const Container = styled.div`
    max-width: 50rem;
    display: flex;
    border: 1px solid ${({theme}) => theme.form.unfocused.border};
    border-radius: .5rem;
    position: relative;

    input {
        border: none !important;
        font-size: 1.5rem;
    }
`

const InputContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    border-radius: .5rem;
    overflow: hidden;
    padding: 0 2rem;
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
`

const List = styled.ul`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    border-radius: .5rem;
    z-index: 1;
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.boxShadowLight};
    list-style: none;
    padding: 1rem;
    li:not(:last-child){
        margin-bottom: 1rem;
    }
`

const ListItem = styled.li`
    padding: 1rem;
    font-size: 1.4rem;
    border-radius: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    :hover {
        background: ${({ theme }) => theme.background};
    }
`

const ListItemIcon = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.textLight};
`

const ListItemLabel = styled.span``


const Searchbar = () => {

    const dispatch = useDispatch()

    const {
        text: { text },
        settings: { locale },
        home: { weather, currentCity }
    } = useSelector(state => state)

    const { location } = weather[currentCity].weather

    const formatLocation = ({ name, region, country }) => {
        if(name !== region){
            return `${name}, ${region}`
        }
        return `${name}, ${country}`
    }

    const [ city, setCity ] = useState(formatLocation(location))
    const [ results, setResults ] = useState(null)
    const [ isFocused, setIsFocused ] = useState(false)

    

    useEffect(() => {
        const getCities = async () => {
            try {
                const res = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${city}&hateoasMode=false&limit=10&offset=0&sort=-population&types=city`).then(res => res.json())        
                setResults(res.data)
            } catch(err){
                console.log({ err })
            }
        }
        let timeout
        if(isFocused){
            if(city && city !== formatLocation(location)){
                timeout = setTimeout(() => {
                    getCities()
                },500)
            } else {
                setResults(null)
            }
        }
        return () => clearTimeout(timeout)

    },[ city, location ])


    const focusHandler = e => {
        setIsFocused(true)
        if(city === formatLocation(location)){
            e.target.select()
        }
    }

    const blurHandler = () => {
        setIsFocused(false)
    }

    const selectCityHandler = async cityData => {

        const { dateTime, metadata }  = await getCityDateTime(cityData.id)
        const currentDate = moment(dateTime).format("YYYY-MM-DD")
        const currentTime = dateTime.getHours()

        dispatch(actions.getWeather(cityData.city, true, {
            date: currentDate,
            time: currentTime,
            fullDate: dateTime,
            metadata 
        }))
        setResults(null)
        setIsFocused(false)
        setCity(formatLocation(cityData))
    }

    const getCityDateTime = async cityId => {
        try {
            const res = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities/${cityId}/dateTime`).then(res => res.json())   
            const date = res.data
            const cityUtcDiff = date.substr(date.length - 6)
            const op = cityUtcDiff[0]
            const hour = parseInt(cityUtcDiff.split(":")[0].substring(1)) 
            const diffHour = op === "+" ? hour : hour * -1
            const offSetHour = new Date().getTimezoneOffset() / 60
            return {
                dateTime: new Date(new Date().setHours(new Date().getHours() + (diffHour + offSetHour))),
                metadata: {
                    diffHour,
                    offSetHour
                }
            }
        } catch(err){
            console.log({ err })
        }
    }


    return (
        <Container>
            <InputContainer>
                <IconContainer>
                    <FontAwesomeIcon icon="search"/>
                </IconContainer>
                <Input 
                    value={city}
                    onChange={setCity}
                    onFocus={e => focusHandler(e)}
                    onBlur={blurHandler}
                    placeholder={`${text.city_placeholder}...`}
                />
            </InputContainer>
            {results && (
                <List>
                    {results.map((result, index) => (
                        <ListItem
                            key={index}
                            onClick={() => selectCityHandler(result)}
                        >
                            <ListItemIcon>
                                <FontAwesomeIcon icon="map-marker-alt"/>
                            </ListItemIcon>
                            <ListItemLabel>
                                {result.city}, {result.region}, {result.country}
                            </ListItemLabel>
                        </ListItem>
                    ))}
                </List>
            )}
       
        </Container>
     )
};

export default Searchbar;
