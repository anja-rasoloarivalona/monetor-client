import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListItemLabelText } from "../Todo/TodoForm/CheckListStyle"
import { faFolder, faFolderOpen  } from '@fortawesome/free-regular-svg-icons'
import { Input } from '../../components/Form/WithoutValidation'
import { useKeyboardEvent } from '../../hooks'
import * as actions from '../../store/actions'
import { generateId  } from '../../functions'

const Container = styled.div`
    // background: ${props => props.theme.tSurface(.5)};
    background: ${props => props.theme.onSurface};
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

const HeaderAddFolder = styled.div`
    position: relative;
    cursor: pointer;
    svg {
        color: ${props => props.theme.dynamicTextLight};
        &.folder {
            font-size: 2rem;
        }
    }
    :hover {
        svg {
            color: ${props => props.theme.dynamicText};
        }
    }
`
const HeaderAddFolderAddIcon = styled.div`
    position: absolute;
    bottom: -24%;
    right: -32%;
    margin: auto;
    width: 1.5rem;
    height: 1.5rem;
    background: ${props => props.theme.offWhite};
    box-shadow: ${props => props.theme.boxShadowLight};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

`

const List = styled.div`
    padding: 1rem;
`

const ListItem = styled.div`
    height: 3.5rem;
    margin-bottom: .5rem;
`

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    height: 3.5rem;
`


const ListItemLabel = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: ${props => props.theme.dynamicText};
    cursor: pointer;
    border-radius: .4rem;
    padding: 0 1rem;

    ${props => {
        if(!props.isInput){
            return {
                ":hover": {
                    background: props.theme.tSurface(.3),
                }
            }
        }
    }}

    ${props => {
        if(props.isOpened){
            return {
                background: props.theme.secondarySurface,
                ":hover": {
                    background: props.theme.secondarySurface,
                }
            }
        }
    }}

    input {
        border: none !important;
        background: transparent !important;
        padding-left: 0;
        font-size: 1.4rem;
    }
`

const ListItemLabelIcon = styled.div`
    margin-right: 1rem;
    font-size: 1.6rem;
`
const ListItemLabelIconText = styled.div``



const Sidebar = props => {

    const dispatch = useDispatch()

    const { isAddingNewFolder,setIsAddingNewFolder, addFolderHandler } = props

    const {
        text: { text },
        notes: { notesFolder, opened }
    } = useSelector(state => state)

    const [ folderTitle, setFolderTitle ] = useState(text.new_folder)
    const [ isFocused, setIsFocused ] = useState(false)

    const submitFolderHandler = () => {
        let numberOfFolderUsingTitle = 0
        Object.values(notesFolder).forEach(folder => {
            if(folder.title === folderTitle){
                numberOfFolderUsingTitle++
            }
        })
        const newFolder = {
            title: numberOfFolderUsingTitle ? `${folderTitle} (${numberOfFolderUsingTitle})` : folderTitle,
            index: Object.keys(notesFolder).length,
            id: `temp-${generateId()}`,
            isTemporary: true,
            type: "folder",
            notes: []
        }
        dispatch(actions.addNoteFolder(newFolder))
        setIsFocused(false)
        setFolderTitle(text.new_folder)
        setIsAddingNewFolder(false)
    }


    const onFocusHandler = e => {
        setIsFocused(true)
        if(folderTitle === text.new_folder){
            e.target.select()
        }
    }

    const onBlurHandler = () => {
        setIsFocused(false)
        submitFolderHandler()
    }

    useKeyboardEvent("Enter", () => {
        if(isFocused){
            submitFolderHandler()
        }
    })

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    {text.notes}
                </HeaderTitle>
                <HeaderAddFolder>
                    <FontAwesomeIcon icon={faFolder} className="folder"/>
                    <HeaderAddFolderAddIcon onClick={addFolderHandler}>
                        <FontAwesomeIcon icon="plus" className="add"/>
                    </HeaderAddFolderAddIcon>
                </HeaderAddFolder>
            </Header>
            <List>
                {Object.values(notesFolder).map(folder => {
                    const isOpened = opened.folderId === folder.id
                    return (
                        <ListItem key={folder.id} >
                            <ListItemLabel onClick={() => dispatch(actions.toggleNotes({ type: "folder", id: folder.id}))} isOpened={isOpened}>
                                <ListItemLabelIcon>
                                    <FontAwesomeIcon icon={isOpened ? faFolderOpen : faFolder } />
                                </ListItemLabelIcon>
                                <ListItemLabelText>
                                    {folder.title}
                                </ListItemLabelText>
                            </ListItemLabel>
                        </ListItem>
                    )
                })}
                {isAddingNewFolder && (
                    <AddContainer>
                        <ListItemLabel isInput>
                            <ListItemLabelIcon>
                                <FontAwesomeIcon icon={faFolder } />
                            </ListItemLabelIcon>
                            <Input 
                                value={folderTitle}
                                onChange={setFolderTitle}
                                onFocus={e => onFocusHandler(e)}
                                onBlur={onBlurHandler}
                                focusOnMount
                            />

                        </ListItemLabel>
                    </AddContainer>
                 )}
            </List>
        </Container>
     )
};

export default Sidebar;
