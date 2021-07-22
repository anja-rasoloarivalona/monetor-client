import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(NavLink)`
    &, &:link, &:visited {
        color: ${props => props.theme.text};
        text-decoration: none;
    };
    &:hover, &.active {
        color: ${props => props.theme.textLight};
    };

    ${props => {
        if(props.isButton){
            return {
                padding: "1.2rem 3rem",
                background: props.theme.primary,
                color: `${props.theme.textLight} !important`,
                borderRadius: "2rem"
            }
        }
        if(props.isOutlinedButton){
            return {
                padding: "1.2rem 2rem",
                border: `1px solid ${props.theme.text}`,
                color: `${props.theme.textLight} !important`,
                borderRadius: '3px'
            }
        }
    }}
`

export {
    Link
}