import React, { useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Form } from '../../components'
import axios from 'axios'
import { getIpData } from '../../functions'
import * as actions from '../../store/actions'
import { ReactComponent as LoginSvg } from '../../icons/signup.svg'
import { Link } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-left: 45vw;

    a {
        color: ${props => props.theme.primary} !important;
        font-weight: 700;
        :hover {
            text-decoration: underline;
        }
    };
`

const ImageContainer = styled.div`
    width: 45vw;
    height: 100%;
    box-shadow: ${props => props.theme.boxShadowLight};
    background: ${props => props.theme.background};
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;

    svg {
        width: 50rem;
    };

`


const FormContainer = styled.div`
    width: 50%;
    padding-top: 10%;
    max-width: 45rem;

    button {
        width: 100%;
        margin: 0;
        height: 4.5rem;
        border-radius: 1.6rem;
    }

    input {
        border-radius: 1.6rem;
    }
`

const Title = styled.h1`
    color: ${props => props.theme.text};
    margin-bottom: 4rem;
    font-size: 3.2rem;
`
const Cta = styled.div`
    margin-top: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
`

const Tac = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    grid-column: 1 / -1;
    padding-bottom: 3rem;
`

const TacInput = styled.input`
    margin-right: 1rem;
`
const TacLabel = styled.div``


const Signup = () => {

    const dispatch = useDispatch()

    const [ hasAccepted, setHasAccepted ] = useState(false)

    console.log({
        hasAccepted
    })

    const { 
        text: { text }
    } = useSelector(state => state)

    const inputs = [
        {
            id: "firstname",
            name: "firstname",
            type: "text",
            input_type: "input",
            label: "first_name",
            placeholder: "first_name",
            required: true
        },
        {
            id: "lastname",
            name: "lastname",
            type: "text",
            input_type: "input",
            label: "last_name",
            placeholder: "last_name",
            required: true
        },
        {
            id: "email",
            name: "email",
            type: "email",
            input_type: "input",
            label: "email",
            placeholder: "email",
            required: true,
            containerStyle: {
                gridColumn: "1/-1"
            }
        },
        {
            id: "password",
            name: "password",
            type: "password",
            input_type: "password",
            label: "password",
            placeholder: "password",
            required: true,
            bottomPosition: 1600,
            containerStyle: {
                gridColumn: "1/-1",
                marginBottom: "1rem"
            }
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
                city: location.city,
                region: location.region,
                country: location.country,
                lat: location.latitude,
                lng: location.longitude,
                regionCode: location.region_code,
                countryCode: location.country_code
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
            <ImageContainer>
                <LoginSvg />
            </ImageContainer>
            <FormContainer>
                <Title>
                    {text.title}
                </Title>
                <Form 
                    inputs={inputs}
                    submitHandler={signupHandler}
                    buttonLabel={text.signup}
                    formStyle="grid"
                >
                    <Tac>
                        <TacInput 
                            type="checkbox"
                            value={hasAccepted}
                            onChange={() => setHasAccepted(prev => !prev)}
                        />
                        <TacLabel>
                            <span>{text.accept_terms_and_conditions_a}&nbsp;</span>
                            <Link to="/"><span>{text.accept_terms_and_conditions_b}</span></Link>
                        </TacLabel>
                    </Tac>
                </Form>
                <Cta>
                    <span>{text.already_have_an_account}&nbsp;</span>
                    <span>
                        <Link to={`/${text.link_login}`}>
                            {text.login}
                        </Link>
                    </span>
                </Cta>
            </FormContainer>
        </Container>
     )
};

export default Signup;
