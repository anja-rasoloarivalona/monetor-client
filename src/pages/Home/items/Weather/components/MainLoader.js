import React from "react"
import styled from "styled-components"
import { ComponentLoader } from '../../../../../components'

const Container = styled.div`
`

const Line = styled(ComponentLoader)`
    width: ${({ small}) => small ? "70%" : "100%"};
    height: 2rem;
    margin-bottom: 2rem;
    border-radius: .5rem;
`

const MainLoader = () => {
    return (
        <Container>
            <Line />
            <Line small/>
        </Container>
     )
};

export default MainLoader;
