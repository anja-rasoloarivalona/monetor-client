import React, { useEffect, useState } from "react"
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { withFormik, Form as FormComponent } from 'formik'
import { renderInput } from './renderInput'
import { SubmitButton } from '../../index'
import { useWindowSize } from '../../../hooks'

let formProps = {}
let errorText = {}

const Form = props => {

    formProps = props

    const { inputs: formInputs, errors, touched, handleChange, values, handleBlur, setFieldValue, isSubmitting, getValues, getErrors, formStyle, disabled, getTouched, hideSubmitCta } = props

    const { windowWidth } =  useWindowSize()

    const [ inputs, setInputs ] = useState(null)

    const {
        text: { text },
        settings: { locale }
    } = useSelector(state => state)

    const _errorText = {
        fr: {
            required_field: "Ce champ est requis",
            invalidEmail: "Cet email n'est pas valide",
            invalidPhoneNumber: "Ce numéro n'est pas valide"
        },
        en: {
            required_field: "Required field",
            invalidEmail: "This email is invalid",
            invalidPhoneNumber: "This number is invalid"
        }
    }

    errorText = _errorText[locale]

    useEffect(() => {
        const displayedInputs = []
        formInputs.forEach(input => {
            displayedInputs.push({
                ...input,
                label: text[input.label],
                placeholder: text[input.placeholder]
            })
        })
        setInputs(displayedInputs)
    },[formInputs, text])


    useEffect(() => {
        if(getValues){
            getValues(values)
        }
    },[values])


    useEffect(() => {
        if(getErrors){
            getErrors(errors)
        }
    },[errors])


    useEffect(() => {
        if(getTouched){
            getTouched(touched)
        }
    },[touched])

    const formStyles = {
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "16px",
        },
        flex: {
            display: "flex",
            flexDirection: "column"
        }
    }

    const currentFormStyle = formStyle &&  windowWidth > 500 ? { ...formStyles[formStyle] } : { ...formStyles["flex"] }

    if(!inputs){
        return null
    }

    return (
        <FormComponent style={currentFormStyle}>
            {inputs && inputs.map((input, index) => renderInput({
                input,
                index,
                errors,
                touched,
                handleChange,
                values,
                onBlur: handleBlur,
                onChange: setFieldValue
            }))}
            {props.children}
            {!hideSubmitCta && (
                <SubmitButton 
                    isSubmitting={isSubmitting}
                    label={props.buttonLabel}
                    onClick={props.onClickButton}
                    submitButtonStyle={props.submitButtonStyle}
                    disabled={disabled}
                    secondaryLabel={props.secondaryLabel}
                    onClickSecondary={props.onClickSecondary}
                    secondaryButtonStyle={props.secondaryButtonStyle}
                />
            )}

        </FormComponent>
     )
};

const EnhancedForm = withFormik({
    mapPropsToValues:  ( { inputs } ) => {
        const values = {}
        inputs && inputs.forEach(input => {
            values[input.name] = ""
        })
        return values
    },
    validationSchema: ({ inputs }) => {
        const validations = {}
        inputs && inputs.forEach(input => {
            if(input){
                
                const isEmail = input.type === "email"
                const isPhoneNumber = input.input_type === "phone-number"
                const requiredState = input.required ? "required" : "notRequired"

                const validationTypes = {
                    number:  {
                        notRequired: Yup.number(),
                        required: Yup.number().required(errorText.required_field)
                    },
                    date: {
                        notRequired: Yup.date(),
                        required: Yup.date().required(errorText.required_field)
                    },
                    object: {
                        notRequired: Yup.object(),
                        required: Yup.object().required(errorText.required_field)
                    },
                    default: {
                        notRequired: Yup.string(),
                        required: Yup.string().required(errorText.required_field)
                    }
                }

                const isDefault = !validationTypes[input.type]                
                let validation = isDefault ? validationTypes.default[requiredState] : validationTypes[input.type][requiredState]
       

                if(isEmail){
                    validation = validation.concat(Yup.string().email(errorText.invalidEmail))
                }

                // if(isPhoneNumber){
                //     const validataPhoneNumber = value => {
                //         if(value === undefined){
                //             if(input.required){
                //                 return false
                //             } else {
                //                 return true
                //             }
                //         } else {
                //             return isValidPhoneNumber(value)
                //         }
                //     }
                //     validation = validation.concat(Yup.string().test("is-phone", errorText.invalidPhoneNumber, value =>  validataPhoneNumber(value) ))
                // }

                if(input.validation){
                    validation = validation.concat(input.validation)
                }
                validations[input.name] = validation
            }
        })
        return Yup.object().shape(validations)
    },
    handleSubmit: async (values, {props, setErrors }) => {
        const empty = errorText.required_field
        const { submitHandler, inputs } = props
        let isValid = true
        const errors = {}

        for(const value in values){
            const inputIndex = inputs.findIndex(input => input.name === value)
            if(inputIndex > -1 && values[value].length === 0 && inputs[inputIndex].required){
                isValid = false
                errors[value] = empty
            }
        }
        if(isValid){
            await submitHandler(values)
        } else {
            setErrors(errors)
        }
    }
})(Form)

export {
    EnhancedForm,
    formProps
};
