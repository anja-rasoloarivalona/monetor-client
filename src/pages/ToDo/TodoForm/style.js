import styled from 'styled-components'

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: bold;
    svg {
        margin-right: 1rem;
        font-size: 1.4rem;
    }
`

const SidebarItemContainer = styled.div`
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    z-index: 2;
    width: 35rem;
    height: max-content;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .5rem;
`

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 1rem;
    position: relative;
    border-bottom: 1px solid ${props => props.theme.background};
    margin-bottom: 1rem;
`

const SidebarHeaderTitle = styled.div`
    font-size: 1.4rem;
`

const SidebarHeaderIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        font-size: 1.4rem;
    }

    &.hide {
        opacity: 0;
        cursor: default;
    }
`

export {
    SectionTitle,
    SidebarHeader,
    SidebarHeaderTitle,
    SidebarItemContainer,
    SidebarHeaderIcon
}