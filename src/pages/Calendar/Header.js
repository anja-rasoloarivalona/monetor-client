import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
`

const Section = styled.div`
    display: flex;
    align-items: center;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    font-size: 1.4rem;
    cursor: pointer;
    position: relative;
    height: 3.5rem;
    border-radius: 1rem;
    color: ${props => props.theme.dynamicText};
    background: ${props => props.theme.onSurface};
    margin-left: 1rem;
    :hover {
        box-shadow: ${({theme}) => theme.boxShadow};
        color: ${({theme}) => theme.text};
        background: ${({theme}) => theme.surface};
    }
`

const Header = () => {
    return (
        <Container>
            <Section>

            </Section>
            <Section>
                
            </Section>
            <Section>
                <Button>
                    Timeline
                </Button>
                <Button>
                    <FontAwesomeIcon icon="filter"/>
                </Button>
            </Section>
        </Container>
     )
};

export default Header;
