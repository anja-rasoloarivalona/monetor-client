import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { useOnClickOutside, useKeyboardEvent } from '../../../../hooks'
import { TextEditor } from '../../../../components/Form/WithoutValidation'
import { generateId } from '../../../../functions'
import * as actions from '../../../../store/actions'
import moment from 'moment'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    min-height: 19rem;
    z-index: 99;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    display: flex;
    flex-direction: column;
    cursor: auto;

    .textinput {
        padding: 0rem 1rem;
        height: 100%;
        font-size: 1.2rem;
        line-height: 1.4;
    }
`

const Title = styled.input`
    line-height: 1.4;
    font-weight: 600;
    max-height: 4rem;
    padding: 1rem;
    flex: 1;
    border: none;
    line-height: 1.4;
    width: 100%;
    font-size: 1.5rem;

    :focus {
        outline: none;
    }
`

const CloseIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 2;
`


const SelectProject = styled.div`
    position: absolute;
    left: calc(100% + 1rem);
    top: 0rem;
    z-index: 2;
    min-width: 20rem;
`

const SelectProjectItem = styled.div`
    background: ${({ theme}) => theme.surface};
    margin-bottom: .8rem;
    border-radius: .5rem;
    width: 100%;
    box-shadow: ${({ theme }) => theme.boxShadowLight};
    cursor: pointer;
    :hover {
        box-shadow: ${({ theme }) => theme.boxShadow};
    }
`
const SelectProjectItemLabel = styled.div`
    font-size: 1.6rem;
    padding: 1rem 1rem;
    color: ${({ theme }) => theme.text};
    ${({ theme, active}) => {
        if(active){
            return {
                fontWeight: 600,
            }
        }
    }}
`

const SelectProjectList = styled.div`
    padding: 1rem 1.5rem;
    padding-top: 0rem;
    div:not(:last-child){
        margin-bottom: .5rem;
    }
`

const SelectProjectListItem = styled.div`
    padding: 1rem;
    font-size: 1.4rem;
    border-radius: .5rem;
    :hover {
        background: ${({ theme }) => theme.background};
    }

    ${({ active, theme}) => {
        if(active){
            return {
                background: theme.onSurface,
                ":hover": {
                    background: theme.onSurface,
                }
            }
        }
    }}
`

const WeekDayInput = props => {

    const dispatch = useDispatch()

    const { closeHandler, hour, date } = props

    const inputRef = useRef()
    const descriptionRef= useRef()
    const containerRef = useRef()

    const {
        text: { text },
        todos: { todoBoards, activeBoardId }
    } = useSelector(state => state)


    const currentBoard = todoBoards[activeBoardId]

    const [ title, setTitle ] = useState("")
    const [ titleIsFocused, setTitleIsFocused ] = useState(false)
    const [ description, setDescription ] = useState(null)
    const [ descriptionIsFocused, setDescriptionIsFocused ] = useState(false)

    const [ selectedBoardId, setSelectedBoardId ] = useState(activeBoardId)
    const [ selectedListId, setSelectedListId ] = useState(Object.keys(currentBoard.todoLists)[0])
    const [ isMounted, setIsMounted ] = useState(false)



    useEffect(() => {
        inputRef.current.focus()
        setIsMounted(true)
    },[])

    useEffect(() => {
        if(descriptionIsFocused && title === ""){
            inputRef.current.focus()
        }
    },[descriptionIsFocused])


    useOnClickOutside(containerRef, () => {
        if(isMounted){
            closeHandler()
        }
    })

    useKeyboardEvent("Enter", () => {
        if(titleIsFocused && title !== ""){
            descriptionRef.current.focusEditor()
        }
    })

    const selectBoardHandler = boardId => {
        const listId = Object.keys(todoBoards[boardId].todoLists)[0]
        setSelectedListId(listId)
        setSelectedBoardId(boardId)
    }


    const renderSelector = () => {
        const isEditing = titleIsFocused || descriptionIsFocused
        return (
            <SelectProject>
                {Object.values(todoBoards).map(board => {
                    const isActive = board.boardId === selectedBoardId
                    return (
                        <SelectProjectItem key={board.boardId}>
                            <SelectProjectItemLabel  onClick={() => selectBoardHandler(board.boardId)} active={isActive}>
                                {board.title}
                            </SelectProjectItemLabel>
                            {isActive && (
                                <SelectProjectList>
                                    {Object.values(board.todoLists).map(list => (
                                        <SelectProjectListItem
                                            active={selectedListId === list.id}
                                            onClick={() => setSelectedListId(list.id)}
                                        >
                                            {list.title}
                                        </SelectProjectListItem>
                                    ))}
                                </SelectProjectList>
                               
                            )}
                        </SelectProjectItem>
                    )
                })}
            </SelectProject>
        )
    }

    const submitHandler = () => {
        const startDate = new Date(moment(date).set("hour", hour).set("minute", 0).set("second", 0))
        const dueDate = new Date(moment(date).set("hour", hour).set("minute", 30).set("second", 0))
        const tempTodo = {
            title,
            description,
            id: generateId(),
            todoListId: selectedListId,
            boardId: selectedBoardId,
            type: "todo",
            index: todoBoards[selectedBoardId].todoLists[selectedListId].todos.length,
            dueDate,
            startDate,
            checkList: [],
            todoLabels: [],
            attachments: []
        }
        dispatch(actions.saveTodo(tempTodo))
        closeHandler()
    }

    const textEditorSubmitHandler = () => {
        if(title !== ""){
            submitHandler()
        }
    }

    return (
        <Container ref={containerRef}>
            <CloseIcon icon="times" onClick={closeHandler} />
            <Title
                value={title}
                onChange={e => setTitle(e.target.value)}
                ref={inputRef}
                onFocus={() => setTitleIsFocused(true)}
                onBlur={() => setTitleIsFocused(false)}
            />
            <TextEditor 
                currentValue={description}
                onChange={setDescription}
                submitHandler={textEditorSubmitHandler}
                customRef={descriptionRef}
                onFocus={() => setDescriptionIsFocused(true)}
                onBlur={() => setDescriptionIsFocused(false)}
                config={{
                    showSaveButton: true
                }}
                isSmall
                customStyle={{
                    opacity: title === "" ? 0 : 1
                }}
            />
            {todoBoards && Object.keys(todoBoards).length > 0 && renderSelector()}       
        </Container>
     )
};

export default WeekDayInput;
