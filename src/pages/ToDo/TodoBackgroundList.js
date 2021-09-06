import React from "react"
import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
`

const List = styled.div`
    background: red;
    ${({ config: { rowHeight, listWidth, margin}, theme, length, index }) => {
        return {
            width: `${listWidth}px`,
            height: `${(rowHeight * length) + (margin[1] * (length))}px`,
            background: theme.background,
            transform:  "translateX(15px)",
            marginLeft: `${margin[0] / 2}px`,
            marginRight: `${margin[0] / 2}px`
        }
    }}
`

const ListBackground = styled.div`
    background: ${({ theme }) => theme.secondarySurface};
    position: absolute;
    top: 0rem;
    left: -1rem;
    margin: auto;
    width: calc(100% + 2rem);
    height: calc(100% + 2rem);
    border-radius: .5rem;
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
`


const TodoBackgroundList = props => {
    const { layout, config } = props
    const data = []
    layout.forEach(item => {
        if(data[item.x]){
            data[item.x] += item.h
        } else {
            data[item.x] = item.h
        }
    })
    return (
        <Container>
            {data.map((length, listIndex) => (
                <List
                    key={listIndex}
                    config={config}
                    length={length}
                    index={listIndex}
                >
                    <ListBackground />
                </List>
            ))}
        </Container>
     )
};

export default TodoBackgroundList;
