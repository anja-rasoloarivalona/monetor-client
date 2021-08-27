import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { ResizableBox } from 'react-resizable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowSize } from '../../hooks'
import Header from './NotesHeader'
import Body from './NotesBody'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.surface};
`

const Notes = props => {

    const { disabled } = props


    const dispatch = useDispatch()

    const { windowHeight, windowWidth } = useWindowSize()

    const {
        text: { text },
        theme,
        notes: { notes, open }
    } = useSelector(state => state)

    const [ height, setHeight ] = useState(null)
    const [ search, setSearch ] = useState("")
    const [ isAdding, setIsAdding ] = useState(false)
    const [ sort, setSort ] = useState("descendant")


    const style = {
        position: "fixed",
        zIndex: 998,
        left: 0,
        right: 0,
        margin: "auto",
        boxShadow: theme.boxShadow,
        display: "flex",
        flexDirection: "column",
        maxHeight: "60rem",
        borderRadius: ".6rem",
        background: theme.onSurface,
        height: "max-content",
        width: "60rem",
    }


    useEffect(() => {
        if(notes && notes.length === 0){
            setIsAdding(true)
        }
    },[])


    return null


    if(disabled){
        if(!open){
            return (
                <Container>
                    <Header 
                        search={search}
                        setSearch={setSearch}
                        setIsAdding={setIsAdding}
                        setSort={setSort}
                    />
                    <Body 
                        search={search}
                        isAdding={isAdding}
                        setIsAdding={setIsAdding}
                        sort={sort}
                    />
                </Container>  
            )
        }
        return null
    }

    return (
        <Draggable handle={".notes-header"}>
            <ResizableBox
                style={style}
                width={600}
                height={600}
                minConstraints={[400, 400]}
                maxConstraints={[windowWidth * .9, windowHeight * .9]}
            >
                <Container>
                    <Header 
                        search={search}
                        setSearch={setSearch}
                        setIsAdding={setIsAdding}
                        setSort={setSort}
                    />
                    <Body 
                        search={search}
                        isAdding={isAdding}
                        setIsAdding={setIsAdding}
                        sort={sort}
                    />
                </Container>

            </ResizableBox>
        </Draggable>
    
     )
};

export default Notes;
