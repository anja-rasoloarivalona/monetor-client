/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { layout as defaultLayout } from './defaultLayout.json'
import { useWindowSize } from '../../hooks'
import { useSelector } from 'react-redux'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import Header from './Header/Header'
import Weather from "./items/Weather/Weather"
import AppSelector from "./items/AppSelector/AppSelector"
import Calendar from "./items/Calendar/Calendar"
import Balance from '../Transactions/Dashboard/items/Balance'
import LastTransactions from '../Transactions/Dashboard/items/Transactions'
import MonthlyReport from '../Transactions/Dashboard/items/MonthlyReport'
import Notes from '../../elements/Notes/Notes'
import {ScrollBar } from '../../components'
import axios from 'axios'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    overflow-x: hidden;
    height: calc(100vh - 6.5rem);
    background: ${props => props.theme.background};
`

const GridContainer = styled(ScrollBar)`
    flex: 1;
    height: calc(100vh - 12.5rem);
    display: flex;
    .layout {
        width: 100%;
    }
`

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    ${props => {
        if(props.id !== "calendar"){
            return {
                padding: "2rem",
                boxShadow: props.theme.boxShadowLight,
                borderRadius: "1rem",
                background: props.theme.surface
            }
        }
    }}

    ${props => {
        if(props.id === "notes"){
            return {
                padding: "1rem"
            }
        }
    }}

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }

    ${props => {
        if(props.isManagingDashboard){
            return {
                '.react-resizable-handle.react-resizable-handle-se': {
                    zIndex: 11
                }
            }
        }
    }}
`

const GridItemLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: move;
`

const Home = () => {

    const { windowWidth } = useWindowSize()

    const {
        dashboards: {
            breakpoints,
            home: {
                layout: userLayout
            }
        },
        notes
    } = useSelector(state => state)

    const [ layout, setLayout ] = useState(null)
    const [ originalLayout, setOriginalLayout ] = useState(null)

    const [ config, setConfig ] = useState(null)
    const [ isManagingDashboard, setIsManaginDashboard ] = useState(false)
    const [ isSavingDashboardChanges, setIsSavingDashboardboardChanges ] = useState(false)

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

    useEffect(() => {
        if(config && layout){
            setLayout(prev => {
                const updated = prev.map(item => ({
                    ...item,
                    display: item.i === 'notes' ? !notes.open : item.display
                }))
                return updated
            })
        }
    },[notes.open])


    useEffect(() => {
        if(isManagingDashboard){
            setOriginalLayout(layout)
        }
    },[isManagingDashboard])

    
    const components = {
        "weather": Weather,
        "appSelector": AppSelector,
        "calendar": Calendar,
        "balance": Balance,
        "monthly_report": MonthlyReport,
        "last_transactions": LastTransactions,
        "notes": () => <Notes disabled={true} />
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
                isManagingDashboard={isManagingDashboard}
            >
                {isManagingDashboard && <GridItemLayer />}
                <Component item={item} />
            </GridItem>
        )
    }

    const stopHandler = updated => {
        console.log({
            updated
        })
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

    const cancelDashboardChangesHandler = () => {
        setLayout(originalLayout)
        setIsManaginDashboard(false)
    }

    const saveDashboardChangesHandler = async () => {
        try {
            setIsSavingDashboardboardChanges(true)
            const data = {
                dashboardType: "main",
                items: layout.map(item => ({
                    ...item,
                    name: item.i,
                    breakpoint: config.breakpoint
                }))
            }
            const res = await axios.post('/dashboard-layout', data)
            if(res.status === 200){
                setIsManaginDashboard(false)
                setIsSavingDashboardboardChanges(false)
            }
        } catch(err){
            console.log({
                err
            })
        }
    }

    return (
        <Container>
            <Header 
                setIsManaginDashboard={setIsManaginDashboard}
                cancelDashboardChangesHandler={cancelDashboardChangesHandler}
                saveDashboardChangesHandler={saveDashboardChangesHandler}
                isManagingDashboard={isManagingDashboard}
                isSavingDashboardChanges={isSavingDashboardChanges}
            />
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={config.cols}
                    rowHeight={34}
                    width={windowWidth}
                    margin={[15, 15]}
                    isDraggable={isManagingDashboard}
                    isResizable={isManagingDashboard}
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
