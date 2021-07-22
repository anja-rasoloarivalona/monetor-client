import React, { useState } from "react"
import styled from "styled-components"
import { ReactComponent as Grid } from '../../../icons/grid.svg'


const Container = styled.div`
    position: relative;
    margin-left: 1rem;
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    border-radius: 50%;
    padding: .7rem;

    svg {
        fill: ${props => props.theme.grey};
    }

    :hover {
        background: ${props => props.theme.background};
    }
`

const List = styled.div`
    position: absolute;
    top: 90%;
    left: 0;
    width: 100%;
    z-index: 1;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
`

const ListItem = styled.div`
    width: 6rem;
    height: 6rem;
    background: red;
`

const AppSelector = () => {

    const [ showList, setShowList ] = useState(false)

    return (
        <Container
            onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}
        >
          <IconContainer>
              <Grid />
          </IconContainer>
          {/* {showList && (
            <List>
                <ListItem></ListItem>
            </List>
          )} */}
   
        </Container>
     )
};

export default AppSelector;
