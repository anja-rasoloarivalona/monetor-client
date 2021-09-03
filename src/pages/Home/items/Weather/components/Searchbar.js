import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Input } from '../../../../../components/Form/WithoutValidation'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../../store/actions'

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

    const formatLocation = ({ name, region }) => {
        return `${name}, ${region}`
    }

    const [ city, setCity ] = useState(formatLocation(location))
    const [ results, setResults ] = useState(null)
    const [ isFocused, setIsFocused ] = useState(false)

    

    useEffect(() => {
        const getCities = async () => {
            try {
                const res = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${city}&hateoasMode=false&limit=10&offset=0&sort=-population&types=city`).then(res => res.json())        
                console.log(res.data)
                setResults(res.data)
            } catch(err){
                console.log({ err })
            }
        }
        let timeout
        if(city && city !== formatLocation(location)){
            timeout = setTimeout(() => {
                getCities()
            },500)
        } else {
            setResults(null)
        }
        return () => clearTimeout(timeout)

    },[city, location ])


    const focusHandler = e => {
        setIsFocused(true)
        if(city === formatLocation(location)){
            e.target.select()
        }
    }

    const blurHandler = () => {
        setIsFocused(false)
    }

    const selectCityHandler = city => {
        dispatch(actions.getWeather(city, true))
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
                            onClick={() => selectCityHandler(result.city.toLowerCase())}
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
