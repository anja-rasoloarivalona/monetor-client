import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { Title } from './style'
import { Amount } from '../../../../components'
import moment from 'moment'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 4rem .5rem 4.5rem;
`
const Header = styled.div`
    grid-column: 1 / -1;
`

const Content = styled.div`
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: .5rem 4.5rem;
    width: 100%;
`

const ContentItemTitle = styled.div`
    font-size: 1.2rem;
`

const ContentItemValue = styled.div`
    font-size: 2rem;
    display: flex;
    align-items: center;
    height: 100%;
`

const MonthlyReport = () => {

    const {
        user: { transactions },
        text: { text }
    } = useSelector(s => s)


    const [data, setData ] = useState(null)

    const getPeriod = date => {
        return moment(new Date(date)).format("MM-YYYY")
    }

    useEffect(() => {
        const currentPeriod = getPeriod(new Date())
        const res = {
            expense: 0,
            income: 0
        }
        transactions.forEach(transaction => {
            if(getPeriod(transaction.date) === currentPeriod){
                res[transaction.type] = res[transaction.type] + transaction.amount
            }
        })
        setData(res)
    },[transactions])

    return (
        <Container>
            <Header>
                <Title>
                    {text.this_month}
                </Title>
            </Header>
            {data && (
                <Content>
                    <ContentItemTitle>
                        {text.income}
                    </ContentItemTitle>
                        <ContentItemTitle>
                            {text.expense}
                        </ContentItemTitle>
                    <ContentItemValue>
                        <Amount value={data.income}/>
                    </ContentItemValue>
                        <ContentItemValue>
                            <Amount value={data.expense}/>
                    </ContentItemValue>
                </Content>
            )}

        </Container>
     )
};

export default MonthlyReport;
