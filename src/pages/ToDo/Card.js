import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { AppDate } from '../../components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background: white;
    padding:  1rem;
    border-radius: .3rem;
    cursor: pointer;
    background: ${({theme}) => theme.surface};
    box-shadow: ${({theme}) => theme.boxShadowExtraLight};
`

const Title = styled.div`
    font-size: 1.4rem;
    flex: 1;
    line-height: 1.4;
    width: 100%;
    display: flex;
    align-items: center;
`

const Cta = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${props => props.themetextLight};
`


const CtaDueDate = styled.div`
    display: flex;
    align-items: center;
    padding: .5rem;
    border-radius: .3rem;
    margin-right: .7rem;

    svg {
        margin-right: .5rem;
    }

    ${props => {
        if(props.completed){
            return {
                background: props.theme.green,
                color: "white"
            }
        }
    }}
`

const CtaDescription = styled.div`

`

const CtaCheckList = styled.div`
    display: flex;
    align-items: center;
    padding: .5rem;
    border-radius: .3rem;
    margin-right: 1rem;

    svg {
        margin-right: .5rem;
    }
`


const CtaCheckListLabel = styled.div`

`

const Labels = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`
const Label = styled.div`
    background: ${({color}) => color};
    width: max-content;
    height: 2rem;
    padding: 0 1rem;
    color: ${({theme}) => theme.white};
    display: flex;
    align-items: center;
    font-size: 1.2rem;
`


const Card = props => {

    const {todo, setIsEdited } = props

    const { 
        todos: {
            todoBoards
        }
    } = useSelector(state => state)

    const showCta = todo.dueDate || todo.description || (todo.checkList && todo.checkList.length > 0)

    const getCompletedCheckList = () => {
        let completed = 0
        todo.checkList.forEach(item => {
            if(item.completedAt){
                completed += 1
            }
        })
        return completed
    }

    return (
        <Container
            id={todo.id}
            onClick={() => setIsEdited(todo)}
        >
            {todo.todoLabels && todo.todoLabels.length > 0 && (
                <Labels>
                    {todo.todoLabels.map((label, labelIndex) => {
                        const labelData = todoBoards[label.boardId].labels.find(l => l.id === label.id)
                        return (
                            <Label key={labelIndex} color={labelData.color}>
                                {labelData.title}
                            </Label>
                        )
                    })}
                </Labels>
            )}
        
            <Title>
                {todo.title}
            </Title>
            {showCta && (
                <Cta>
                    {todo.dueDate && (
                        <CtaDueDate completed={todo.completedAt}>
                            <FontAwesomeIcon icon={faClock} />
                            <AppDate 
                                value={todo.dueDate}
                                format="mm dd"
                                month="short"
                            />
                        </CtaDueDate>
                    )}
                    {todo.checkList.length > 0  && (
                        <CtaCheckList>
                            <FontAwesomeIcon icon="list" />
                            <CtaCheckListLabel>
                                {getCompletedCheckList()}/{todo.checkList.length}
                            </CtaCheckListLabel>
                        </CtaCheckList>
                    )}

                    {todo.description && (
                        <CtaDescription>
                            <FontAwesomeIcon icon="align-left"/>
                        </CtaDescription>
                    )}
                </Cta>
            )}

        </Container>
    )
};

export default Card;
