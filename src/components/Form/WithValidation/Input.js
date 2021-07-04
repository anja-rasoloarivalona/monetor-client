import React from "react"
import { Container, Label, Field, Error, Unit } from '../FormStyle'


const Input = props => {

    const { input, errors, touched, values } = props

    return (
        <Container
            key={input.id}
            style={{...input.containerStyle}}
        >
            <Field 
                name={input.name}
                type={input.type}
                placeholder={input.required ? `${input.placeholder} \u002A` : input.placeholder}  
                disabled={input.disabled}
                style={{...input.fieldStyle}}
                error={touched[input.name] && errors[input.name]}
            />
            {props.input.below}
            {touched[input.name] && errors[input.name] && (
                <Error>{errors[input.name]}</Error>
            )}
            <Label htmlFor={input.id} style={{...input.labelStyle}}>
                {input.label} {input.required &&  `\u002A`} 
            </Label>
            {input.unit && <Unit id="unit">{input.unit}</Unit>}
        </Container>
     )
};

export default Input;
