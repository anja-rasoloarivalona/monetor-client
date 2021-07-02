import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import ReactSelect, { components } from 'react-select'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { Container, Label, Error } from '../FormStyle'



const Select = props => {

    const  { input, onChange, onBlur, errors, currentValue, touched } = props

    const {
        theme
    } = useSelector(state => state)


    const getStyle = () => {

        const unfocusedBorderStyle = `1px solid ${theme.form.unfocused.border}`
        const focusedBorderStyle = `1px solid ${theme.form.focused.border}`
        const errorStyle = `1px solid ${theme.error}`
    
        const background = theme.form.unfocused.background
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
                    boxShadow: "none",
                    height: "4.5rem",
                    border: touched && errors && touched[input.name] && errors[input.name] ?  errorStyle : state.isFocused ? focusedBorderStyle : unfocusedBorderStyle,
                    backgroundColor: background,
                    cursor: 'pointer',
                    paddingLeft: "1.2rem",
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
                    ...custom_control
                }
            },
            placeholder: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "transparent" : "transparent",
                // fontSize: font_size,
                marginLeft: 0,
            }),
            menu: (provided) => ({
                ...provided,
                zIndex: 14
            }),
            menuList: (provided) => ({
                ...provided,
                paddingTop: 0,
                paddingBottom: 0,
                borderRadius: "1rem",
                boxShadow: theme.form.boxShadow,
                backgroundColor: theme.form.unfocused.background,
                zIndex: 14
            }),
            option: (provided, state) => ({
                ...provided,
                height: "4.5rem",
                display: "flex",
                alignItems: "center",
                fontSize: "1.4rem",
                '&:hover': {
                    // backgroundColor: theme.form.select.optionHoverBackground,
                    // color: theme.form.select.optionColor
                },
                backgroundColor: theme.form.unfocused.background,
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

    return (
        <Container>
            <Label htmlFor={input.id} style={{...input.labelStyle}}>
                {input.label} {input.required &&  `\u002A`} 
            </Label>
            <ReactSelect 
                onChange={onChange}
                onBlur={onBlur ? onBlur : null}
                options={input.options}
                placeholder={input.required ? `${input.placeholder} \u002A` : input.placeholder} 
                isDisabled={input.isDisabled || input.options.length === 0}
                isSearchable={input.isSearchable ? true : false}
                value={input.options.filter(({value}) => value === currentValue)}
                styles={getStyle()}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: input.isDisabled || input.options.length === 0 ? () => null : DropdownIndicator
                }} 
            />
        </Container>
     )
};

export default Select;
