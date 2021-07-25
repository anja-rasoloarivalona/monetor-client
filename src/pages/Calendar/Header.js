import React from "react"
import styled from "styled-components"
import { months, days } from './data'
import { useSelector } from 'react-redux'
import {  Button } from '../../components'

const Container = styled.div`
    width: 100%;
    background: ${props => props.theme.surface};
    min-height: 10rem;
    // opacity: .2;
    // background: blue;
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
    font-size: 2rem;
    font-weight: 500;
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

    const { viewMode: { type, current }, setViewMode, toggleViewModeHandler } = props

    const {
        settings: { locale },
        text: { text }
    } = useSelector(state => state)

    const renderTitle = () => {
        if(type === "month"){
            return (
                <Title>{months[locale][current.month].long} {current.year}</Title>
            )
        }
        return (
            <Title>{months[locale][current.from.getMonth()].long} {current.from.getFullYear()}</Title>
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
            {days[locale].map((day, index) => (
                    <DaysItem key={index}>
                        {day.short}
                    </DaysItem>
                ))}
            </Days>
        </Container>
     )
};

export default Header;
