/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { getHoursDate, getInRangeTodoLists } from '../../../Calendar/functions'
import { useSelector } from 'react-redux'
import { useWindowSize } from '../../../../hooks'
import GridLayout from 'react-grid-layout'
import "../../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../../node_modules/react-resizable/css/styles.css"
import ViewItem from './ViewItem'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
    position: relative;
`

const Columns = styled.div`
    width: 100%;
    height: 100%;
`

const Item = styled.div`
    width: 100%;
    height: 4.6rem;
    position: relative;
    border-bottom: 1px solid ${props => props.theme.background};
    :before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 1px;
        background: ${props => props.theme.background};
    }
`

const GriContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: blue;

    .layout {
        // min-height: 100%;
        // max-height: 100%;
        width: 100%;
        background: red;
    }
`
const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    padding: .2rem;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .2rem;

    .react-resizable-handle.react-resizable-handle-se {
        bottom: .2rem !important;
        right: .2rem !important;
    }
`



const View = props => {

    const { current } = props

    const [ layout, setLayout ] = useState(null)

   const container = useRef()

    const {
        user: { todoLists },
        settings: { unitType }
    } = useSelector(state => state)

    useEffect(() => {
        const _layout = getInRangeTodoLists(todoLists, current, unitType)
        console.log({
            _layout
        })
        setLayout(_layout)
    },[todoLists, current])




    const renderDayColumn = () => {
        return getHoursDate(unitType).map((h, index) =>  <Item key={index} />)
    }

    if(!layout){
        return null
    }

    return (
        <Container ref={container}>
            <Columns>
                {renderDayColumn()}
            </Columns>
            <GriContainer>
                {container.current && (
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={2}
                        rows={48}
                        rowHeight={23}
                        width={container.current.clientWidth}
                        isDraggable={true}
                        isResizable={true}
                        margin={[0, 0]}
                        compactType={null}
                    >
                        {layout.map(item => (
                            <GridItem key={item.i}>
                                <ViewItem item={item} />
                            </GridItem>
                        ))}
                    </GridLayout>
                    )}

            </GriContainer>
        </Container>
     )
};

export default View;
