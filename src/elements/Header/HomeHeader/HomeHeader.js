import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "../../../components"
import { withRouter } from 'react-router-dom'
import * as actions from '../../../store/actions'
import { Select } from '../../../components/Form/WithoutValidation'

const Container = styled.div`
    height: 8rem;
    width: 100vw;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Section = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;

  a:not(:first-child){
    margin-left: 3rem;
  }
`

const ToogleTheme = styled.div`
  width: 4rem;
  height: 4rem;
  margin-left: 3rem;
  background: ${props => props.theme.type === "dark" ? "white" : "black"};
  border-radius: 50%;
`

const HomeHeader = props => {

    const dispatch = useDispatch()

    const {
      text: { header, text},
      theme: { type },
      settings: { locale }
    } = useSelector(state => state)

    const toggleTheme = () => {
      const nextTheme = type === "light" ? "dark" : "light"
      dispatch(actions.setTheme(nextTheme))
    }

    const selectLocale = selected => {
        dispatch(actions.setLocale(selected))
    }

    const locales = [
      {value: "en", label: header.english},
      {value: "fr", label: header.french}
    ]

    return (
        <Container>
            <Section>
              <Link to="/">
                {header.home}
              </Link>
            </Section>
            <Section>
              <Link to={`/${text.link_signup}`}>
                {header.signup}
              </Link>
              <Link to={`/${text.link_login}`} isOutlinedButton>
                {header.login}
              </Link>
              <ToogleTheme onClick={toggleTheme}/>
              <Select 
                currentValue={locale}
                options={locales}
                onChange={selectLocale}
                displayValue={true}
                customContainerStyle={{
                  marginLeft: "2rem"
                }}
                customValueStyle={{
                  textTransform: "uppercase"
                }}
              />
            </Section>
        </Container>
     )
};

export default withRouter(HomeHeader);
