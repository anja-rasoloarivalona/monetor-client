import styled from 'styled-components'

const IconContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 1rem;

    svg {
        font-size: 1.7rem;
        color: ${props => props.themetextLight};
    }
    :hover {
        background: ${props => props.theme.background};
        svg {
            color: ${props => props.theme.text} !important;
        }
    }
`

export {
    IconContainer
}