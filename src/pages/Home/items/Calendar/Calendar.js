import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import Header from "./Header"
import Sidebar from './Sidebar'
import View from './View'
import { ScrollBar, AppDate } from '../../../../components'
import { days } from '../../../Calendar/data'
import moment from 'moment'
import WeekView from '../../../Calendar/views/Week/WeekView'

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadowLight};
`

const Title = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    border-bottom: 1px solid ${props => props.theme.background};
    color: ${props => props.theme.textLight};
`
const TitleDay = styled.div`
    text-transform: uppercase;
    margin-right: .5rem;
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

    const renderTitle = () => {
        if(current.nb === 1){
            const day =  days[locale][current.from.getDay() - 1].short
            return (
                <>
                    <TitleDay>{day}</TitleDay>
                    <AppDate value={current.from} format="mm-dd"/>
                </>
            )
        }
    }

    const navigationHandler = type => {
        if(type === "next"){
            console.log({
                type
            })

            setCurrent(prev => ({
                ...prev,
                start: moment(new Date(prev.start)).add(config.days, "day"),
                end: moment(new Date(prev.end)).add(config.days, "day"),
                from: new Date(moment(new Date(prev.start)).add(config.days, "day")),
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
            <Title>
                {renderTitle()}
            </Title>
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
