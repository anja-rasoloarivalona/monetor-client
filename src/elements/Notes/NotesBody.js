import React, { useState } from "react"
import styled from "styled-components"
import NoteInput from './NoteInput'
import { useSelector } from 'react-redux'
import { ScrollBar } from '../../components'
import { getTimeStamp } from '../../functions'

const Container = styled(ScrollBar)`
    height: 100%;
    max-height: calc(100% - 14rem);
    width: 100%;
    padding: 0 1rem;
    margin: 1rem 0;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    ::-webkit-scrollbar {
        display: none;
    }
`

const NoteItem = styled.div`
    width: 100%;
    padding: 2rem 1rem;
    background: #ffdee4;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    border-radius: .5rem;
    position: relative;
    cursor: pointer;
`

const NoteItemContent = styled.div``

const NoteItemTimestamp = styled.div`
    position: absolute;
    top: 1rem;
    right: .5rem;
    z-index: 2;
    color: ${props => props.theme.textLight};
    font-size: 1.1rem;
`

const NotesBody = props => {

    const { search, isAdding, setIsAdding, sort } = props


    const [ edited, setEdited ] = useState(null)

    const {
        notes: { notes },
        settings: { locale }
    } =  useSelector(state => state)

    const getData = () => {
        if(sort === "descendant"){
            return notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        }
        return notes.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
    }

    return (
        <Container>
            {isAdding && (
                <NoteInput 
                    setIsAdding={setIsAdding}
                />
            )}
            {getData().map(note => {
                if(edited && edited.id === note.id){
                    return (
                        <NoteInput 
                            setEdited={setEdited}
                            edited={edited}
                        />
                    )
                }
                return (
                    <NoteItem
                        key={note.id}
                        onClick={() => setEdited(note)}
                    >
                        <NoteItemContent dangerouslySetInnerHTML={{__html: note.content}}/>
                        <NoteItemTimestamp>
                            {getTimeStamp(note.updatedAt, locale)}
                        </NoteItemTimestamp>
                    </NoteItem>
    
                )
            })}
        </Container>
     )
};

export default NotesBody;
