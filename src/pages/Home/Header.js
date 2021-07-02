import React from "react"
import styled from "styled-components"
import { Button } from '../../components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: calc(100vh - 8rem);
    padding-top: 20vh;
    overflow: hidden;
    position: relative;
`

const Subtitle = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.text};
    text-transform: uppercase;
`

const Title = styled.div`
    font-size: 4.5rem;
    font-weight: bold;
    color: ${props => props.theme.textActive};
    margin: 2rem 0;
`

const Caption = styled.div`
    font-size: 1.6rem;
    max-width: 60rem;
    text-align: center;
    line-height: 1.4;
    color: ${props => props.theme.text};
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`


const Header = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Subtitle>
                {text.header_built_for}
            </Subtitle>
            <Title>
                {text.header_the_most_advance}
            </Title>
            <Caption>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </Caption>
            <ButtonContainer>
                <Button>
                    Get started now
                </Button>
            </ButtonContainer>
        </Container>
     )
};

export default Header;
