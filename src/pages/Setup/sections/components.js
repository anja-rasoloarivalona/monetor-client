import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 10rem;
    width: 90%;
    position: relative;
    max-width: 95rem;
`


const Title = styled.h1`
    font-size: 3rem;
    color: ${props => props.theme.textActive};
    text-transform: uppercase;
    margin-bottom: 2rem;
`

const SubTitle = styled.div`
    font-size: 1.4rem;
    color: ${props => props.theme.text};
    line-height: 1.4;
    text-align: center;
`

export {
    Container,
    Title,
    SubTitle
}