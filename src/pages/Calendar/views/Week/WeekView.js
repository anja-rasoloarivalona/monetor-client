import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ScrollBar } from '../../../../components'
import Sidebar from './Sidebar'
import HourComponent from './HourComponent'
import { getHoursDate } from '../../functions'
import { days } from '../../data'
import DraggableGrid from "./DraggableGrid" 
import DynamicSlider from './DynamicSlider'
import { useWindowSize } from "../../../../hooks"

const Container = styled(ScrollBar)`
    width: 100%;
    background: ${props => props.theme.surface};
    display: grid;
    grid-template-rows: max-content;
    overflow-x: hidden;
    padding-right: 1rem;


    ${props => {
        const itemHeight = props.config.hourItem.height
        const maxScreenHeight = props.windowHeight - 65 - 100
        const maxItemHeight = itemHeight * 24

        const maxHeight = props.config.full ? maxScreenHeight : maxItemHeight

        const sidebarHeight = props.config.sidebar
        const nb = props.config.days

        return {
            maxHeight: `${maxHeight}px`,
            gridTemplateColumns: `${sidebarHeight}px 1fr`,
            gridTemplateRows: `${maxHeight}px`,
            ".content": {
                height: itemHeight * 24,
                gridTemplateRows: `repeat(24, ${itemHeight}px)`,
                gridTemplateColumns: `repeat(${nb}, 1fr)`
            },
            ".sidebar": {
                width: `${sidebarHeight}px`,
                height: `${maxItemHeight}px`,
                ".item": {
                    height: `${itemHeight}px`
                }
            },
            ".grids-container": {
                height: `${maxItemHeight}px`
            },
            ".layout": {
                maxHeight: `${maxHeight}px`,
            }
        }
    }}

    ${props => {
        if(props.config.container && props.config.container.current){
            return {
                maxWidth: `${props.config.container.current.clientWidth}px`
            }
        }
    }}

    ${props => {
        if(props.config.full){
            return {
                ".grids-container": {
                    width: `${props.windowWidth - props.config.sidebar}px`
                }
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

const Content = styled.div`
    display: grid;
    position: relative;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
`


const GridsContainer = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
`



const WeekView = props => {

    const { windowHeight, windowWidth } = useWindowSize()

    const {
        viewMode: { current },
        config,
    } = props

    const {
        settings: { unitType , locale}
    } = useSelector(state => state)



    const [data, setData ] = useState(null)
    const [ pos, setPos ] = useState(-100)


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

    const getRange = (d, direction) => {

        let date = d

        if(direction){
            if(direction === "next"){
                date = new Date(moment(date).add(config.days, 'days'))
            } else {
                date = new Date(moment(date).subtract(config.days, 'days' ))
            }
        }

        const day = date.getDay()
        const currentStart = 
            day > 0 ? 
            moment(date).startOf('week').isoWeekday(1).add(1, 'week') :  
            moment(date).startOf('week').isoWeekday(1)
        const currentEnd = moment(currentStart).add(6, "days").set('hour', 23).set("minute", 59)

        return {
            start: currentStart,
            end: currentEnd,
            from: date,
            formatted: {
                start: moment(currentStart).format("DD-MM-YYYY"),
                end:  moment(currentEnd).format("DD-MM-YYYY")
            },
            jsDates: {
                start: new Date(currentStart),
                end: new Date(currentEnd)
            }
        }
    }

    const addDataHandler = direction => {
        let updatedData = [...data]
        if(direction === "next"){
            let nextRange = getRange(data[data.length - 1].from, "next")
            updatedData = [...updatedData, nextRange]
        }
        if(direction === "prev"){
            let prevRange = getRange(data[0].from, "prev")
            updatedData = [prevRange, ...updatedData]
        }
        return updatedData
    }

    useEffect(() => {
        if(!data){
            const init = [getRange(current.from, "prev"), getRange(current.from), getRange(current.from, "next")]        
            setData(init)
        } else {
            const currentFormattedStart = moment(data[data.length - 1].start).format("DD-MM-YYYY") 
            const currentIndex = data.findIndex( i => i.formatted.start === currentFormattedStart)
            if(!currentIndex){
                const updatedData = addDataHandler(current.direction)
                setData(updatedData)
            }
            if(current.direction === "next"){
                setPos(prev => prev - 100)
            } else {
                setPos(prev => prev + 100)
            }
        }
    },[current])


    if(!data){
        return null
    }

    const hoursData = config.days === 7 ? getData() : getHoursDate(unitType)
    
    return (
        <Container config={config} windowHeight={windowHeight} windowWidth={windowWidth}>
            <Sidebar />
            <Content className="content">
                {hoursData.map(i =>  <HourComponent />)}
                <GridsContainer className="grids-container">
                    <DynamicSlider
                        pos={pos}
                        length={data.length}
                    >
                        {data.map((period, index) => (
                            <DraggableGrid
                                key={index}
                                current={period}
                                config={config}
                            />                  
                        ))}
                    </DynamicSlider>
                </GridsContainer>
            </Content>
        </Container>
     )
};

export default WeekView;
