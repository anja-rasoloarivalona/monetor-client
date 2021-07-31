import React from "react"
import styled from "styled-components"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '../../../../components'
import { months } from '../../data'
import { useSelector } from 'react-redux'


const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.surface};
    margin-top: .5rem;
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



const TodaySection = styled(HeaderSection)`
    height: 100%;
    background: ${props => props.theme.surface};
    width: 20rem;
`

const WeekHeaderLarge = props => {


    const { setPos, current} = props

    const { 
        settings: { locale },
        text: { text }
    } = useSelector(state => state) 


    return (
        <>
            <TodaySection>
                <Button>
                    {text.today}
                </Button>
            </TodaySection>
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
        </>
    )
};

export default WeekHeaderLarge;
