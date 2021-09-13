import React, { useState, useRef } from "react"
import styled from "styled-components"
import Header from './Header'
import MonthView from './views/Month/MonthView'
import WeekView from './views/Week/Week'
import { useScroll,  isScrolledIntoView, useWindowSize } from '../../hooks'
import { ScrollBar } from '../../components'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: ${({theme}) => theme.background};
`

const ViewContainer = styled.div`
    display: grid;
    width: calc(100vw - 2rem);
    transform: ${props => props.viewMode === "week" ? 0 : "-100%"};
    background: ${props => props.theme.background};
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    overflow: hidden;
    box-shadow: ${({theme}) => theme.boxShadow};
`


const Calendar = props => {

    const [ viewMode, setViewMode ] = useState("week")


    return (
        <Container>
            <Header>

            </Header>
            <ViewContainer viewMode={viewMode}>
                <WeekView 
                    setViewMode={setViewMode}
                />
            </ViewContainer>
        </Container>
    )
};

export default Calendar;
