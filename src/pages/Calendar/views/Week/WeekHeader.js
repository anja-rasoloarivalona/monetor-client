import React from "react"
import styled from "styled-components"
import { days } from "../../data"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Container = styled.div`
    background: ${props => props.theme.surface};
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
`


const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: calc(100vw - 200px);
    flex: 1;
`

const HeaderLabel = styled.div`
    font-size: 2rem;
    font-weight: 500;
    margin: 0 2rem;
`

const HeaderIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`

const Slider = styled.div`
    display: grid;
    transition: all .3s ease-in;
`

const Label = styled.div`
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const WeekHeader = props => {
    
    const { periods, setPos } = props

    const { 
        settings: { locale }
    } = useSelector(state => state) 

    return (
        <Container className="header">
            <Header>
                <HeaderIcon onClick={() => setPos(prev => prev - 1)}>
                    <FontAwesomeIcon icon="chevron-left" />
                </HeaderIcon>
                <HeaderLabel>
                    {/* {months[locale][current.from.getMonth()].long} {current.from.getFullYear()} */}
                </HeaderLabel>
                <HeaderIcon onClick={() => setPos(prev => prev + 1)}>
                    <FontAwesomeIcon icon="chevron-right" />
                </HeaderIcon>
            </Header>
            <Slider  className="header__slider">
                {periods.map((period, index) => (
                    <Label key={index}>
                        {days[locale][period.day].short} {period.date.getDate()}
                    </Label>
                ))}
            </Slider>
        </Container>
     )
};

export default WeekHeader;
