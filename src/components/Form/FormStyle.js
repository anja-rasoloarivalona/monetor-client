import styled, { keyframes } from 'styled-components'
import { Field as FormikField } from 'formik'
import ReactDatePicker from 'react-datepicker'

const inputStyle = {
    height: "4.5rem",
    width: "100%",
    paddingLeft: "1.2rem",
    borderRadius: ".5rem",
    marginBottom: "3rem",
    marginTop: "1rem"
}

const Container = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 2rem;
    font-family: Roboto;

    * {
        box-sizing: border-box;
        font-size: 1.4rem;
    }

    input {
        background: ${props => props.theme.form.unfocused.background};
        border: 1px solid ${props => props.theme.form.unfocused.border};
        font-size: 1.6rem;
        color: ${props => props.theme.textActive};
        font-family: Roboto;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        &::placeholder {
            color: transparent;
        }
        &:focus {
            outline: none;
            border: 1px solid ${props => props.theme.form.focused.border};
            // background: ${props => props.theme.form.focused.background};
            & + label {
                color: ${props => props.theme.form.focused.color};
            }
        }
 

        &:-webkit-autofill,
        &:-webkit-autofill:hover, 
        &:-webkit-autofill:focus, 
        &:-webkit-autofill:active  {
            // -webkit-box-shadow: 0 0 0px 1000px ${props => props.theme.form.unfocused.background} inset !important;
            // -webkit-text-fill-color: ${props => props.theme.textActive};
            // border: none;
            // outline: none;
            // overflow: hidden;
        }

        ${props => {
            if(props.error){
                return {
                    border: ` 1px solid ${props => props.theme.error}`
                }
            }
        }}

    }
`

const Label = styled.label`
    color: ${props => props.theme.form.unfocused.color};
    transition: all .2s ease-in;
    height: min-content;
    z-index: 1;
    font-size: 1.3rem;
    position: absolute;
    top: -1.2rem;
    left: 0;
`

const Input = styled.input`
    ${{...inputStyle}};
    ${props => {
        if(props.error){
            return {
                border: ` 1px solid ${props => props.theme.error}`
            }
        }
    }}
`

const Field = styled(FormikField)`
    font-family: Roboto;

    ${{...inputStyle}};
    ${props => {
        if(props.error){
            return {
                border: `1px solid ${props.theme.error} !important`
            }
        }
    }}
`

const Error = styled.div`
    position: absolute;
    top: 6rem;
    left: 1rem;
    font-size: 1.2rem;
    z-index: 2;
    color: ${props => props.theme.error};
`

const Unit = styled.div`
    position: absolute;
    top: 2.2rem;
    right: 1rem;
    display: flex;
    align-items: center;
    color: ${props => props.theme.form.unfocused.color};
    height: min-content;
`

const DateContainer = styled(Container)`
    margin-bottom: 3rem;

    .react-datepicker__triangle {
        display: none;
    }

    .react-datepicker-popper {
        transform: translate(0px, 45px);
        width: 100%;
        z-index: 20;

        & > div:first-child {
            display: flex;
            justify-content: flex-end
        }
    }

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker {
        width: 100%;
        max-width: 25rem;

    }

    .react-datepicker__month-container {
        width: 100%;
        max-width: 25rem;
    }

    .react-datepicker__day-names {
        margin-top: 1rem;
    }

    .react-datepicker__day-name {
        width: 2.5rem;
        padding: .5rem 0;
    }

    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        width: 2.5rem;
        padding: .5rem 0;

    }
`

const DateInput = styled(ReactDatePicker)`
    width: 100%;
    height: 4.5rem;
    border-radius: .5rem;
    margin-top: 1rem;
    margin-bottom: 0rem;
    padding-left: 1.2rem;
    font-family: Roboto;
    font-size: 1.6rem;
`


export {
    Container,
    Label, 
    Input,
    Field,
    Error,
    Unit,
    DateContainer,
    DateInput
}