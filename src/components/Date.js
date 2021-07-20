import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'

const Container = styled.div``


const months = {
    fr: [
        {short: "jan",  long: "janvier"},
        {short: "fév", long: "février"},
        {short: "mars", long: "mars"},
        {short: "avr", long: "avril"},
        {short: "mai", long: "mai"},
        {short: "juin", long: "juin"},
        {short: "jui", long: "juillet"},
        {short: "août", long: "août"},
        {short: "sept", long: "septembre"},
        {short: "oct", long: "octobre"},
        {short: "nov", long: "novembre"},
        {short: "déc", long: "décembre"},
    ],
    en: [
        {short: "Jan",  long: "January"},
        {short: "Feb", long: "February"},
        {short: "Mar", long: "March"},
        {short: "Apr", long: "April"},
        {short: "May", long: "May"},
        {short: "June", long: "June"},
        {short: "Jul", long: "July"},
        {short: "Aug", long: "August"},
        {short: "Sept", long: "September"},
        {short: "Oct", long: "October"},
        {short: "Nov", long: "November"},
        {short: "Dec", long: "December"},
    ]
}

const AppDate = props => {
    const { value, month: _month, format} = props

    const {
        settings : { locale }
    } = useSelector(state => state)

    const date = value ?  new Date(value) : new Date()

    let days = date.getDate();
    if(days < 10){
        days = '0' + days
    }

    let month = date.getMonth() + 1
    if(month < 10){
        month = '0' + month
    }

    
    const formatData = {
        hh: `${date.getHours()}`,
        sec: `${date.getSeconds()}`,
        min: `${date.getMinutes()}`,
        dd: days,
        mm: _month ?  `${months[locale][date.getMonth()][_month]}` : month,
        yy: `${date.getFullYear()}`
    }

    const formatLocale = {
        fr: {
            mm: 1,
            dd: 0,
            yy: 2
        },
        en: {
            mm: 0,
            dd: 1,
            yy: 2
        }
    }

    const formatArray = format.replace(/[^a-z]/gi, ' ').split(' ');

    const rightFormatArray = []
    const resArray = []

    formatArray.forEach(i => {
        rightFormatArray[formatLocale[locale][i]] = i
    })

    rightFormatArray.forEach((i, index) => {
        resArray[index] = formatData[i]
    })


    const isHypen = /-/g.exec(format)
    const isSlash = format.includes("/")
    const separator  = isHypen ? "-" : isSlash ? "/" : " "

    return (
        <Container>
            {resArray.join(separator)}
        </Container>
    )
};

export {
    AppDate
};
