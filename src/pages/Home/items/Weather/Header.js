import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { icons as iconsCode } from './icons'
import moment from 'moment'

const Container = styled.div`
`

const Location = styled.div`
    font-size: 1.4rem;
    margin-bottom: 1rem;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(4, max-content);
    grid-template-rows: 1rem 4.5rem 1.6rem;
    column-gap: .5rem;
`


const Current = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: flex;
    align-items: flex-end;
`

const CurrentValue = styled.div`
    font-size: 5rem;
    line-height: .8;
    position: relative;
`

const Unit = styled.div`
    position: absolute;
    left: calc(100% + .5rem);
    top: 0;
    font-size: 1.4rem;
`

const FeelsLike = styled.div`
    grid-column: 2 / 4;
    grid-row: 2 / 3;
    display: flex;
    align-items: flex-end;
    height: 100%;
`

const FeelsLikeLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: ${props => props.theme.grey};

`

const FeelsLikeValue = styled.div`
    font-size: 2.7rem;
    line-height: 1;
    margin-left: .5rem;
`

const IconContainer = styled.div`
    grid-column: 4 / 5;
    grid-row: 1 / -1;
    display: flex;
    align-items: center;
`

const IconImg = styled.img`
    width: 7rem;
    object-fit: contain;
`

const Header = () => {

    const {
        home: { weather: { location, current, forecast }}
    } = useSelector(state => state)

    const [icon, setIcon ] = useState(null)


    useEffect(()=> {
        getIcon()
    },[])

    const getIcon = async () => {
        const iconType = current.is_day ? "day" : "night"
        const iconName = iconsCode[current.condition.code] || "clear"
        const currentIcon = await import(`../../../../icons/weather/${iconType}/${iconName}.png`)
        setIcon(currentIcon.default)
    }

    return (
        <Container>
            <Location>
                {location.name}, {location.region}
            </Location>

            <Content>
                <Current>
                    <CurrentValue>
                        {current.temp_c}
                        <Unit>&#8451;</Unit>
                    </CurrentValue>

                </Current>

                <FeelsLike>
                    <FeelsLikeLabel>
                        <span>T.</span>
                        <span>RESSENTIE</span>
                    </FeelsLikeLabel>
                    <FeelsLikeValue>
                    {current.feelslike_c}
                    </FeelsLikeValue>
                </FeelsLike>
        
                <IconContainer>
                    {icon && (
                        <IconImg src={icon}/>
                    )}
                </IconContainer>
            </Content>
        
        </Container>
     )
};

export default Header;
