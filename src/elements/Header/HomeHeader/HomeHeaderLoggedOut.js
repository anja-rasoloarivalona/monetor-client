import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from '../../../components'
import logoLight from '../../../images/logos/logo-light.png'
import * as actions from '../../../store/actions'

const Container = styled.div`
    height: 8rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4rem;
    * {
        font-family: Roboto;
    }
`

const Section = styled.div`
    display: flex;
    align-items: center;
`

const Button = styled.button`
    font-size: 1.4rem;
    padding: 1rem;
    cursor: pointer;
`

const LoginButton = styled(Button)`
    margin-right: 2rem;
    font-size: 1.4rem;
    background: none;
    border: none;
`


const GetStartedButton = styled.div`
    height: 4.5rem;
    width: 14rem;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    border-radius: 1.3rem;
    background: ${props => props.theme.surface};
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: ${props => props.theme.text};
    cursor: pointer;
    overflow: hidden;

    :hover {
        > div {
            width: 14rem;
        }
    }
`

const GetStartedButtonAnimation = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    transition: all .3s ease-in;
`

const GetStartedButtonAnimationInner = styled.div`
    position: absolute;
    top: 0
    bottom 0;
    margin: auto;
    left: 0;
    width: 14rem;
    height: calc(100% + 2px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.primary};
    z-index: 2;
    color: ${props => props.theme.surface};
`

const Text = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: horizontal;
    width: 2rem;
    padding: 1rem 0;
    background: red;
`

const LogoContainer = styled.div`
    height: 8rem;
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    cursor: pointer;
    width: 18rem;
    object-fit: contain;
`

const Language = styled.div`
    font-size: 1.4rem;
    height: 8rem;
    padding-top: 2.5rem;
    cursor: pointer;
    :hover {
        color: ${props => props.theme.primary};
        text-decoration: underline;
    }
`

const HomeHeaderLoggedOut = () => {

    const dispatch = useDispatch()

    const {
        text: { text, page },
        settings: { locale }
    } = useSelector(state => state)

    const toggleLocale = () => {
        const nextLocale = locale === "fr" ? "en" : "fr"
        dispatch(actions.setLocale(nextLocale))
    }

    return (
        <Container>
            <Section>
                <Link to="/">
                    <LogoContainer>
                        <Logo src={logoLight}/>
                    </LogoContainer>
                </Link>
            </Section>
            <Section>
                {page.id !== "login" && page.id !== "signup" && (
                    <>
                        <Link to={text.link_login}>
                            <LoginButton>
                                {text.login}
                            </LoginButton>
                        </Link>
                        <Link to={text.link_signup}>
                            <GetStartedButton>
                                {text.get_started_now}
                                <GetStartedButtonAnimation>
                                    <GetStartedButtonAnimationInner>
                                        {text.get_started_now}
                                    </GetStartedButtonAnimationInner>
                                </GetStartedButtonAnimation>
                            </GetStartedButton>
                        </Link>
                    </>
                )}
                <Language onClick={toggleLocale}>
                    {locale === "en" ?  "Français" : "Anglais"}
                </Language>
            </Section>
        </Container>
     )
};

export default HomeHeaderLoggedOut;
