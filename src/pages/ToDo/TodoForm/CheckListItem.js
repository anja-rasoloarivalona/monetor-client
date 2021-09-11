import React, { useState, useRef } from "react"
import styled from "styled-components"
import { ListItem, ListItemCheckboxContainer, ListItemCheckbox,ListItemLabel,ListItemLabelText, ListItemLabelCta, ListItemLabelDueDate, ListItemCheck } from './CheckListStyle'
import DateInput from './DateInput'
import CheckListInput from "./CheckListInput"
import {FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { AppDate} from '../../../components'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../../hooks'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const ListItemToggle = styled.div`
    margin: 0 1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;

    ${props => {
        if(props.hovered || props.showToggleList){
            return {
                opacity: "1"
            }
        }
    }}


`

const ListItemToggleList = styled.div`
    position: absolute;
    top: 80%;
    right: 0;
    z-index: 1;
    width: 12rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .3rem;
    overflow: hidden;
`

const ListItemToggleListItem = styled.div`
    padding: .8rem 1rem;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.onSurface};
    }
`

const CheckListItem = props => {

    const {
        text: { text }
    } = useSelector(state => state)

    const { index, item, setEditedChecklist, editedCheckList, clickListItemHandler, checkList, onChangeDueDateHandler, title, setTitle, cancelHandler, submitHandler, setCheckList, deleteHandler  } = props

    const dateRef = useRef()
    const listRef = useRef()

    const [ changingDueDate, setChangingDueDate ] = useState(false)
    const [ showToggleList, setShowToggleList ] = useState(false)
    const [ hovered, setHovered ] = useState(false)

    useOnClickOutside(listRef, () => {
        setShowToggleList(false)
    })

    const editHandler = index => {
        setEditedChecklist(index)
        setShowToggleList(false)
        setTitle(checkList[index].title)
    }

    const onDelete = id => {
        deleteHandler(id)
        setShowToggleList(false)
    }

    const completedHandler = () => {
        const updatedCheckList = [...checkList]
        updatedCheckList.forEach((i, index) => {
            if(i.id === item.id){
                updatedCheckList[index] = {
                    ...updatedCheckList[index],
                    completedAt: item.completedAt ? null : new Date(),
                    hasChanged: true
                }
            }
        })
        setCheckList(updatedCheckList)
    }



    return (
        <ListItem
            key={index}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ListItemCheckboxContainer>
                <ListItemCheckbox onClick={completedHandler}>
                    {item.completedAt && (
                        <ListItemCheck>
                            <FontAwesomeIcon icon="check"/>
                        </ListItemCheck>
                    )}
                </ListItemCheckbox>
            </ListItemCheckboxContainer>
            <ListItemLabel>
                <ListItemLabelText
                    onClick={() => clickListItemHandler(index)}
                    isChecked={item.completedAt}
                >
                    {item.title}
                </ListItemLabelText>
                <ListItemLabelCta>
                    {item.dueDate && !item.completedAt && (
                        <>
                            <ListItemLabelDueDate onClick={() => setChangingDueDate(prev => prev && !prev)}>
                                <FontAwesomeIcon icon={faClock}/>
                                <AppDate 
                                    value={item.dueDate}
                                    format="mm dd"
                                    month="short"
                                /> 
                            </ListItemLabelDueDate>
                            {changingDueDate === index && (
                                <DateInput 
                                    dueDate={item.dueDate}
                                    setDueDate={val => onChangeDueDateHandler(val)}
                                    customRef={dateRef}
                                    closeHandler={() => setChangingDueDate(false)}
                                />
                            )}
                        </>
                    )}
                    <ListItemToggle
                        hovered={hovered}
                        showToggleList={showToggleList}
                        onClick={() => setShowToggleList(prev => !prev)}
                    >
                        <FontAwesomeIcon icon="ellipsis-h"/>
                    </ListItemToggle>
                    {showToggleList && (
                        <ListItemToggleList ref={listRef}>
                            <ListItemToggleListItem onClick={() => editHandler(index)}>
                                {text.edit}
                            </ListItemToggleListItem>
                            <ListItemToggleListItem onClick={() => onDelete(item.id)}>
                                {text.delete}
                            </ListItemToggleListItem>
                        </ListItemToggleList>
                    )}
      
                </ListItemLabelCta>
            </ListItemLabel>
            {editedCheckList === index && (
                <CheckListInput 
                    text={text}
                    title={title}
                    setTitle={setTitle}
                    cancelHandler={cancelHandler}
                    submitHandler={submitHandler}
                    currentCheckList={checkList[index]}
                    setCheckList={setCheckList}
                    onChangeDueDateHandler={val => onChangeDueDateHandler(val)}
                />
            )}
        </ListItem>
     )
};

export default CheckListItem;
