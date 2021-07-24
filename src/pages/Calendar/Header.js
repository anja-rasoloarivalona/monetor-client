import React from "react"
import styled from "styled-components"
import { months } from './months'
import { useSelector } from 'react-redux'

const Container = styled.div`
    height: 6rem;
    width: 100%;
    background: red;
`

const Section = styled.div`

`

const Title = styled.div``

const Header = props => {

    const { viewMode, setViewMode } = props


    const {
        settings: { locale }
    } = useSelector(state => state)


    return (
        <Container>
            <Section>

            </Section>
            <Section>
                <Title>

                </Title>
            </Section>
            <Section>

            </Section>
        </Container>
     )
};

export default Header;
