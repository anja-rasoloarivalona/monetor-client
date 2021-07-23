import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 4px 5px;

    .dot-flashing {
        position: relative;
        width: 7px;
        height: 7px;
        border-radius: 5px;
        background-color:black;
        color:black;
        animation: dotFlashing 1s infinite linear alternate;
        animation-delay: .5s;
    }
  
  .dot-flashing::before, .dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }
  
  .dot-flashing::before {
    left: -15px;
    width: 7px;
    height: 7px;
    border-radius: 5px;
    background-color:black;
    color:black;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }
  
  .dot-flashing::after {
    left: 15px;
    width: 7px;
    height: 7px;
    border-radius: 5px;
    background-color:black;
    color:black;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }
  
  @keyframes dotFlashing {
    0% {
      background-color: black;
    }
    50%,
    100% {
      background-color: grey;
    }
  }
`

const TypingAnimation = () => {
    return (
        <Container>
            <div class="dot-flashing"></div>
        </Container>
    )
}

export default TypingAnimation

