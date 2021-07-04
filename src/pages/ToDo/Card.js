import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Container = styled.div`
    height: 100%;
    width: 100%;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background: white;
    opacity: ${props => props.isDragging ? 0 : 1}
`

const Card = props => {

    const { toDo, index, moveCardInsideList } = props


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
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
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
            moveCardInsideList(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            // item.index = hoverIndex;
        },
    });

    const [{ isDragging }, dragRef, preview ] = useDrag({
        type: "card",
        item: toDo,
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
      }, [])

    dragRef(drop(ref))

    return (
        <Container
            ref={ref}
            data-handler-id={handlerId}
            isDragging={isDragging}
            role={"DraggableCard"}
            style={{
                // backgroundColor: isDragging ? "blue" : "red",
            }}
        >
            { toDo.title}
        </Container>
    )
};

export default Card;
