import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { layout as defaultLayout } from './defaultLayout.json'
import { useWindowSize } from '../../hooks'
import { useSelector } from 'react-redux'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import Weather from "./items/Weather/Weather"
import AppSelector from "./items/AppSelector/AppSelector"
import Calendar from "./items/Calendar/Calendar"
import Balance from './items/Balance'
import MonthlyReport from './items/MonthlyReport'
import LastTransactions from "./items/LastTransactions"

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 6.5rem);
    background: green;
    display: flex;
    background: ${props => props.theme.background};
    position: relative;
    z-index: 2;
    overflow-x: hidden;
`

const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    .layout {
        width: 100%;
    }
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${props => {
        if(props.id !== "calendar"){
            console.log({
                props
            })
            return {
                padding: "2rem",
                boxShadow: props.theme.boxShadowLight,
                borderRadius: "1rem",
                background: props.theme.surface
            }
        }
    }}

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }
`

const Home = () => {




    const { windowWidth } = useWindowSize()

    const { 
        home: { dashboard: { breakpoints, layout: userLayout } },
    } = useSelector(state => state)

    const [layout, setLayout] = useState(null)
    const [config, setConfig] = useState(null)

    useEffect(() => {
        Object.keys(breakpoints).forEach(size => {
            if(windowWidth >= breakpoints[size].min && windowWidth <= breakpoints[size].max){
                setConfig({
                    breakpoint: size,
                    ...breakpoints[size]
                })
                return 
            }
        })
    }, [windowWidth])

    useEffect(() => {
        if(config){
            if(userLayout && userLayout[config.breakpoint]){

            } else {
                const initialLayout = defaultLayout[config.breakpoint]
                setLayout(initialLayout)
            }
        }
    },[config])

    
    const components = {
        "weather": Weather,
        "appSelector": AppSelector,
        "calendar": Calendar,
        "balance": Balance,
        "monthly_report": MonthlyReport,
        "last_transactions": LastTransactions
    }


    if(!config || !layout){
        return <div></div>
    }

    const renderItem = item => {
        const Component = item.Component ? item.Component : components[item.i]
        return (
            <GridItem
                key={item.i}
                id={item.i}
            >
                <Component item={item} />
            </GridItem>
        )
    }

    const stopHandler = updated => {
        const updatedLayout = []
        updated.forEach(item => {
            const prev = layout.find(i => i.i === item.i)
            updatedLayout.push({
                ...item,
                display: prev.display
            })
        })
        setLayout(updatedLayout)
    }

    return (
        <Container>
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={config.cols}
                    rowHeight={34}
                    width={windowWidth}
                    margin={[15, 15]}
                    isDraggable={true}
                    isResizable={true}
                    onDragStop={stopHandler}
                    onResizeStop={stopHandler}
                >
                    {layout.filter(i => i.display === true).map(renderItem)}
                </GridLayout>
            </GridContainer>
        </Container>
     )
};

export default Home;
