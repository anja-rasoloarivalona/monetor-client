import React from "react"
import styled from "styled-components"
import { Button } from '../../components'
import { useSelector } from 'react-redux'


const Container = styled.div`
    display: flex;
    justify-content: center;
    height: max-content;
    padding-top: calc(6.5rem + 10%);
    margin-bottom: 8rem;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`

const Subtitle = styled.div`
    font-size: 2rem;
    color: grey;
    text-align: center;
`

const Title = styled.div`
    font-size: 4.5rem;
    font-weight: bold;
    margin: 2rem 0;
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`

const ImageContainer = styled.div`
    width: 50%;
    height: 100%;
`

const Header = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            <Content>
                <Title>The most advanced app</Title>
                <Subtitle>This is a subtitle mahf come on. L'heure actuelle à Québec, Canada et à Antananarivo, Madagascar maintenant. Les fuseaux horaires de Québec et de Antananarivo.</Subtitle>
                <ButtonContainer>
                    <Button>
                        Sign in
                    </Button>
                </ButtonContainer>
            </Content>
        </Container>
     )
};

export default Header;
