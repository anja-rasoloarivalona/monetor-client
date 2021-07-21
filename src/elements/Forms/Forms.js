import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import TransactionForm from "./TransactionForm"
import { ScrollBar } from '../../components'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0, .4);
    z-index: 99;
`
const Content = styled.div`
    margin-top: 10vh;
    width: 50rem;
    background: ${props => props.theme.surface};
    height: max-content;
    max-height: 80vh;
    padding: 2rem 0rem;
    border-radius: .3rem;
`

const Header = styled.div`
    margin-bottom: 2rem;
    padding: 0rem 3rem;
`

const HeaderTitle = styled.div`
    font-size: 1.6rem;
`

const FormContainer = styled(ScrollBar)`
    width: 100%;
    max-height: 100%;
    padding: 2rem 3rem;
`

const Form = () => {


    const {
        form: { opened },
        text: { text }
    } = useSelector(state => state)

    if(!opened){
        return null
    }

    return (
        <Container>
            <Content>
                <Header>
                    <HeaderTitle>
                        {text[opened]}
                    </HeaderTitle>
                </Header>
                <FormContainer>
                    <TransactionForm />
                </FormContainer>
            </Content>    
        </Container>
     )
};

export default Form;
