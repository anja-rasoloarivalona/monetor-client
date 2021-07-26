import React, { useState, useRef } from "react"
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

`


const Calendar = props => {

    const container = useRef()

    const { windowHeight } = useWindowSize()


    const config = {
        sidebar: 200,
        days: 7,
        container,
        hourItem: {
            height: (windowHeight - 100 - 65 - 20) / 6 
        },
        full: true
    }


    const today = new Date()
    const day = today.getDay()
    const currentStart = day > 0 ? moment(today).startOf('week').isoWeekday(1).add(1, 'week') :  moment(today).startOf('week').isoWeekday(1)

    const initialViewMode = {
        type: "week",
        // current: {
        //     month: today.getMonth(),
        //     year: today.getFullYear(),
        //     period: moment(today).format("MM-YYYY")
        // },
        current: {
            start: currentStart,
            end: moment(currentStart).add(6, "days"),
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
        <Container ref={container}>
            <Header 
                viewMode={viewMode}
                setViewMode={setViewMode}
                toggleViewModeHandler={toggleViewModeHandler}
                config={config}
            />
            <ViewContainer 
                type={viewMode.type}
            >
                {/* <MonthView 
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    config={config}
                /> */}
                <WeekView 
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    config={config}
                />
            </ViewContainer>

        </Container>
     )
};

export default Calendar;
