import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    width: 100%;
    height: 5rem;
    box-shadow: 0 0px 0px rgb(0 0 0 / 14%), 0 0px 4px rgb(0 0 0 / 13%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
`

const Section = styled.div`
    display: flex;
    align-items: center;
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

const CalendarSelector = styled(ButtonContainer)`
    margin-left: .5rem;
    padding: 0 1rem;
`

const CalendarSelectorLabel = styled.div`
    svg {
        margin: 0 .3rem;
    }
`


const Header = props => {

    const { navigationHandler } = props

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Section>
                <ButtonContainer>
                    <ButtonItem>
                        {text.today}
                    </ButtonItem>
                    <ButtonItem onClick={() =>navigationHandler("prev")}>
                        <FontAwesomeIcon icon="chevron-left"/>
                    </ButtonItem>
                    <ButtonItem onClick={() =>navigationHandler("next")}>
                        <FontAwesomeIcon icon="chevron-right"/>
                    </ButtonItem>
                </ButtonContainer>
                <CalendarSelector>
                    <CalendarSelectorLabel>
                        <FontAwesomeIcon icon={faCalendar}/>
                        <FontAwesomeIcon icon="chevron-down" />
                    </CalendarSelectorLabel>
                </CalendarSelector>
            </Section>
            <Section>
                <ButtonContainer>
                    <ButtonItem>
                        <FontAwesomeIcon icon="cog"/>
                    </ButtonItem>
                </ButtonContainer>
            </Section>
        </Container>
     )
};

export default Header;
