/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import moment from 'moment'
import DayComponent from "./DayComponent"
import {isScrolledIntoView, useWindowSize } from '../../../../hooks'
import { v4 } from 'uuid'
import { ScrollBar } from '../../../../components'


const Container = styled(ScrollBar)`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    justify-content: center;
    scroll-snap-type: y proximity;
    scroll-behavior: smooth;
    padding: 0 4rem;


    ::-webkit-scrollbar {
        display: none;
    }

    ${props => {
        const { windowHeight,  config: { itemHeight } } = props
        const maxGridHeight = windowHeight - 65
        const gridHeight = 6 * itemHeight
        const bodyHeight = Math.min(maxGridHeight,gridHeight)
        return {
            maxHeight: `${bodyHeight}px`,
        }
    }}
`

const MonthView = props => {

    const { viewMode: { current, type } , setViewMode, config } = props

    const { windowHeight } = useWindowSize()

    const {
        settings: { locale }
    } = useSelector(state => state)

    const viewRef = useRef()
    const [ data, setData ] = useState(null)
    const [ isScrollInitialized, setIsScrollInitialized ] = useState(false)


    const initData = () => {
        const minDate = moment("01-01-2021", "DD-MM-YYYY")
        const maxDate = moment("31-12-2022", "DD-MM-YYYY")
        const nb = maxDate.diff(minDate, 'days')
        let _data = []
        for(let i = 0; i < nb; i++){
            const next = moment(minDate).add(i, 'days')
            const day = new Date(next).getDay()
            _data.push({
                date: next,
                period: moment(new Date(next)).format("MM-YYYY"),
                id: moment(new Date(next)).format("DD-MM-YYYY"),
                day: day === 0 ? 7 : day
            })
        }
        _data.forEach((i, index) => {
            _data[index].day = _data[index].day - 1
        })
        const d = _data[0].day
        for(let i = 0; i < d; i++){
            _data = [{id: v4()}, ..._data]
        }
        setData(_data)
    }

    const getSurroundingPeriods = current => {
        const prevPeriod = moment(current.period, "MM-YYYY").subtract(1, "month").format("MM-YYYY")
        const prevPeriodId = `06-${prevPeriod}`
        const prevEl = document.getElementById(prevPeriodId)
        const nextPeriod = moment(current.period, "MM-YYYY").add(1, "month").format("MM-YYYY")
        const nextPerioId = `25-${nextPeriod}`
        const nextEl = document.getElementById(nextPerioId)
        const res = {
            prev: {
                period: prevPeriod,
                id: prevPeriodId,
                el: prevEl
            },
            next: {
                period: nextPeriod,
                id: nextPerioId,
                el: nextEl
            }
        }
        return res
    }

    useEffect(() => {
        initData()
    },[])

    useEffect(() => {
        if(data && !isScrollInitialized){
            const { period } = current
            const firstDay = moment(period,"MM-YYYY").startOf('month')
            const firstDayId = moment(firstDay).format("DD-MM-YYYY")
            const el = document.getElementById(firstDayId)
            if(el){
                el.scrollIntoView({
                    behavior: "instant"
                })
                setIsScrollInitialized(true)
                // setTimeout(() => {
                //     setIsScrollInitialized(true)
                // },700)
            }
        }
    },[data, isScrollInitialized])

    useEffect(() => {
        if(isScrollInitialized){  
            viewRef.current.addEventListener('scroll', scrollHandler)
        }

    },[isScrollInitialized])

    useEffect(() => {
        if(type !== "month" && viewRef.current){
            viewRef.current.removeEventListener('scroll', scrollHandler)
        }
    },[type])


    const shoudDisplay = (el, type) => {
        const elPos = el.offsetTop
        const scrollPos = viewRef.current.scrollTop
        const isVisible = isScrolledIntoView(el)
        if(isVisible){
            return type === "prev" ?
            scrollPos + 100 < elPos :
            scrollPos  + 100 > elPos - viewRef.current.clientHeight
        }
        return false
    }


    const scrollHandler = () => {
        setViewMode(prev => {
            if(prev.type === "month"){
                const data = getSurroundingPeriods(prev.current)
                let period = null
                if(shoudDisplay(data.prev.el, "prev")) period = data.prev.period
                if(shoudDisplay(data.next.el, "next")) period = data.next.period
                if(period){    
                    if(period !== prev.current.period){
                        const updatedData = {
                            period,
                            month: parseInt(period.split('-')[0]) - 1,
                            year: parseInt(period.split('-')[1])
                        }
                        return {
                            ...prev,
                            current: updatedData
                        }
                    }
                }
            }
            return prev
        })
    }



    return (
        <Container
            ref={viewRef}
            config={config}
            windowHeight={windowHeight}
            type={type}
        >
            {data && data.map((item, index) => {
            return (
                <DayComponent 
                    key={item.id}
                    item={item}
                    current={current}
                    config={config}
                    viewRef={viewRef}
                    scrollHandler={scrollHandler}
                    isScrollInitialized={isScrollInitialized}
                />
            )
            })}
        </Container>
     )
};

export default MonthView
