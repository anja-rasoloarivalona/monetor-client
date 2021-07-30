import React, { useRef, useState, useEffect } from "react"
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
    display: flex;
    align-items: center;
    justify-content: center;
`


const Calendar = props => {

    const container = useRef()

    const {
        settings: { locale }
    } = useSelector(state => state)


    const [ isReady, setIsReady ] = useState(false)

    useEffect(() => {
        if(container.current){
            setIsReady(true)
        }
    },[container])

    

    return (
        <Container ref={container}>
            {isReady && (
                <WeekView 
                    config={{
                        days: 1,
                        h: 60,
                        sidebar: 60,
                        header: 100,
                        d: container.current.clientWidth - 60,
                        small: true
                    }}
                />
            )}

            {/* <Header 
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
            </Content> */}
        </Container>
     )
};

export default Calendar;
