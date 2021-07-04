import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import List from './List'


const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 8rem);
    padding: 2rem;
    color: ${props => props.theme.text};
`

const Header = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.textActive};
`

const HeaderTitle = styled.div``

const Content = styled.div`
    width: 100%;
    display: flex;

    > div {
        margin-right: 2rem;
    }
`



const ToDo = () => {

    const { 
        text: { text }
    } = useSelector(state => state)


    const initialList = [
        {
            id: "To Do",
            title: "To Do"
        },
        {
            id: "Doing",
            title: "Doing"
        },
        {
            id: "Done",
            title: "Done"
        },
    ]

    const initialToDos = [
        {
            id: "123(D)AWOD",
            title: "Groceries",
            message: "Yo",
            parentId: "To Do",
            index: 0,
            color: "blue"
        },
        {
            id: "456DQWLK",
            title: "LOl",
            message: "Comone",
            parentId: "To Do",
            index: 1,
            color: "red"
        },
        {
            id: "456DQWLKA",
            title: "KOC",
            message: "Comone",
            parentId: "To Do",
            index: 2,
            color: "purple"
        },
    ]



    const [listData, setListData] = useState(initialList)
    const [toDos, setToDos] = useState(initialToDos)


    const updateToDosIndex = data => {
        const updatedTodos = []
        const splitedToDo = {}
        data.forEach(i => {
            updatedTodos.push(i)
            if(splitedToDo[i.parentId]){
                splitedToDo[i.parentId].push(i)
            } else {
                splitedToDo[i.parentId] = [i]
            }
        })
        Object.keys(splitedToDo).forEach(key => {
            splitedToDo[key].forEach((i, newIndex) => {
                const foundIndex = updatedTodos.findIndex(a => a.id === i.id)
                updatedTodos[foundIndex].index = newIndex
            })
        })
        return updatedTodos
    }


    const moveCardBetweenList = (movedToDo, list) => {
        const updatedTodos = []
        toDos.forEach(toDo => {
            const updatedToDo = {
                ...toDo,
                parentId: movedToDo.id === toDo.id ? list.id : toDo.parentId
            }
            updatedTodos.push(updatedToDo)
        })
        const formatted = updateToDosIndex(updatedTodos)
        setToDos(formatted)
    }
    
    useEffect(() => {
        console.log({
            toDos
        })
    },[toDos])


    // return <Test />

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.to_do_title}
                </HeaderTitle>
            </Header>

            
             <Content>
                {listData.map(list =>  {
                    const listToDos = []
                    toDos.forEach( toDo => {
                        if(toDo && toDo.parentId === list.id){
                            listToDos.push(toDo)
                        }
                    })
                    return (
                        <List
                            key={list.id}
                            moveCardBetweenList={(toDo) => moveCardBetweenList(toDo, list )}
                            listToDos={listToDos}
                            toDos={toDos}
                            setToDos={setToDos}
                            updateToDosIndex={updateToDosIndex}
                        />
                    )
                })}
            </Content>
        </Container>
     )
};

export default ToDo;
