import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import TransactionForm from "./TransactionForm"
import TodoForm from '../../pages/Todo/TodoForm/TodoForm'
import { ScrollBar } from '../../components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    padding 0;
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    border-radius: .3rem;
    box-shadow: ${props => props.theme.boxShadow};
    position: relative;
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


const CloseIcon = styled.div`
    position: absolute;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    z-index: 2;

    svg {
        font-size: 1.3rem;
    }

    :hover {
        background: ${props => props.theme.background};
    }
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
                <CloseIcon>
                    <FontAwesomeIcon icon="times"/>
                </CloseIcon>
                <FormContainer>
                    <TransactionForm />
                    {/* <TodoForm /> */}
                </FormContainer>
            </Content>    
        </Container>
     )
};

export default Form;
