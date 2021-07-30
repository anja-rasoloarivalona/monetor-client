import React from "react"
import styled from "styled-components"
import { months, days } from './data'
import { useSelector } from 'react-redux'
import {  Button } from '../../components'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Container = styled.div`
    width: 100%;
    background: ${props => props.theme.surface};
    min-height: 10rem;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 6rem;
    padding: 0 4rem;
`

const Section = styled.div`

`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const TitleLabel = styled.div`
    font-size: 2rem;
    font-weight: 500;
    margin: 0 2rem;
`

const TitleIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`


const Days = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 4rem;
    padding: 0 4rem;

    ${props => {
        if(props.type === "week"){
            return {
                paddingLeft: "20rem",
                borderBottom: `1px solid ${props.theme.form.unfocused.border}`

            }
        }
    }}
`

const DaysItem = styled.div`
    font-size: 1.2rem;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 1rem;
`

const ToggleViewMode = styled.div``

const ToggleViewModeButton = styled(Button)`

`

const Header = props => {

    const { viewMode: { type, current }, setViewMode, toggleViewModeHandler, config } = props

    const {
        settings: { locale },
        text: { text }
    } = useSelector(state => state)

    const navigationHandler = direction => {
        if(type === "week"){
            const updatedCurrent = {...current}
            if(direction === "next"){
                updatedCurrent.start = new Date(moment(current.start).add(config.days, 'days'))
                updatedCurrent.end = new Date(moment(current.end).add(config.days, 'days')) 
                updatedCurrent.from = new Date(moment(updatedCurrent.start).add(config.days, 'days'))             

            } else {
                updatedCurrent.start = new Date(moment(current.start).subtract(config.days, "days"))
                updatedCurrent.end = new Date(moment(current.end).subtract(config.days, "days")) 
                updatedCurrent.from = new Date(moment(updatedCurrent.start).subtract(config.days, 'days'))             

            }
            setViewMode(prev => ({
                type: "week",
                current: {
                    ...updatedCurrent,
                    direction
                }
            }))

        }
    }

    const renderTitle = () => {
        if(type === "month"){
            return (
                <Title>
                    <TitleLabel>
                        {months[locale][current.month].long} {current.year}
                    </TitleLabel>
                </Title>
            )
        }
        return (
            <Title>
                <TitleIcon onClick={() => navigationHandler("prev")}>
                    <FontAwesomeIcon icon="chevron-left" />
                </TitleIcon>
                <TitleLabel>
                    {months[locale][current.from.getMonth()].long} {current.from.getFullYear()}
                </TitleLabel>
                <TitleIcon onClick={() => navigationHandler("next")}>
                    <FontAwesomeIcon icon="chevron-right" />
                </TitleIcon>
            </Title>
        )
    }

    const getCurrentWeekDates = () => {
        const res = []
        for(let i = 0; i < 7; i++){
            const date = moment(current.start).add(i, 'days')
            res.push(new Date(date).getDate())
        }
        return res
    }

    const renderDayItem = (day, index) => {
        let label = day.short
        if(type === "week"){
            label += ` ${getCurrentWeekDates()[index]}`
        }
        return (
            <DaysItem key={index}>
                {label}
             </DaysItem>
        )
    }


    return (
        <Container>
            <Top>
                <Section>

                </Section>
                <Section>
                    {renderTitle()}
                </Section>
                <Section>
                    <ToggleViewMode>
                        <ToggleViewModeButton
                            small primary
                            onClick={() => toggleViewModeHandler(type === "month" ? "week" : "month")}
                        >
                            {type === "month" ?  text.week : text.months}
                        </ToggleViewModeButton>
                    </ToggleViewMode>
                </Section>
            </Top>
            <Days type={type}>
                {days[locale].map((day, index) => renderDayItem(day, index))}
            </Days>
        </Container>
     )
};

export default Header;
