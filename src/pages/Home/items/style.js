import styled from "styled-components"

const HeaderCta = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;

    button {
        margin-right: .5rem;
        padding: .7rem 1.2rem;
    }
`
const HeaderCtaItem = styled.div`
    position: relative;
`

const HeaderCtaItemIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: .5rem;
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

    ${({ isActive, theme }) => {
        if(isActive){
            return {
                background: theme.onSurface,
                svg: {
                    fill: theme.text
                }
            }
        }
    }} 
`



const HeaderLabel = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
`

const Cta = styled.ul`
    position: absolute;
    left: calc(100% - 4rem);
    top: 5rem;
    z-index: 4;
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 26rem;
    padding: .5rem;
    list-style: none;
    border-radius: .5rem;
`

const CtaItem = styled.li`
    padding: 1rem;
    cursor: pointer;
    font-weight: 400;
    font-size: 1.4rem;
    :hover {
        background: ${({ theme }) => theme.secondarySurface};
    }
`
export {
    HeaderCta,
    HeaderCtaItem,
    HeaderCtaItemIcon,
    HeaderLabel,
    Cta,
    CtaItem
}