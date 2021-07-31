import styled from 'styled-components'

const ButtonContainer = styled.div`
    position: relative;
    z-index: 4;
    display: flex;
    align-items: center;
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    border-radius: .3rem;
    cursor: pointer;
    overflow-x: hidden;
    padding-left: .5rem;

    &.out {
        transition: all .3s ease-in;
    }

    &.in {
        transition: width .3s ease-in;
    }
`

const Button = styled.div`
    border-radius: .3rem;
    color: ${props => props.theme.textLight};
    font-size: 1.2rem;
    width: 3.5rem;
    height: 3.5rem;
    position: relative;
    background: ${props => props.theme.onSurface};
`

const ButtonIcon = styled.div`
    min-width: 3.5rem;
    min-height: 3.5rem;
    position: absolute;
    top: 0;
    bottom 0;
    left: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.6rem;
    }
`

const ButtonLabel = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    opacity: 0;
    transform: translateX(100%);
    transition: all .3s ease-in;
    min-width: 15rem;
    transition-delay: -.3s;
    background: ${props => props.theme.onSurface};

    
`
const ListContainer = styled.div`
    width: 0;
    position: absolute;
    top: 4.5rem;
    right: 0;
    background: ${props => props.theme.surface};
    z-index: 2;
    overflow: hidden;
    transition:  all .3s ease-in;
    transform-origin: right;
    border-bottom-right-radius: .8rem;
    border-bottom-left-radius: .8rem;
`


export {
    Button,
    ButtonIcon,
    ButtonLabel,
    ButtonContainer,
    ListContainer
}