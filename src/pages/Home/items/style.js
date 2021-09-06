import styled from "styled-components"

const HeaderCta = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
`

const HeaderCtaItem = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        width: 2rem;
        height: 2rem;
        fill: ${({ theme }) => theme.textLight};
    };
    :hover {
        background: ${({ theme }) => theme.onSurface};
        svg {
            fill: ${({ theme }) => theme.text};
        }
    }
    
    &.small svg {
        width: 1.5rem;
        height: 1.5rem;
    }   
`
const HeaderLabel = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
`

export {
    HeaderCta,
    HeaderCtaItem,
    HeaderLabel
}