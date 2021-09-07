import React, { useState, useRef } from "react"
import styled from "styled-components"
import { ScrollBar } from '../../components'
import AppList from './AppList'
import SubList from './SubList'
import SidebarLinks from './SidebarLinks'
import { useOnClickOutside } from '../../hooks'

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
    box-shadow: ${({ theme }) => theme.boxShadow};
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


const Sidebar = props => {

    const { showSidebar, setShowSidebar } = props
    const [ showList, setShowList ] = useState(false)

    const container = useRef()

    const closeHandler = () => {
        setShowSidebar(false)
        setShowList(false)
    }

    useOnClickOutside(container, () => {
        if(showSidebar){
            setShowSidebar(false)
        }
    })

    return (
<           Container showSidebar={showSidebar} ref={container}>
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
     )
};

export default Sidebar;
