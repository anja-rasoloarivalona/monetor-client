import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import AddComponent from "./AddComponent"
import { Select } from '../../../components/Form/WithoutValidation'


const Container = styled.div`
    width: 24rem;
    height: 100%;
    padding: 2rem;
    padding-top: 7rem;
    background: ${props => props.theme.background};
    position: absolute;
    top: 0;
    right: 0;
`

const ListName = styled.div`
    width: 20rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    .icon {
        color: ${({ theme }) => theme.textLight};
    }

    > div {
        width: 100%;
    }

    > div > div:first-child {
        border: none;
        height: 3.7rem;
        :hover {
            background: ${({ theme }) => theme.onSurface};
        }
    }
`

const Title = styled.div`
    font-size: 1.6rem;
    margin-bottom: 1rem;
`

const Sidebar = props => {
    const {
        text: { text },
        todos: { todoBoards, activeBoardId }
    } = useSelector(state => state)


    const listOptions = []
    Object.values(todoBoards[activeBoardId].todoLists).forEach(list => {
        listOptions.push({
            label: list.title,
            value: list.id
        })
    })


    return (
        <Container>
            <ListName>
                <Title>{text.in_list}</Title>
                <Select
                    currentValue={props.list}
                    options={listOptions}
                    onChange={props.setList}
                />
            </ListName>
            <AddComponent {...props} />
        </Container>
     )
};

export default Sidebar;
