import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import ReactSelect, { components } from 'react-select'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { Container, Label, Error } from '../FormStyle'



const Select = props => {

    const  { input, onChange, onBlur, touched, errors, values } = props

    const currentValue = values[input.name]

    const {
        theme
    } = useSelector(state => state)


    const getStyle = () => {

        const unfocusedBorderStyle =  `1px solid ${theme.form.unfocused.border}`
        const focusedBorderStyle = `1px solid ${theme.form.focused.border}`
        const errorStyle = `1px solid ${theme.error}`
    
        let custom_control = {}
    
        // if(customStyle){
        //      if(customStyle.custom_control){
        //         custom_control = customStyle.custom_control
        //      }
        // }
    
    
        return {
            control: (provided, state) => {
                return  {
                    ...provided,
                    color: theme.textActive,
                    boxShadow: "none",
                    height: "4.5rem",
                    border: 
                        touched && errors && touched[input.name] && errors[input.name] ?  
                            errorStyle : 
                            state.isFocused ? focusedBorderStyle : unfocusedBorderStyle,
                    backgroundColor: theme.form.unfocused.background,
                    cursor: 'pointer',
                    paddingLeft: "1.2rem",
                    // paddingRight: "1.2rem",
                    marginTop: "1rem",
                    marginBottom: "3rem",
                    '& svg': {
                        color: state.isFocused ? theme.form.focused.color : theme.form.unfocused.color,
                    },
                    '&:hover': {
                        border: state.isFocused ? focusedBorderStyle :  unfocusedBorderStyle,
                    },
                    " > div": {
                        paddingLeft: 0,
                        marginRight: "4px",
                        " > div": {
                            marginLeft: 0
                        }
                    },
                }
            },
            singleValue: (provided) => ({
                ...provided,
                color: theme.textActive
            }),
            placeholder: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "transparent" : "transparent",
                marginLeft: 0,
            }),
            menu: (provided) => ({
                ...provided,
                background: theme.surface,
                zIndex: 14
            }),
            menuList: (provided) => ({
                ...provided,
                paddingTop: 0,
                paddingBottom: 0,
                color: theme.text,
                zIndex: 14,
                border: theme.type === "dark" ? focusedBorderStyle : "none",
                borderRadius: ".5rem"
            }),
            option: (provided, state) => ({
                ...provided,
                height: "4.5rem",
                display: "flex",
                alignItems: "center",
                fontSize: "1.4rem",
                '&:hover': {
                    backgroundColor: theme.type === "dark" ? theme.textActive : theme.onSurface,
                    color:  theme.type === "dark" ? theme.background : theme.text
                },
                backgroundColor: theme.type === "dark" ? theme.background : theme.surface,
                cursor: 'pointer',
            })
          }
    } ; 

    const DropdownIndicator = props => {
        return (
          <components.DropdownIndicator {...props}>
            <FontAwesomeIcon 
                icon="chevron-down"
                size="lg"
            />
          </components.DropdownIndicator>
        );
    };

    const handleChange = option => {
        onChange(input.name, option.value)
    }

    return (
        <Container>
            <ReactSelect 
                onChange={handleChange}
                onBlur={onBlur ? onBlur : null}
                options={input.options}
                placeholder={input.required ? `${input.placeholder} \u002A` : input.placeholder} 
                isDisabled={input.isDisabled || input.options.length === 0}
                isSearchable={input.isSearchable ? true : false}
                value={input.options.filter(({value}) => value === currentValue)}
                styles={getStyle()}
                // menuIsOpen={true}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: input.isDisabled || input.options.length === 0 ? () => null : DropdownIndicator
                }} 
            />
            <Label htmlFor={input.id} style={{...input.labelStyle}}>
                {input.label} {input.required &&  `\u002A`} 
            </Label>
            {touched[input.name] && errors[input.name] && (
                <Error>
                    {errors[input.name]} 
                </Error>
            )}
        </Container>
     )
};

export default Select;
