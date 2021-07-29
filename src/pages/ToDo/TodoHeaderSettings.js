import React, { useState } from "react"
import styled from "styled-components"
import { Button  } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    position: relative;   
    margin-left: 1rem;
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

    button {
        background: ${props => props.theme.onSurface};
        color: ${props => props.theme.textLight};
        svg {
            margin-right: 1rem;
        }
    }

`


const TodoHeaderSettings = () => {

    const [ showPannel, setShowPannel ] = useState(true)

    return (
        <Container>
            <ButtonContainer>
                <Button square>
                    <FontAwesomeIcon icon="cog"/>
                    Settings
                </Button>
            </ButtonContainer>
            {showPannel && (
                <List>
                    <ListHeader>
                        <Button square>
                        <FontAwesomeIcon icon="cog"/>
                            Settings
                        </Button>    
                    </ListHeader>
                </List>
            )}
        </Container>
     )
};

export default TodoHeaderSettings;
