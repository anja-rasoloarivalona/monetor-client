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
    background: ${props => props.theme.surface};
    display: grid;
    grid-template-rows: max-content;
    overflow-x: hidden;
    padding-right: 1rem;


    ${props => {
        return {
            maxHeight: `${props.config.hourItem.height * 24}px`,
            gridTemplateColumns: `${props.config.sidebar}px 1fr`,
            gridTemplateRows: `${props.config.hourItem.height * 24}px`,
            ".hours": {
                gridTemplateRows: `repeat(24, ${props.config.hourItem.height}px)`,
                gridTemplateColumns: `repeat(${props.config.days}, 1fr)`
            },
            ".sidebar": {
                width: `${props.config.sidebar}px`,
                ".item": {
                    height: `${props.config.hourItem.height}px`
                }
            },
            ".layout": {
                maxHeight: `${props.config.hourItem.height * 24}px`,
            }
        }
    }}

    ${props => {
        if(props.config && props.config.container.current){
            return {
                maxWidth: `${props.config.container.current.clientWidth}px`
            }
        }
    }}


    ::-webkit-scrollbar {
        display: none;
    }

    :hover {
        ::-webkit-scrollbar {
            display: initial;
        }
    }
`

const Hours = styled.div`
    display: grid;
    position: relative;
    overflow-x: hidden;
`

const WeekView = props => {

    const {
        viewMode,
        config = {
            sidebar: 200,
            days: 7,
            hourItem: {
                height: 80
            }
        }
    } = props

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

    const currentData = config.days === 7 ? getData() : getHoursDate(unitType)


    const renderGrids = () => {
        const grids = [
            { id: "prev", pos: -1 },
            { id: "now", pos: 0 },
            { id: "next", pos: 1}
        ]
        return (
            <>
                {grids.map(grid => (
                    <DraggableGrid
                        key={grid.id}
                        id={grid.id}
                        pos={grid.pos} 
                        current={viewMode.current}
                        config={config}
                    />
                ))}
            </>
        )
    }

    return (
        <Container config={config}>
            <Sidebar />
            <Hours className="hours">
                {currentData.map((item,index) => (
                    <HourComponent 
                        item={item}
                        key={index}
                        viewMode={viewMode}
                    />
                ))}
                {renderGrids()}
            </Hours>
        </Container>
     )
};

export default WeekView;
