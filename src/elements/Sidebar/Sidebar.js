import React, { useState } from "react"
import styled from "styled-components"
import { ScrollBar } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppList from './AppList'
import SubList from './SubList'
import SidebarLinks from './SidebarLinks'

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 99;
`

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 27rem;
    height: 100vh;
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textLight};
    z-index: 100;
    transform: translateX(${props => props.showSidebar ? 'none' : '-100%'});
    transition: all .3s ease-in;
    overflow-x: hidden;
`

const Content = styled.div`
    width: 27rem;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 100%);
    grid-template-rows: 100vh;
    transform: translateX(${props => props.showList && props.showList.display ? '-100%' : 'none'});
    transition: all .3s ease-in;
`

const ContentSection = styled(ScrollBar)`
    width: 100%;
    height: 100%;
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

const CloseButton = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    left: 32rem;
    z-index: 110;

    svg {
        font-size: 2.6rem;
        color: ${props => props.theme.background};
    }
`

const Sidebar = props => {

    const { showSidebar, setShowSidebar } = props

    const [ showList, setShowList ] = useState(false)


    const closeHandler = () => {
        setShowSidebar(false)
        setShowList(false)
    }

    return (
        <>
            {showSidebar && (
                <>
                    <Background onClick={() => setShowSidebar(false)}/>
                    <CloseButton onClick={() => setShowSidebar(false)}>
                        <FontAwesomeIcon icon="times"/>
                    </CloseButton>
                </>
            )}
    
            <Container showSidebar={showSidebar}>
                <Content showList={showList}>
                    <ContentSection>
                        <Header>
                            <HeaderLabel>
                                Menu
                            </HeaderLabel>
                        </Header>
                        <SidebarLinks 
                            closeHandler={closeHandler}
                        />
                        <AppList 
                            setShowList={setShowList}
                            showList={showList}
                            closeHandler={closeHandler}
                        />
                    </ContentSection>
                    <ContentSection>
                        <SubList 
                            setShowList={setShowList}
                            showList={showList}
                            closeHandler={closeHandler}
                        />
                    </ContentSection>
                </Content>   
            </Container>
        </>
     )
};

export default Sidebar;
