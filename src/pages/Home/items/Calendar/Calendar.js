import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import Header from "./Header"
import Sidebar from './Sidebar'
import View from './View'
import { ScrollBar, AppDate } from '../../../../components'
import { days } from '../../../Calendar/data'
import moment from 'moment'
import WeekView from '../../../Calendar/views/Week/Week'
import CalendarTitle from "./CalendarTitle"


const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadowLight};
`


const Content = styled(ScrollBar)`
    display: flex;
    max-height: 100%;
    overflow-x: hidden;

    ${props => {
        if(props.config && props.config.container.current){
            const min = props.config.container.current.clientHeight - 90
            const max = props.config.hourItem.height * 24
            return {
                maxHeight: `${Math.min(min, max)}px`,
            }
        }
      
    }}

    ::-webkit-scrollbar {
        display: none;
    }

    .sidebar > div > div.item {
        font-size: 1.1rem;
        padding: .5rem;
    }

    .hour {
        border-right: none;
    }




`

const Calendar = () => {

    const container = useRef()

    const {
        settings: { locale }
    } = useSelector(state => state)

    const today = new Date()

    const initial = {
        nb: 1,
        from: today,
        start: moment(today).set('hour', 0).set("minute", 0),
        end: moment(today).set('hour', 23).set("minute", 59)
    }


    const [ current, setCurrent ] = useState(initial)

    const config =  {
        sidebar: 50,
        days: 1,
        container,
        hourItem: {
            height: 60
        }
    }

    const navigationHandler = type => {
        if(type === "next"){
            setCurrent(prev => ({
                ...prev,
                start: moment(new Date(prev.start)).add(config.days, "day"),
                end: moment(new Date(prev.end)).add(config.days, "day"),
                from: new Date(moment(new Date(prev.start)).add(config.days, "day")),
                type
            }))
        }
        if(type === "prev"){
            setCurrent(prev => ({
                ...prev,
                start: moment(new Date(prev.start)).subtract(config.days, "day"),
                end: moment(new Date(prev.end)).subtract(config.days, "day"),
                from: new Date(moment(new Date(prev.start)).subtract(config.days, "day")),
                type
            }))
        }
    }



    return (
        <Container ref={container}>
            <Header 
                current={current}
                setCurrent={setCurrent}
                navigationHandler={navigationHandler}
            />
            <CalendarTitle current={current}/>
            <Content config={config}>
                <WeekView 
                    viewMode={{
                        current
                    }}
                    config={config} 
                />
            </Content>

        </Container>
     )
};

export default Calendar;
