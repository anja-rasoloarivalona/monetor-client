import React, {useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Form, Link } from '../../components'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import * as actions from '../../store/actions'
import { ReactComponent as LoginSvg } from '../../icons/login.svg'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 45%;
`
const ImageContainer = styled.div`
    width: 45vw;
    height: 100%;
    background: ${props => props.theme.primary};
    background: ${props => props.theme.primaryGradient};
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 9rem;

    svg {
        width: 45rem;
    }
`

const ImageTextContainer = styled.div``

const ImageText = styled.div`
    font-size: 3.5rem;
    font-weight: 500;
    color: ${props => props.theme.white};
    line-height: 1.4;
    text-align: center;
`

const FormContainer = styled.div`
    width: 50%;
    padding-top: 10%;
    max-width: 40rem;

    button {
        width: 100%;
        margin: 0;
        height: 4.5rem;
        border-radius: 1.6rem;
    }

    input {
        border-radius: 1.6rem;
        :focus {
            border-color: ${props => props.theme.primary}
        }
    }
`

const Title = styled.h1`
    color: ${props => props.theme.text};
    margin-bottom: 4rem;
    font-size: 3.2rem;
`
const ForgotPassword = styled.div`
    font-size: 1.4rem;
    text-align: end;
    transform: translateY(-3rem);
    a {
        color: ${props => props.theme.primary} !important;
        font-weight: 700;
        :hover {
            text-decoration: underline;
        }
    }
`

const Cta = styled.div`
    margin-top: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    a {
        color: ${props => props.theme.primary} !important;
        font-weight: 700;
        :hover {
            text-decoration: underline;
        }
    }
`

const Login = props => {

    const dispatch = useDispatch()
    const location = useLocation()

    const { 
        text: { text }
    } = useSelector(state => state)

    const initialInputs = [
        {
            id: "email",
            name: "email",
            type: "email",
            input_type: "input",
            label: "email",
            placeholder: "email",
            required: true
        },
        {
            id: "password",
            name: "password",
            type: "password",
            input_type: "input",
            label: "password",
            placeholder: "password",
            required: true
        },
    ]


    const [ forgotPassword, setForgotPassword ] = useState(false)
    const [ inputs, setInputs ] = useState(initialInputs)


    useEffect(() => {
        const currentPathname = location.pathname.split("/")[1]
        if(currentPathname === text.link_forgot_password){
            setForgotPassword(true)
        } else {
            if(forgotPassword){
                setForgotPassword(false)
            }
        }
    },[location])


    useEffect(() => {
        if(forgotPassword){
            setInputs([initialInputs[0]])
        } else {
            setInputs(initialInputs)
        }
    },[forgotPassword])


    const loginHanlder = async data => {
        try {
            const res = await axios.post('/login', {
                email: data.email,
                password: data.password
            })
            const user = res.data.data.user
            const resData = {
                token: res.data.data.token,
                ...user,
            }
            delete resData.settings
            dispatch(actions.setUser(resData))
            dispatch(actions.setCurrency(user.settings))
            props.history.push(`/${text.link_app_home}`)
        } catch(err){
            console.log({
                err
            })
        }
    }

    return (
        <Container>
            <ImageContainer>
                <LoginSvg />
                <ImageTextContainer>
                    <ImageText>{text.img_text_a}</ImageText>
                    <ImageText>{text.img_text_b}.</ImageText>
                </ImageTextContainer>
            </ImageContainer>
            <FormContainer>
                <Title>
                    {forgotPassword ? text.forgot_password : text.title}
                </Title>
                <Form 
                    inputs={inputs}
                    submitHandler={loginHanlder}
                    buttonLabel={forgotPassword ? text.reinitialize : text.login}
                >
                    <ForgotPassword>
                        <Link to={forgotPassword ? `/${text.link_login}` : `/${text.link_forgot_password}`}>
                            {forgotPassword ? text.back : text.forgot_password}?
                        </Link>
                    </ForgotPassword>
                </ Form>
                <Cta>
                    <span>{text.not_registered_yet}&nbsp;</span>
                    <span>
                        <Link to={`/${text.link_signup}`}>
                            {text.create_account}
                        </Link>
                    </span>
                </Cta>
            </FormContainer>

        </Container>
     )
};

export default Login;
