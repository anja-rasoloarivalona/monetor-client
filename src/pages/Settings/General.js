import React from "react"
import styled from "styled-components"
import { Container, Header, HeaderTitle, Title } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { Select } from '../../components/Form/WithoutValidation'
import { currencies } from '../../assets/currencies'
import * as actions from '../../store/actions'


const Content = styled.div`
    max-width: 50rem;
    display: flex;
    flex-direction: column;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`

const ItemLabel = styled.div`
    font-size: 1.4rem;
`

const ItemValue = styled.div`

    > div {
        min-width: 15rem;

        > div {
            min-width: 15rem;
        }
    }

`


const General = () => {


    const dispatch = useDispatch()

    const { 
        text: { text },
        user,
        settings
    } = useSelector(state => state)


    const getCurrencies = () => {
        const currenciesOptions = []
        currencies.forEach((currency, index) => {
            currenciesOptions.push({
                value:  currency.cc,
                label: `${currency.cc} -  ${currency.name}`,
            })
        })
        return currenciesOptions
    }


    const onChangeHandler = (id, value) => {
        switch(id){
            case "locale":
                return dispatch(actions.setLocale(value))
            case "currency":
                const currency = currencies.find(currency => currency.cc === value)
                return dispatch(actions.setCurrency(currency))
            case "unit":
                return dispatch(actions.setUnit(value))
            default: break;
        }
    }


    const infos =  [
        {
            label: text.currency,
            options: getCurrencies(),
            onChange: value => onChangeHandler("currency", value),
            currentValue: settings.currency.cc,
            displayValue: true,
            isSearchable: true,
            customContainerStyle: {
                width: "25rem",
                display: "flex",
                justifyContent: "flex-end"
            }
        },
        {
            label: text.language,
            options: [
                {value: "fr", label: text.fr},
                {value: "en", label: text.en}

            ],
            onChange: value => onChangeHandler("locale", value),
            currentValue: settings.locale
        },
        {
            label: text.unit_type,
            options: [
                {value: "imperial", label: text.imperial},
                {value: "metric", label: text.metric}

            ],
            onChange: value => onChangeHandler("unit", value),
            currentValue: settings.unitType
        }
    ]



    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.general_account_settings}
                </HeaderTitle>
            </Header>
            <Content>
                {infos.map((info, index) => (
                    <Item key={index}>
                        <ItemLabel>
                            {info.label}
                        </ItemLabel>
                        <ItemValue>
                            <Select {...info} />
                        </ItemValue>
                    </Item>
                ))}
            </Content>

        </Container>
     )
};

export default General;
