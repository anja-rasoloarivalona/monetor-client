import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { AppDate } from '../../components'
import AppIcon from '../../icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'
import { formatDate } from '../../functions'

const Container = styled.div`
    height: ${({ height }) => height - 20}px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: .7rem;
    cursor: pointer;
    background: ${({theme}) => theme.surface};
    box-shadow: ${({theme}) => theme.boxShadowExtraLight};
    overflow: hidden;
`

const Body = styled.div`
    padding:  1rem 1.5rem;
    height: 100%;
`

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 2rem;
`

const Title = styled.div`
    font-size: 1.6rem;
    line-height: 1.4;
    flex: 1;
`

const TitleIcon = styled.div`
    width: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TitleIconDot = styled.div`
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.textLight};
`

const Description = styled.div`
    height: ${({ height }) => height}px;
    padding: 1rem 0;
    > div {
        max-height: ${({ height }) => height - 20}px;
    }
`

const DescriptionText = styled.div`
    max-height: 6rem;
    font-size: 1.4rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.textLight};
    overflow: hidden;
`

const Cta = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    font-size: 1.2rem;
    color: ${props => props.themetextLight};
    height: 2.5rem;
`


const TodoDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 4rem;
    font-size: 1.3rem;
    
    > div:first-child {
        margin-right: 3rem;
    }

    svg {
        margin-right: .5rem;
        font-size: 1.6rem;
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

const TodoDateItem = styled.div``

const TodoDateItemValue = styled.span``


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
    height: ${({ height }) => height}px;
    padding: .75rem 0;
`
const Label = styled.div`
    background: ${({color}) => color};
    width: max-content;
    height: 2.5rem;
    padding: 0 1.5rem;
    color: ${({theme}) => theme.white};
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-right: .5rem;
    border-radius: 1rem;
`
const CoverContainer = styled.div`
    width: 100%;
    height: 14rem;
    background-image: url(${({ src}) => src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

`

const Card = props => {

    const {todo, setIsEdited, config } = props

    const { 
        settings: {
            locale
        },
        todos: {
            todoBoards
        }
    } = useSelector(state => state)

    const showCta = todo.dueDate || (todo.checkList && todo.checkList.length > 0)

    const getCompletedCheckList = () => {
        let completed = 0
        todo.checkList.forEach(item => {
            if(item.completedAt){
                completed += 1
            }
        })
        return completed
    }

    const getCoverImageUrl = () => {
        return todo.attachments.find(attachment => attachment.id === todo.coverImage).url
    }



    return (
        <Container
            id={todo.id}
            onClick={() => setIsEdited(todo)}
            height={todo.metadata.cardH * config.rowHeight}
        >
            {/* {todo.coverImage && (
                <CoverContainer src={getCoverImageUrl()} />
            )} */}
            <Body>
                <TitleContainer>
                    <Title>{todo.title}</Title>
                    <TitleIcon>
                        <TitleIconDot />
                        <TitleIconDot />
                        <TitleIconDot />
                    </TitleIcon>
                </TitleContainer>

                {todo.todoLabels && todo.todoLabels.length > 0 && (
                    <Labels height={todo.metadata.labels * config.rowHeight}>
                        {todo.todoLabels.map((label, labelIndex) => {
                            const labelData = todoBoards[label.boardId].labels.find(l => l.id === label.id)
                            return (
                                <>
                                <Label key={labelIndex} color={labelData.color}>
                                    {labelData.title}
                                </Label>
                                </>
                            )
                        })}
                    </Labels>
                )}
                {todo.description && (
                    <Description height={todo.metadata.description * config.rowHeight}>
                        <DescriptionText dangerouslySetInnerHTML={{__html: todo.description}}/>
                    </Description>
                )}

                {todo.dueDate && (
                    <TodoDate completed={todo.completedAt}>
                        <TodoDateItem>
                            <FontAwesomeIcon icon={faClock} />
                            <TodoDateItemValue >
                                {formatDate(todo.dueDate, "hh:min", locale)}
                            </TodoDateItemValue>
                        </TodoDateItem>
                        <TodoDateItem>
                            <FontAwesomeIcon icon={faCalendar} />
                            <TodoDateItemValue >
                                {formatDate(todo.dueDate, "dd mm", locale, "long")}
                            </TodoDateItemValue>
                        </TodoDateItem>
                    </TodoDate>
                )}
                
                {showCta && (
                    <Cta>

                        {/* {todo.checkList.length > 0  && (
                            <CtaCheckList>
                                <FontAwesomeIcon icon="list" />
                                <CtaCheckListLabel>
                                    {getCompletedCheckList()}/{todo.checkList.length}
                                </CtaCheckListLabel>
                            </CtaCheckList>
                        )} */}
                    </Cta>
                )}
            </Body>
        </Container>
    )
};

export default Card;
