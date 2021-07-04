import React from "react"
import styled from "styled-components"
import { usePreview } from 'react-dnd-preview';

const Container = styled.div`
    width: 40rem;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
`

const CardPreview = () => {

    const {display, itemType, item, style} = usePreview();


    if (!display) {
      return null;
    }

    return (
        <Container
            style={{
                ...style,
                WebkitTransform: `${style.WebkitTransform} rotate(3deg)`
            }}
        >
          {item.title}
        </Container>
     )
};

export default CardPreview;
