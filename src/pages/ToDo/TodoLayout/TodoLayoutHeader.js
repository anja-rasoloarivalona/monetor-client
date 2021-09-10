import React from "react"
import styled from "styled-components"
import AppIcon from '../../../icons'
import CardInput from "../CardInput"
import AddList from '../AddList'

const Container = styled.div`
    display: flex;
    padding-left: 2rem;
`

const Content = styled.div`
    border-top-right-radius: .8rem;
    border-top-left-radius: .8rem;
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    width: ${({ config: { listWidth }}) => `${listWidth + 20}px`};
    min-height: 5rem;
    margin-right: 1rem;
    position: relative;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 5rem;
`

const Title = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: ${props => props.theme.text};
`

const TitleCta = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 1.2rem;
    cursor: pointer;
    color: ${({theme}) => theme.dynamicTextLight};
    :hover {
        color: ${({theme}) =>theme.dynamicText}
    }
`

const TitleCtaItem = styled.div`
    position: relative;

`

const TitleCtaItemIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: .5rem;
    svg {
        width: 2rem;
        height: 2rem;
        fill: ${({ theme }) => theme.textLight};
    };
    :hover {
        background: ${({ theme }) => theme.onSurface};
        svg {
            fill: ${({ theme }) => theme.text};
        }
    }

    &.small svg {
        width: 1.5rem;
        height: 1.5rem;
    }  

    ${({ isActive, theme }) => {
        if(isActive){
            return {
                background: theme.onSurface,
                svg: {
                    fill: theme.text
                }
            }
        }
}}   
`

const AddCard = styled.div`
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    padding: 0 1rem;
    background: ${({ theme }) => theme.secondarySurface};
    box-shadow: ${({ theme }) => theme.boxShadowExtraLight};
    padding-bottom: 1.5rem;
    border-bottom-right-radius: .8rem;
    border-bottom-left-radius: .8rem;
    height: 5.8rem;
    input {
       height: 3.8rem;
    }
`

const AddCardPlaceholer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.8rem;
    background: ${({ theme }) => theme.background};
    cursor: pointer;
    svg {
        width: 2rem;
        height: 2rem;
    }
`


const TodoLayoutHeader = props => {
    const { todoLists, config, submitCardHandler, isAddingCard, setIsAddingCard,setTodoLists } = props
    return (
        <Container>
            {todoLists.map(list => {
                const isEmpty = !list.todos || list.todos.length === 0
                return (
                    <Content key={list.id} config={config}>
                        <TitleContainer>
                            <Title>{list.title}</Title>
                            <TitleCta>
                                {!isEmpty && (
                                    <TitleCtaItem onClick={() => setIsAddingCard(list.id)}>
                                        <TitleCtaItemIcon>
                                            <AppIcon id="plus"/>
                                        </TitleCtaItemIcon>
                                    </TitleCtaItem>
                                )}
                                <TitleCtaItem>
                                    <TitleCtaItemIcon>
                                        <AppIcon id="ellipsis-h"/>
                                    </TitleCtaItemIcon>
                                </TitleCtaItem>
                            </TitleCta>
                        </TitleContainer>
                        {isEmpty && (
                            <AddCard>
                                {isAddingCard === list.id ?
                                    <CardInput 
                                        submitCardHandler={submitCardHandler}
                                        setIsAddingCard={setIsAddingCard}
                                    /> :
                                    <AddCardPlaceholer onClick={() => setIsAddingCard(list.id)}>
                                        <AppIcon id="plus"/>
                                    </AddCardPlaceholer>                               
                                }
                            </AddCard>
                        )}
                    </Content>
                )
            })}
            <AddList 
                todoLists={todoLists}
                setTodoLists={setTodoLists}
            />          
        </Container>
    )
};

export default TodoLayoutHeader;
