import React from "react"
import styled from "styled-components"
import { Container, Header, HeaderTitle, Title } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Content = styled.div`
    max-width: 50rem;
    display: flex;
    flex-direction: column;
`

const Item = styled.div`
    display: flex;
`

const ItemLabel = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 4.5rem;
    padding: 0 2rem;
    background: ${props => props.theme.surface};
    border: 1px solid ${props => props.theme.form.unfocused.border};
    border-radius: .5rem;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.onSurface};
    }
`

const ItemLabelIcon = styled.div`
    font-size: 1.4rem;
    margin-right: 2rem;
`

const ItemLabelText = styled.div`
    font-size: 1.4rem;

`

const Security = () => {

    const { 
        text: { text }
    } = useSelector(state => state)


    return (
        <Container>
            <Header>
                <HeaderTitle>{text.login_and_security}</HeaderTitle>
            </Header>
            <Content>
                <Item>
                    <ItemLabel>
                        <ItemLabelIcon>
                            <FontAwesomeIcon icon="lock"/>
                        </ItemLabelIcon>
                        <ItemLabelText>
                            {text.change_password}
                        </ItemLabelText>
                    </ItemLabel>

                </Item>
            </Content>
        </Container>
     )
};

export default Security;
