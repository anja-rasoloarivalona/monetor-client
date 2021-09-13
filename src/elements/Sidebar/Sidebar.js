import React from "react"
import styled from "styled-components"
import AppList from './AppList'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: ${({ showSidebar}) => showSidebar ? 24 : 7}rem;
    height: 100vh;
    background: ${({ theme }) => theme.surface};
    z-index: 100;
    transition: all .3s ease-in;
    overflow-x: hidden;
    box-shadow: ${({ theme }) => theme.boxShadowLight};
`

const Header = styled.div`
    height: 6.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.background};
    padding: 0 2rem;
`

const HeaderLabel = styled.div`
   font-size: 1.6rem;
`

const HeaderIcon = styled.div`
    min-width: 3.5rem;
    min-height: 3.5rem;
    padding: 1rem .8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background: ${({ theme }) => theme.background};
    }
`

const HeaderIconBar = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.text};
`

const Content = styled.div`
    width: 100%;
    height: calc(100vh - 6.5rem);
`

const Sidebar = props => {
    const { showSidebar, setShowSidebar } = props
    return (
            <Container showSidebar={showSidebar}>
                <Header>
                    {showSidebar && (
                        <HeaderLabel>
                            Menu
                        </HeaderLabel>
                    )}
                    <HeaderIcon onClick={() => setShowSidebar(prev => !prev)}>
                        <HeaderIconBar />
                        <HeaderIconBar />
                        <HeaderIconBar />
                    </HeaderIcon>
                </Header>
                <Content>
                    <AppList 
                        showSidebar={showSidebar}
                    />
                </Content>   
            </Container>
     )
};

export default Sidebar;
