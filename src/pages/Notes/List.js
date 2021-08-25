import React, {useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch  } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from '@fortawesome/free-regular-svg-icons'
import * as actions from '../../store/actions'
import { generateId } from '../../functions'
import { getTimeStamp, formatDate } from '../../functions'


const Container = styled.div`
    // background: ${props => props.theme.background};
    border-right: 1px solid ${props => props.theme.line};
    height: calc(100vh - 6.5rem);
`


const Header = styled.div`
    height: 6.5rem;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HeaderTitle = styled.div`
    color: ${props => props.theme.dynamicText};
    font-size: 1.6rem;
`

const HeaderAddNote = styled.div`
    position: relative;
    cursor: pointer;
    svg {
        color: ${props => props.theme.dynamicTextLight};
        font-size: 2rem;
    }
    :hover {
        svg {
            color: ${props => props.theme.dynamicText};
        }
    }
`

const HeaderAddNoteIcon= styled.div`
    position: absolute;
    bottom: -24%;
    right: -32%;
    margin: auto;
    width: 1.5rem;
    height: 1.5rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadowLight};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1rem;
    }

`

const List = styled.div`
    padding: 1rem;
    height: calc(100% - 6.5rem);
    display: flex;
    flex-direction: column;
`



const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem 2.5rem;
    border-radius: .5rem;
    position: relative;
    cursor: pointer;
    height: 7.7rem;

    &:after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        margin: auto;
        height: 1px;
        background: ${props =>  props.theme.form.unfocused.border};
        width: calc(100% - 5rem);
    }

    :hover {
        background: ${props => props.theme.background};
        &:after {
            background: transparent;
        }
    }

    ${props => {
        if(props.isActive){
            return {
                background: props.theme.onSurface,
                "&:after": {
                    background: "transparent"
                }
            }
        }
    }}

    ${props => {
        if(props.isLast){
            return {
                "&:after": {
                    background: "transparent"
                }
            }
        }
    }}
`

const ListItemTitle = styled.div`
    font-size: 1.7rem;
    font-weight: 600;
    color: ${props => props.theme.text};
    line-height: 1.4;
`

const ListItemContent = styled.div`
    font-size: 1.4rem;
    margin-top: .7rem;
    display: flex;
    align-items: center;
`

const ListItemContentTimeStamp = styled.div`
    padding-right: 1rem;
    font-size: 1.3rem;
`

const ListItemContentText = styled.div`
    color: ${props => props.theme.textLight};

`

const Empty = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
`

const NotesFolderList = props => {


    const dispatch = useDispatch()

    const { current,  addNoteHandler, selectNoteHandler } = props

    const {
        settings: { locale },
        text: { text },
        notes: { opened, notesFolder }
    } = useSelector(state => state)

    const currentFolder = notesFolder[opened.folderId]
    const editedIsEmpty = current ? current.title === "" && current.content === "<p><br></p>" : true

    const getDescription = content => {
        const arr = content.replace(/<[^>]+>/g, '').split(/(\r\n|\n|\r)/gm)
        let description = arr[0]
        if(!description || description === "\n"){
            arr.forEach(item => {
                if(item !== "" && (!description || description === "\n")){
                    description = item
                }
            })
        }
        return description.replace("&nbsp;", " ")
    }

    const formatTimestamp = updatedAt => {
        const date = new Date(updatedAt)
        const day24 = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)

        if(date < day24){
            return formatDate(date, "hh:min", locale)

        }
        return "test"
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.notes}
                </HeaderTitle>
                <HeaderAddNote onClick={addNoteHandler}>
                    <FontAwesomeIcon icon={faFile}/>
                    <HeaderAddNoteIcon>
                        <FontAwesomeIcon icon="plus"/>
                    </HeaderAddNoteIcon>
                </HeaderAddNote>
            </Header>
            <List>
                {current && current.isTemporary && !current.isSavedInRedux && (
                    <ListItem isActive>
                        <ListItemTitle>
                            {current.title === "" ? text.title : current.title}
                        </ListItemTitle>
                        <ListItemContent>
                                <ListItemContentTimeStamp>
                                    {formatTimestamp(current.updatedAt, locale)}
                                </ListItemContentTimeStamp>
                            <ListItemContentText>
                                {current.content && getDescription(current.content)}
                            </ListItemContentText>
                        </ListItemContent>
                    </ListItem>
                )}
                {currentFolder && !currentFolder.notes && editedIsEmpty && (
                    <Empty>
                        {text.no_notes}
                    </Empty>   
                )}
                {currentFolder && currentFolder.notes &&
                    currentFolder.notes
                        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                        .map((note, index) => {
                    return (
                        <ListItem
                            isActive={opened.noteId === note.id}
                            isLast={index === currentFolder.notes.length -1}
                            onClick={() => selectNoteHandler(note)}
                        >
                            <ListItemTitle>
                                {note.title}
                            </ListItemTitle>
                            <ListItemContent>
                                <ListItemContentTimeStamp>
                                    {formatTimestamp(note.updatedAt, locale)}
                                </ListItemContentTimeStamp>
                                <ListItemContentText>
                                    {getDescription(note.content)}
                                </ListItemContentText>
                            </ListItemContent>
                        </ListItem>
                    )
                })}
            </List> 
        </Container>
     )
};

export default NotesFolderList;
