import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Title } from './style'
import { Line } from 'react-chartjs-2'
import { formatDate } from '../../../../functions'
import { ScrollDrag,ScrollHorizontalBar } from '../../../../components'
import { useSelector } from 'react-redux'
import { Select } from '../../../../components/Form/WithoutValidation'


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
`

const Header = styled.div`
    margin-bottom: 5rem;
    display: flex;
    justify-content: space-between;

    > div:last-child {
        // width: 50%;
        // display: flex;
        // justify-content: flex-end;
    }

`

const ChartContainer = styled.div`
    position: relative;
    width: 80vw;
    height: 100%;
    padding-bottom: 1rem;
`

const FixedYAxis = styled.div`
    position: absolute;
    left: 0rem;
    top: -.8rem;
    margin: auto;
    height: calc(100% - 4.2rem);
    width: 4rem;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 2;

    > div:last-child {
        color: transparent;
    }

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        right: -4px;
        width: 6.5rem;
        height: 3rem;
        background: white;
    }
`

const FixedYAxisLabel = styled.div`
    font-size: 1.2rem;
`

const Body = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const History = () => {

    const {
        text: { text },
        settings: { locale },
        user: { transactions, wallets },
        theme,
        finance: { filters }
    } = useSelector(state => state)

    const [ yLabels, setYlabels] = useState([])
    const [period, setPeriod ] = useState("all")


    useEffect(() => {
   

    },[transactions, wallets])


    const generateData = canvas => {
        let initialBalance = 0
        wallets.forEach(wallet => {
            initialBalance += parseFloat(wallet.amount)
        })

        let currentBalance = initialBalance
        const data = []
        const dayLength = 24*60*60*1000


        for(let i = 0; i <= 30; i++){
            const date = new Date(Date.now() - (i * dayLength ))
            const shortDate = formatDate(date, "dd-mm", "en")
            let label = ""
            if(i === 30){
                label = formatDate(date, "mm dd", "en", "short")
            } else {
                label = shortDate
            }
            data.push({
                income: 0,
                expense: 0,
                index: i,
                shortDate,
                date,
                label
            })
        }

        if(transactions){
            transactions.forEach(transaction => {
                const amount = parseInt(transaction.amount)
                const shortDate = formatDate(transaction.date, "dd-mm", "en")
                const indexHos = data.findIndex( i => i.shortDate === shortDate)
                if(indexHos > -1){
                    data[indexHos][transaction.type] = data[indexHos][transaction.type] + amount
                }
            })
        }
    
        data.forEach((item, index) => {
            const variation = item.income - item.expense
            data[index].variation = variation
            if(data[index + 1]){
                data[index + 1].balance = currentBalance - variation
            }
            currentBalance -= variation
        })
    
        data[0].balance = initialBalance


        // const ctx = canvas.getContext("2d");
        // var gradient = ctx.createLinearGradient(0, 0, 0, 140);
        // gradient.addColorStop(0, theme.gradient(0.5));
        // gradient.addColorStop(0.5, theme.gradient(0.25));
        // gradient.addColorStop(1, theme.gradient(0));

        const chartData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: "transparent",
                    label: text.balance_variation,
                    lineTension: .4,
                    borderColor: theme.primary
                    
                }
            ]
        }
    
        const inputData = data.reverse()
    
        inputData.forEach(item => {
            chartData.labels.push(item.label)
            chartData.datasets[0].data.push(item.balance)
        })

        return chartData
        
    }


    const options = {
        type: 'line',
        tooltips: {
            mode: "x-axis"
        },
        legend: {
            display: false
         },
        elements: {
            point:{
                radius: 0
            }
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                },
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                ticks: {
                    precision: 0,
                    maxTicksLimit: 6,
                    display: false
                },
                afterUpdate: function(value){
                    let mustUpdate = false
                    value.ticksAsNumbers.forEach((tick, index) => {
                        if(tick !== yLabels[index]){
                            mustUpdate = true
                        }
                    })

                    if(mustUpdate){
                        setYlabels(value.ticksAsNumbers)
                    }
                },
                gridLines: {
                  drawBorder: false,
                },
            }]
        }
    }

    const getSelectOptions = () => {
        const res = []
        Object.keys(filters).forEach(period => {
            res.push({
                value: period,
                label: filters[period].label
            })
        })
        return res
    }


    return (
        <Container>
            <Header>
                <Title>{text.balance_variation}</Title>
                {/* <Select 
                    options={getSelectOptions()}
                    currentValue={period}
                    onChange={setPeriod}
                    customValueStyle={{
                        padding: "0 1rem"
                    }}
                /> */}
            </Header>
            <Body>
                <ScrollDrag>
                    {yLabels.length > 0 && (
                        <FixedYAxis>
                            {yLabels.map(label => (<FixedYAxisLabel key={label} length={yLabels.length}>{label}</FixedYAxisLabel>))}
                        </FixedYAxis>
                    )}
                    <ChartContainer>
                        <Line 
                            id="fuck"
                            data={generateData}
                            options={options}
                        />
                    </ChartContainer>
                </ScrollDrag>
            </Body>
        </Container>
     )
};

export default History;
