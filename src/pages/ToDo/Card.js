import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { AppDate } from '../../components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background: white;
    opacity: ${props => props.isDragging ? 0 : 1};
    padding:  1rem;
    box-shadow: ${props => props.theme.boxShadowLight};
    border-radius: .3rem;
    cursor: pointer;
`

const Title = styled.div`
    font-size: 1.4rem;
    flex: 1;
    line-height: 1.4;
    width: 100%;
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



const Card = props => {

    const {todo, moveHandler,setDraggedCard,  draggedCard, setIsEdited } = props


    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = todo.index;
            const isSameItem = item.id === todo.id
            // Don't replace items with themselves
            if (isSameItem) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
                 
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveHandler({
                movedItem: item,
                hoveredItem: todo
            })
            // moveHandler(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            // item.index = hoverIndex;
        },
    });

    const [{ isDragging }, dragRef, preview ] = useDrag({
        type: "card",
        item: () => {
            return todo
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        }),
        end: () => setDraggedCard(null),
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
      }, [])

    useEffect(() => {
        if(isDragging){
            setDraggedCard(todo)
        }
    },[isDragging])


    dragRef(drop(ref))

    const showCta = todo.dueDate || todo.description || todo.checkList.length > 0


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
            ref={ref}
            data-handler-id={handlerId}
            isDragging={isDragging || (draggedCard && draggedCard.id === todo.id)}
            onClick={() => setIsEdited(todo)}
        >
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
