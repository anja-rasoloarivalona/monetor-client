import React from "react"
import styled from "styled-components"
import { ScrollBar } from '../../components'

const Container = styled(ScrollBar)`
    position: fixed;
    top: 6.5rem;
    left: 0;
    height: calc(100vh - 6.5rem);
    width: 35rem;
    z-index: 2;
    background: ${props => props.theme.background};
`

const Sidebar = () => {
    return (
        <Container>
          
        </Container>
     )
};

export default Sidebar;
