import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ScrollBar } from '../../../../components'
import Sidebar from './Sidebar'
import HourComponent from './HourComponent'
import { getHoursDate } from '../../functions'
import { days } from '../../data'
import DraggableGrid from "./DraggableGrid" 

const Container = styled(ScrollBar)`
    width: 100%;
    min-height: 50vh;
    background: ${props => props.theme.surface};
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    max-height: calc(100vh - 6.5rem - 10rem);
`

const Hours = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(24, 8rem);
    position: relative;
`

const WeekView = props => {

    const { viewMode } = props

    const {
        settings: { unitType , locale}
    } = useSelector(state => state)


    const getData = () => {
        const hoursData = getHoursDate(unitType)
        const res = []
        days[locale].forEach(day => {
            hoursData.forEach(hour => {
                res.push({
                    day,
                    hour
                })
            })
        })
        return res
    }

    return (
        <Container>
            <Sidebar />
            <Hours>
                {getData().map((item,index) => (
                    <HourComponent 
                        item={item}
                        key={index}
                        viewMode={viewMode}
                    />
                ))}
                <DraggableGrid 
                    current={viewMode.current}
                />
            </Hours>
        </Container>
     )
};

export default WeekView;
