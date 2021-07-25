import React, { useState } from "react"
import styled from "styled-components"
import Header from './Header'
import MonthView from './views/Month/MonthView'
import WeekView from './views/Week/WeekView'
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
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(2, 100vw);
    grid-tempate-rows: max-content;
    grid-auto-rows: max-content;
    transform: translateX(${props => props.type === "month" ? 0 : "-100%"});
    transition: all .3s ease-in;
`


const Calendar = props => {

    const { windowHeight } = useWindowSize()

    const {config = { itemHeight: (windowHeight - 100 - 65 - 20) / 6 } } = props

    // const {config = { itemHeight: 200 } } = props


    const today = new Date()

    const initialViewMode = {
        type: "week",
        // current: {
        //     month: today.getMonth(),
        //     year: today.getFullYear(),
        //     period: moment(today).format("MM-YYYY")
        // },
        current: {
            start: moment(today).startOf('week').isoWeekday(1),
            end: moment(today).endOf('week').isoWeekday(1),
            from: today 
        }
    }

    const [ viewMode, setViewMode ] = useState(initialViewMode)

    const toggleViewModeHandler = nextType => {
        const { current } = viewMode
        let range
        switch(nextType){
            case "week":
                range = {
                    start: null,
                    end: null,
                    from: null 
                }
                current.month === today.getMonth() ? range.from = today : range.from = moment(`15-${ current.period}`, "DD-MM-YYYY")   
                range.start = moment(range.from).startOf('week').isoWeekday(1);
                range.end = moment(range.from).endOf('week').isoWeekday(1);
                range.from = new Date(moment(range.start).add(3, 'days')) 
                setViewMode({
                    type: "week",
                    current: range
                })
                break
            case "month":
                range = {
                    month: null,
                    year: null,
                    period: null
                }
                 current.from === today ? 
                    range = { ...initialViewMode.current } :
                    range.month =  new Date(current.from).getMonth()
                    range.year = new Date(current.from).getFullYear()
                    range.period = moment(current.from).format("MM-YYYY")
                setViewMode({
                    type: "month",
                    current: range
                })
            default: break
        }
    }

    return (
        <Container 
            config={config}
            windowHeight={windowHeight}
        >
            <Header 
                viewMode={viewMode}
                setViewMode={setViewMode}
                toggleViewModeHandler={toggleViewModeHandler}
            />
            <ViewContainer 
                type={viewMode.type}
            >
                <MonthView 
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    config={config}
                />


                <WeekView 
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </ViewContainer>

        </Container>
     )
};

export default Calendar;
