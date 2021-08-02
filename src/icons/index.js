import React from "react"
import sprite from './sprite.svg'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.svg`
    width: inherit;
    height: inherit;
    fill: inherit;
`

const Icon = props => {
    const { id, icon, className } = props
    if(id){
        return (
            <Container className={className || ""}>
                <use href={sprite + `#${id}`}/>
            </Container>
        )
    }
    return <FontAwesomeIcon icon={icon} />
};

export default Icon;
