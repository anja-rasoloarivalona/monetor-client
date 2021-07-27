import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    width: 100%;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

const HeaderTitle = styled.div`
    font-size: 2rem;
    font-weight: bold;
`

export { 
    Container,
    Header,
    HeaderTitle
}