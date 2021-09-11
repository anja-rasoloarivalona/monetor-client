import React, { useState } from "react"
import styled from "styled-components"
import CardInput from "../CardInput"

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
    position: relative;
    ${({ config: { rowHeight, listWidth, margin}, theme, length, index }) => {
        return {
            width: `${listWidth}px`,
            height: `${(rowHeight * length) + (margin[1] * (length > 0 ? length - 1 : 0))}px`,
            background: theme.background,
            marginRight: `40px`
        }
    }}
`

const ListBackground = styled.div`
    background: ${({ theme }) => theme.secondarySurface};
    position: absolute;
    top: 0rem;
    left: 0;
    margin: auto;
    width: calc(100% + 2rem);
    height: calc(100% + 2rem);
    border-bottom-right-radius: .8rem;
    border-bottom-left-radius: .8rem;
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    z-index: 3;
`

const AddCard = styled.div`
    width: 100%;
    position: absolute;
    top: calc(100% - .5rem);
    left: 0;
    z-index: 1;
    padding: 0 1rem;
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: 0 1px 1px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 4%);
    padding-bottom: 1.5rem;
    border-bottom-right-radius: .8rem;
    border-bottom-left-radius: .8rem;
    input {
       height: 3.8rem;
    }
`

const TodoBackgroundList = props => {
    const { layout, config, todoLists,submitCardHandler,isAddingCard, setIsAddingCard } = props

    const data = []
    for(let i = 0; i < todoLists.length; i++){
        data.push(0)
    }

    layout.forEach(item => {
        data[item.x] += item.h
    })

    return (
        <Container>
            {data.map((length, listIndex) => {
                let activeTodos = 0
                todoLists[listIndex].todos.forEach(todo => {
                    if(!todo.archivedAt){
                        activeTodos += 1
                    }
                })
                const isEmpty = activeTodos === 0
                return (
                    <List
                        key={listIndex}
                        config={config}
                        length={length}
                        index={listIndex}
                    >
                        <ListBackground>
                            {isAddingCard === todoLists[listIndex].id && !isEmpty && (
                                <AddCard>
                                    <CardInput 
                                        submitCardHandler={submitCardHandler}
                                        setIsAddingCard={setIsAddingCard}
                                    />
                                </AddCard>
                            )}
                        </ListBackground>
                    </List>
                )
            })}
        </Container>
     )
};

export default TodoBackgroundList;
