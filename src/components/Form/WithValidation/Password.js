import React, { useState, useEffect } from "react"
import { Container, Label, Field, Error, Unit } from '../FormStyle'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useWindowSize } from '../../../hooks'
import { useSelector } from 'react-redux'

const IconContainer = styled.div`
    position: absolute;
    top 2.5rem;
    right: 1rem;
    margin: auto;
    z-index: 2;
    height: max-content;
    color: ${({theme }) => theme.dynamicTextLight};
    cursor: pointer;
    :hover {
        color: ${({theme }) => theme.dynamicText};
    }
`

const PasswordValidation = styled.div`
    position: absolute;
    top: 1.5rem;
    left: calc(100% + 1.2rem);
    width: 100%;
    padding: 1rem 2rem;
    background: ${props => props.theme.primary};
    color: white;
    border-radius: 1rem;
    z-index: 2;

    &:before {
        content: "";
        position: absolute;
        top: 1rem;
        left: -1.3rem;
        width: 1.4rem;
        height: 1.4rem;
        background: ${props => props.theme.primary};
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }

    * {
        line-height: 1.6;
    }

    ${props => {
        if(props.windowWidth <= props.bottomPosition){
            return {
                top: "7rem",
                left: "0",
                "&:before": {
                    top: "-1.3rem",
                    left: "1.3rem",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%);"
                }
            }
        }
    }}

`

const PasswordValidationIntro = styled.div`
    margin-bottom: .5rem;
`
const PasswordValidationList = styled.ul`
    padding-left: 1.5rem;
`

const PasswordValidtionListItem = styled.li`
    color: ${props => props.isValid ? props.theme.green : props.theme.white};
    margin-bottom: .5rem;
`

const text = {
    "characters": {
        "en": "The password must contain at least 8 characters",
        "fr": "Le mot de passe doit contenir au moins 8 caractères"
    },
    "requirements": {
        "en": "and meet at least two out of three requirements listed below (2/3):",
        "fr": "et satisfaire à au moins deux des trois exigences ci-dessous (2/3):"
    },
    "specialChar": {
        "en": "Special Character.",
        "fr": "Caractère spécial."
    },
    "number": {
        "en": "Number.",
        "fr": "Numéro."
    },
    "uppercase": {
        "en": "Uppercase Letter.",
        "fr": "Lettre majuscule."
    },
    "err": {
        "en": "Passwords don't match",
        "fr": "Les mots de passe saisis ne sont pas identiques."
    }
}

const Input = props => {

    const { input, errors, touched, values } = props

    const { windowWidth } = useWindowSize()

    const { 
        settings: { locale },
        theme
    } = useSelector(state => state)

    const [ show, setShow ] = useState(false)

    const [ validations, setValidations ] = useState({
        isLengthValid: false,
        hasUpperCase: false,
        hasDigit: false,
        hasSpecial: false
    })

    const showValidations = () => {
        if(values[input.name] === undefined || values[input.name] === ""){
            return false
        }

        if(!validations.isLengthValid){
            return true
        }
        const toCheck = ["hasUpperCase", "hasDigit", "hasSpecial"]
        let valid = 0
        toCheck.forEach(item => {
            if(validations[item]){
                valid += 1
            }
        })
        if(valid >= 2){
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        if(values[input.name] !== "") {
            const currentValue = values[input.name]
            const updatedValidations = {
                isLengthValid: currentValue.length > 7,
                hasUpperCase: currentValue !== currentValue.toLowerCase(),
                hasDigit:  /\d/.test(currentValue),
                hasSpecial: /[~|!|"|#|$|%|&|'|(|)|*|+|,|-|.|:|;|<|=|>|?|@|[|\\|/|\]|^|_|{|}|`]/.test(currentValue)
            }
            setValidations(updatedValidations)
        } 
    },[values[input.name]])


    useEffect(() => {
        if(input.validatePassword && values[input.name].length > 1){
            if(showValidations() && !errors[input.name]){
                props.setFieldError(input.name, "hide-error")
            }
        }

        if(input.confirmPassword && values[input.name].length > 1){
            if(values[input.name] !==  values[input.origin] && !errors[input.name]){
                props.setFieldError(input.name, text.err[locale])
            }
        }
    },[validations, errors])



    return (
        <Container
            key={input.id}
            style={{...input.containerStyle}}
            errors={Object.keys(errors).length}
        >
            <Field 
                name={input.name}
                type={show ? "text" : "password"}
                placeholder={input.required ? `${input.placeholder} \u002A` : input.placeholder}  
                disabled={input.disabled}
                style={{...input.fieldStyle}}
                error={touched[input.name] && errors[input.name]}
            />
            {props.input.below}
            {touched[input.name] && errors[input.name] && (
                <Error>{errors[input.name]}</Error>
            )}
            <Label htmlFor={input.id} style={{...input.labelStyle}} >
                {input.label} {input.required &&  `\u002A`} 
            </Label>
            <IconContainer onClick={() => setShow(prev => !prev)}>
                <FontAwesomeIcon icon={!show ? "eye-slash" : "eye"} />
            </IconContainer>

            {showValidations() && (
                    <PasswordValidation
                        bottomPosition={input.bottomPosition}
                        windowWidth={windowWidth}
                    >
                        <PasswordValidationIntro>
                            <span style={{ color: validations.isLengthValid ? theme.green : "white" }}>{text.characters[locale]}</span>&nbsp;<span>{text.requirements[locale]}</span>
                        </PasswordValidationIntro>
                        <PasswordValidationList>
                            <PasswordValidtionListItem isValid={validations.hasSpecial}>
                                {text.specialChar[locale]}
                            </PasswordValidtionListItem>
                            <PasswordValidtionListItem isValid={validations.hasDigit}>
                                {text.number[locale]}
                            </PasswordValidtionListItem>
                            <PasswordValidtionListItem isValid={validations.hasUpperCase}>
                                {text.uppercase[locale]}
                            </PasswordValidtionListItem>
                        </PasswordValidationList>
                    </PasswordValidation>
                )}
        </Container>
     )
};

export default Input;
