import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: red;
`

const Overview = () => {
  
  const {

  } = useSelector(s => s)
  
    return (
        <Container>
          Overview
        </Container>
     )
};

export default Overview;
