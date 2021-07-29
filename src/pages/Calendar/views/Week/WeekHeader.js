import React from "react"
import styled from "styled-components"
import { days } from "../../data"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '../../../../components'
import { months } from '../../data'
import moment from "moment"

const Container = styled.div`
    background: ${props => props.theme.surface};
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
`


const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    flex: 1;
    transform: translateX(-20rem);
    position: relative;
    z-index: 9;
    padding: 0 4rem;

    :before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 20rem;
        height: 2.5rem;
        z-index: 9;
        border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
        background: ${props => props.theme.surface};
    }
`


const HeaderSection = styled.div`
    display: flex;
`

const HeaderLabel = styled.div`
    font-size: 2rem;
    font-weight: 500;
    margin: 0 2rem;
`

const HeaderIcon = styled.div`
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

const Slider = styled.div`
    display: grid;
    transition: all .3s ease-in;
`

const Label = styled.div`
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => {
        if(props.isHighLighted){
            return {
                ".header__slider__date": {
                    color: props.theme.white,
                    ":before": {
                        background: props.theme.primary,
                    }
                }
            }
        }
    }}
`

const LabelDay = styled.div`
    display: flex;
    align-items: center;
    margin-right: .5rem;
`
const LabelDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.5rem;

    :before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom 0;
        margin: auto;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        z-index: -1;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.background};
    height: 3.5rem;
    border-radius: .5rem;

    > div:not(:last-child){
        border-right: 1px solid ${props => props.theme.background};
    }

`

const ButtonItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 1.5rem;
    font-size: 1.2rem;
    cursor: pointer;

    svg {
        color: ${props => props.theme.textLight};
    }
`
const WeekHeader = props => {
    
    const { periods, setPos, pos } = props

    const { 
        settings: { locale },
        text: { text }
    } = useSelector(state => state) 


    const current = periods.find(period => period.index.pos === pos)

    const formattedToday = moment(new Date()).format("DD-MM-YYYY")

    return (
        <Container className="header">
            <Header>
                <HeaderSection>
                    <Button>
                        {text.today}
                    </Button>
                </HeaderSection>
                <HeaderSection>
                    <HeaderIcon onClick={() => setPos(prev => prev - 4)}>
                        <FontAwesomeIcon icon="angle-double-left" />
                    </HeaderIcon>
                    <HeaderIcon onClick={() => setPos(prev => prev - 1)}>
                        <FontAwesomeIcon icon="chevron-left" />
                    </HeaderIcon>
                    <HeaderLabel>
                        {months[locale][current.date.getMonth()].long} {current.date.getFullYear()}
                    </HeaderLabel>
                    <HeaderIcon onClick={() => setPos(prev => prev + 1)}>
                        <FontAwesomeIcon icon="chevron-right" />
                    </HeaderIcon>
                    <HeaderIcon onClick={() => setPos(prev => prev + 4)}>
                        <FontAwesomeIcon icon="angle-double-right" />
                    </HeaderIcon>
                </HeaderSection>
                <HeaderSection>
                    <ButtonContainer>
                        <ButtonItem>
                            <FontAwesomeIcon icon="eye"/>
                            {text.months}
                        </ButtonItem>
                        <ButtonItem>
                            <FontAwesomeIcon icon="plus"/>
                            {text.add}
                        </ButtonItem>
                    </ButtonContainer>
                </HeaderSection>

            </Header>
            <Slider  className="header__slider">
                {periods.map((period, index) => (
                    <Label
                        key={index}
                        isHighLighted={formattedToday === period.formatted}
                    >
                        <LabelDay>
                            {days[locale][period.day].short} 
                        </LabelDay>
                        <LabelDate className="header__slider__date">
                            {period.date.getDate()}
                        </LabelDate>
                    </Label>
                ))}
            </Slider>
        </Container>
     )
};

export default WeekHeader;
