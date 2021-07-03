import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 10rem;
    width: 100%;
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
`

export {
    Container,
    Title,
    SubTitle
}