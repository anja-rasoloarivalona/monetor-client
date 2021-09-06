import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { formatDate } from '../../../../functions'
import { Title } from './style'
import { Bar } from 'react-chartjs-2'
import { ScrollDrag,ScrollHorizontalBar } from '../../../../components'
import moment from "moment"

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 2rem;

    > div:last-child {
        width: 50%;
        display: flex;
        justify-content: flex-end;
    }
`



const ChartContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`


const Body = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const FixedYAxis = styled.div`
    position: absolute;
    left: 0rem;
    top: 0rem;
    margin: auto;
    height: calc(100% - 4.2rem);
    width: 3.5rem;
    padding-right: .5rem;
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
        width: 2rem;
        height: 2rem;
        background: white;
    }
`

const FixedYAxisLabel = styled.div`
    font-size: 1.2rem;
`


const Overview = () => {

    const {
      text: { text },
      settings: { locale },
      user: { transactions, wallets },
      theme,
      categories,
      finance: { filters }
    } = useSelector(state => state)

    const [ yLabels, setYlabels] = useState([])

    const getPeriod = date => {
      return moment(new Date(date)).format("MM-YYYY")
    }

    const generateData = () => {

      const months = {}
      transactions.forEach(transaction => {
        const period = getPeriod(transaction.date)
        if(!months[period]){
            months[period] = {
              income: transaction.type === "income" ? transaction.amount : 0,
              expense: transaction.type === "expense" ? transaction.amount : 0
            }
        } else {
          months[period][transaction.type] =   months[period][transaction.type] + transaction.amount
        }
      })

      const chartData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: "grey",
            label: text.expense
          },
          {
            data: [],
            backgroundColor: categories.income.color,
            label: text.income
          }
        ]
      }

      Object.keys(months)
            .sort((a, b) => new Date(moment(a, "MM-YYYY") - new Date(moment(b, "MM-YYYY")) ))
            .forEach(period => {
                chartData.labels.push(period)
                chartData.datasets[0].data.push(months[period].expense)
                chartData.datasets[1].data.push(months[period].income)
            })

      return chartData
    }

    const options = {
      type: "bar",
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 6,
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
          },
      }]
      }
    }
    
  
    return (
        <Container>
          <Header>
              <Title>Vf</Title>
          </Header>
          <Body>
            <ScrollDrag>
              {yLabels.length > 0 && (
                    <FixedYAxis>
                        {yLabels.map(label => (<FixedYAxisLabel key={label} length={yLabels.length}>{label}</FixedYAxisLabel>))}
                    </FixedYAxis>
                )}
              <ChartContainer>
                    <Bar 
                      data={generateData}
                      options={options}
                    />
              </ChartContainer>
            </ScrollDrag>

          </Body>
        </Container>
     )
};

export default Overview;
