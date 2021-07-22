import React from "react"
import styled from "styled-components"
import { currencies } from '../../../assets/currencies'
import { Container, Title, SubTitle } from './components'
import { useSelector, useDispatch } from 'react-redux'
import Select from '../../../components/Form/WithoutValidation/Select'
import { Button } from '../../../components'
import * as actions from '../../../store/actions'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
`

const Currency = props => {

    const dispatch = useDispatch()

    const { navigateHandler } = props

    const {
        text: { text },
        theme,
        settings
    } = useSelector(state => state)

    const getCurrencies = () => {
        const currenciesOptions = []
        currencies.forEach((currency, index) => {
            currenciesOptions.push({
                value:  currency,
                label: `${currency.cc} -  ${currency.name}`
            })
        })
        return currenciesOptions
    }

    const onSelectHandler = value => {
        console.log({
            value
        })
        dispatch(actions.setCurrency(value))
    }

    return (
        <Container>
            <Content>
                <Title>
                    {text.currency}
                </Title>
                <SubTitle>
                    {text.currency_text_a}
                </SubTitle>
                <SubTitle>
                    {text.currency_text_b}
                </SubTitle>
                <Select 
                    currentValue={settings.currency}
                    options={getCurrencies()}
                    onChange={(value) => onSelectHandler(value)}
                    customListStyle={{
                        left: 0,
                        margin: "auto",
                        maxHeight: "26vh"
                    }}
                    customValueStyle={{
                        background: theme.surface,
                        width: "34rem",
                        padding: "0 1rem"
                    }}
                    customContainerStyle={{
                        marginTop: "3rem",
                    }}
                />
                <ButtonContainer>
                    <Button
                        isDisabled={!settings.currency}
                        onClick={() => navigateHandler("next")}
                    >
                        {text.next}
                    </Button>
                </ButtonContainer>
            </Content>
        </Container>
     )
};

export default Currency;
