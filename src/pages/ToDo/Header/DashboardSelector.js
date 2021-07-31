import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: relative;   
`

const List = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 10rem;
    background: ${props => props.theme.surface};
    z-index: 5;
`

const ListHeader = styled.div`

`

const ButtonContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
`
const Button = styled.div`
    border-radius: .3rem;
    color: ${props => props.theme.textLight};
    font-size: 1.2rem;
    height: 3.5rem;
    position: relative;
    display: flex;
    align-items: center;
    background: ${props => props.theme.onSurface};
    padding: 0 2rem;
    font-size: 1.4rem;
    svg {
        font-size: 1.6rem;
        margin-left: 1rem;

    }
`

const DashboardSelector = () => {

    const [ showPannel, setShowPannel ] = useState(false)

    return (
        <Container>
            <ButtonContainer>
                <Button square>
                    Dashboards
                    <FontAwesomeIcon icon="chevron-down"/>
                </Button>
            </ButtonContainer>
            {showPannel && (
                <List>
                    <ListHeader>
                        <Button square>
                        <FontAwesomeIcon icon="cog"/>
                            Dashboards
                        </Button>    
                    </ListHeader>
                </List>
            )}
        </Container>
     )
};

export default DashboardSelector;
