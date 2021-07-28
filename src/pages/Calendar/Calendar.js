import React, { useState, useRef } from "react"
import styled from "styled-components"
import Header from './Header'
import MonthView from './views/Month/MonthView'
import WeekView from './views/Week/Week'
import moment from 'moment'
import { useScroll,  isScrolledIntoView, useWindowSize } from '../../hooks'
import { ScrollBar } from '../../components'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.surface};
`

const ViewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 100vw);
    grid-template-rows: max-content;
    width: 100vw;
    transform: ${props => props.viewMode === "week" ? 0 : "-100%"};
    transition: all .3s ease-in;
`


const Calendar = props => {

    const [ viewMode, setViewMode ] = useState("week")


    return (
        <Container>
            <ViewContainer viewMode={viewMode}>
                <WeekView 
                    setViewMode={setViewMode}
                />
                {/* <MonthView 
                    setViewMode={setViewMode}
                /> */}
            </ViewContainer>
        </Container>
    )
};

export default Calendar;
