import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { layout as defaultLayout } from './defaultLayout.json'
import { useWindowSize } from '../../hooks'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import GridLayout from 'react-grid-layout'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import Overview from './items/Overview'


const Container = styled.div`
    width: 100%;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    background: ${props => props.theme.surface};
    border-radius: 1.5rem;
    box-shadow: ${props => props.theme.boxShadow};

    .react-resizable-handle.react-resizable-handle-se {
        bottom: 1rem !important;
        right: 1rem !important;
    }
`

const Dashboard = () => {

    const dispatch = useDispatch()
    const { windowWidth } = useWindowSize()

    const { 
        finance: { dashboard: { breakpoints, layout: userLayout } }
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
                setLayout(defaultLayout[config.breakpoint])
            }
        }
    },[config])

    useEffect(() => {
        console.log({
            layout
        })
    },[layout])


    const components = {
        "overview": Overview
    }


    if(!config || !layout){
        return <div></div>
    }


    const renderItem = item => {
        const Component = item.Component ? item.Component : components[item.i]
        return (
            <GridItem
              key={item.i}
              style={{zIndex: item.i === "expenses" ? 5 : 1}}
          >
                <Component />
            </GridItem>
        )
    }

    return (
        <Container>
            <GridContainer>
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={config.cols}
                    rowHeight={34}
                    width={windowWidth - 250}
                    margin={[15, 15]}
                    isDraggable={true}
                    isResizable={true}
                >
                    {layout.filter(i => i.display === true).map(renderItem)}
                </GridLayout>
            </GridContainer>
        </Container>
     )
};

export default Dashboard;
