import React, { useRef } from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: ${props => `${props.config.itemHeight}px`};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2rem;
    // scroll-snap-align: start;
    opacity: ${props => props.isScrollInitialized ? 1 : 0};

`

const Content = styled.div`
    background: ${props => props.theme.form.unfocused.border};
    width: 100%;
    height: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: 1rem 1fr;
    grid-template-rows: 1rem 1fr;
    transition: all .3s ease-in;
    border-radius: .2rem;
    cursor: pointer;
     
    ${props => {
        if(props.isCurrent){
            return {
                background: props.theme.background
            }
        }
    }}
`


const Number = styled.div`

`

const DayComponent = props => {

    const { item, config, current,isScrollInitialized } = props

    const ref = useRef()

    if(item.id === "01-01-2021"){
        const test = new Date(item.date).getDate()
        console.log({
            test,
            isScrollInitialized
        })
    }

    return (
        <Container
            id={item.id}
            className={item.id}
            ref={ref}
            config={config}
            isScrollInitialized={isScrollInitialized}
        >
            <Content isCurrent={item.period === current.period}>
                <Number>
                    {new Date(item.date).getDate()}
                </Number>
            </Content>
        </Container>
     )
};

export default DayComponent;
