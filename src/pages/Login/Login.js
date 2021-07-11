import React, {useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Form, Link } from '../../components'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import * as actions from '../../store/actions'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10vh;
`

const FormContainer = styled.div`
    width: 90%;
    max-width: 40rem;
`

const Title = styled.h1`
    color: ${props => props.theme.text};
    margin-bottom: 4rem;
    text-transform: uppercase;
    font-size: 3rem;
    text-align: center;
`
const ForgotPassword = styled.div`
    color: ${props => props.theme.text};
    font-size: 1.4rem;
    text-align: end;
    transform: translateY(-3rem);
`

const Login = () => {

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
            label: text.email,
            placeholder: text.email,
            required: true
        },
        {
            id: "password",
            name: "password",
            type: "password",
            input_type: "input",
            label: text.password,
            placeholder: text.password,
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
        } catch(err){
            console.log({
                err
            })
        }
    }

    return (
        <Container>
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
                            {forgotPassword ? text.back : text.forgot_password}
                        </Link>
                    </ForgotPassword>
                </ Form>
            </FormContainer>
        </Container>
     )
};

export default Login;
