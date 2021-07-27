import React from "react"
import styled from "styled-components"
import { Container, Header, HeaderTitle, Title } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { Select } from '../../components/Form/WithoutValidation'
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

const Display = () => {

    const dispatch = useDispatch()

    const { 
        text: { text },
        theme
    } = useSelector(state => state)

    const selectTheme = theme => {
        dispatch(actions.setTheme(theme))
        console.log({
            theme
        })
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.display}
                </HeaderTitle>
            </Header>
            <Content>
                <Item>
                    <ItemLabel>
                        {text.theme}
                    </ItemLabel>
                    <ItemValue>
                        <Select 
                            currentValue={theme.type}
                            options={[
                                {label: text.light, value: "light"},
                                {label: text.dark, value: "dark" }
                            ]}
                            onChange={selectTheme}
                        />
                    </ItemValue>
                </Item>
            </Content>

        </Container>
     )
};

export default Display;
