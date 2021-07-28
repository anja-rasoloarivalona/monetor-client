import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { days } from '../../../Calendar/data'
import { ScrollBar, AppDate } from '../../../../components'
import moment from 'moment'

const Container = styled.div`
    height: 4rem;
    border-bottom: 1px solid ${props => props.theme.background};
`


const Title = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: ${props => props.theme.textLight};
`

const TitleDay = styled.div`
    text-transform: uppercase;
    margin-right: .5rem;
`


const CalendarTitle = props => {

    const { current } = props

    const {
        settings: { locale }
    } = useSelector(state => state)


    const [data, setData ] = useState(null)
    const [ pos, setPos ] = useState(-100)



    const getDate = (date, direction) => {
        if(direction === "next"){
            return new Date(moment(date).add(1, "day"))
        }
        return new Date(moment(date).subtract(1, "day"))
    }

    const addDataHandler = direction => {
        let updatedData = [...data]
        if(direction === "next"){
            let nextDate = getDate(data[data.length - 1].date, "next")
            updatedData = [...updatedData, {date: nextDate, formatted: moment(nextDate).format("DD-MM-YYYY")}]
        }
        if(direction === "prev"){
            let nextDate = getDate(data[0].date, "prev")
            updatedData = [{date: nextDate, formatted: moment(nextDate).format("DD-MM-YYYY")}, ...updatedData]
        }
        return updatedData
    }


    useEffect(() => {
        if(!data){
            const temp = [getDate(current.from, "prev"), current.from, getDate(current.from, "next")]
            const res = []
            temp.forEach(date => {
                res.push({
                    date: date,
                    formatted: moment(date).format("DD-MM-YYYY")
                })
            })
            setData(res)
        } else {
            const currentFormatted = moment(current.from).format("DD-MM-YYYY")
            const currentIndex = data.findIndex(i => i.formatted === currentFormatted)
            if(!currentIndex){
                const updatedData = addDataHandler(current.type)
                setData(updatedData)
            }
            if(current.type === "next"){
                setPos(prev => prev - 100)
            } else {
                setPos(prev => prev + 100)
            }
        }
 
    },[current])


    const renderTitle = date => {
        const day = date.getDay() === 0 ? 6 : date.getDay() - 1
        const dayLocale = days[locale][day].short
        return (
            <Title key={date.toString()}>
                <TitleDay>{dayLocale}</TitleDay>
                <AppDate value={date} format="mm-dd"/>
            </Title>
        )
    }

    if(!data){
        return null
    }

    return (
        <Container>
            {/* <DynamicSlider
                length={data.length}
                pos={pos}
            >
                {data.map(date => renderTitle(date.date))}
            </DynamicSlider> */}
        </Container>
     )
};

export default CalendarTitle;
