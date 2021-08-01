import React from "react"
import sprite from './sprite.svg'
import styled from 'styled-components'

const Container = styled.svg`
    width: inherit;
    height: inherit;
    fill: inherit;
`

const Icon = props => {
    const { id } = props
    // console.log({
    //     test: sprite + `#${id}`
    // })
    return (
        <Container>
            <use href={sprite + `#${id}`}/>
        </Container>
     )
};

export default Icon;
