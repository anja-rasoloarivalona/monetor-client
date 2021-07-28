import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { getHoursDate } from './functions'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props => props.theme.form.unfocused.border};
    position: relative;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const HourLayout = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: max-content;
    z-index: 2;
`

const HourLayoutItem = styled.div`
    cursor: pointer;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
    :hover {
        background: ${props => props.theme.background};
    }
`

const WeekDay = props => {

    const { 
        data: { formatted, range, day, date }, 
    } = props

    const { 
        settings: { locale,unitType },
    } = useSelector(state => state) 


    return (
        <Container className="weekday">
            <Content className="weekday__content">
                <HourLayout>
                    {getHoursDate(unitType).map((h, index) => (
                        <HourLayoutItem key={index} className="item">
                            {/* {formatted} {h} */}
                        </HourLayoutItem>
                    ))}
                </HourLayout>
            </Content>
        </Container>
     )
};

export default WeekDay;
