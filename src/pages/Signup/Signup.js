import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Form } from '../../components'
import axios from 'axios'
import { getIpData } from '../../functions'
import * as actions from '../../store/actions'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10vh;
`

const FormContainer = styled.div`
    width: 90%;
    max-width: 45rem;
`

const Title = styled.h1`
    color: ${props => props.theme.text};
    margin-bottom: 4rem;
    text-transform: uppercase;
    font-size: 3rem;
    text-align: center;
`

const Signup = () => {

    const dispatch = useDispatch()

    const { 
        text: { text }
    } = useSelector(state => state)

    const inputs = [
        {
            id: "firstname",
            name: "firstname",
            type: "text",
            input_type: "input",
            label: text.first_name,
            placeholder: text.first_name,
            required: true
        },
        {
            id: "last_name",
            name: "last_name",
            type: "text",
            input_type: "input",
            label: text.lastname,
            placeholder: text.lastname,
            required: true
        },
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

    const getUserlocation = async () => {
        try {
            const { data: location } = await axios.get('https://ipapi.co/json/')
            return location
        } catch(err){
            console.log({
                err,
                message: "FAILED TO GET USER LOCATION"
            })
        }
    }

    const signupHandler = async data => {
        try {
            const location = await getUserlocation()
            const res = await axios.post("/signup", {
                ...data,
                ipAddress: location.ip,
                city: location.city,
                country: location.country_name,
                province: location.region_code,
                postalCode: location.postal,
                lat: location.latitude,
                lng: location.longitude
            })
            if(res.status === 201){
                dispatch(actions.setUser(res.data.data))
            }
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
                    {text.title}
                </Title>
                <Form 
                    inputs={inputs}
                    submitHandler={signupHandler}
                    buttonLabel={text.signup}
                />
            </FormContainer>
        </Container>
     )
};

export default Signup;
