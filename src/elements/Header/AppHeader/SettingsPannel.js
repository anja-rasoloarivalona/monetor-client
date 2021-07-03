import React from "react"
import styled from "styled-components"
import {  useSelector, useDispatch } from 'react-redux'
import { RadioInput } from '../../../components/Form/WithoutValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../../../store/actions'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 3rem;
    margin-bottom: 2rem;
    margin-top: 1rem;
    color: ${props => props.theme.text};
`

const HeaderIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
    position: relative;
    cursor: pointer;

    svg {
        font-size: 1.8rem;
    }

    &:hover {
        :before {
            content: "";
            position: absolute;
            top: 0;
            left: .1rem;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 3rem;
            height: 3rem;
            background: ${props => props.theme.textActive};
            border-radius: 50%;
            z-index: -1;
        };
        svg {
            color: ${props => props.theme.surface}
        }
    }
 

  
`

const HeaderTitle = styled.div`
    font-size: 1.8rem;
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
`

const SectionTitle = styled.div`
    color: ${props => props.theme.textActive};
    font-size: 1.4rem;
    margin-bottom: .5rem;
`

const RadioInputContainer = styled.div`
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.onSurface};
    }

`

const SettingsPannel = () => {

    const dispatch = useDispatch()

    const {
        settings,
        text: { text, header },
        theme
    } = useSelector(state => state)

    const options = [
        {
            title: text.dark_mode, 
            options: [
                {label: text.on, value: true},
                {label: text.off, value: false}
            ],
            currentValue: theme.type === "dark",
            onChange: (value) => dispatch(actions.setTheme(value ? "dark" : "light"))
        },
        {
            title: text.language, 
            options: [
                {label: header.french, value: "fr"},
                {label:  header.english, value: "en"}
            ],
            currentValue: settings.locale
        },
        // {
        //     title: text.settings
        // }
    ]

    return (
        <Container>
            <Header>
                <HeaderIconContainer>
                    <FontAwesomeIcon icon="chevron-left"/>
                </HeaderIconContainer>
                <HeaderTitle>
                    {text.settings}
                </HeaderTitle>
            </Header>
           {options.map(option => (
               <Section key={option.title}>
                   <SectionTitle>
                       {option.title}
                   </SectionTitle>
                   {option.options && option.options.map(_option => (
                       <RadioInputContainer
                            key={_option.label}
                            onClick={() => option.onChange(_option.value)}
                        >
                            <RadioInput 
                                input={_option}
                                currentValue={option.currentValue}
                                onChange={option.onChange}
                        />
                       </RadioInputContainer>
                   ))}
               </Section>
           ))}
        </Container>
     )
};

export default SettingsPannel;
