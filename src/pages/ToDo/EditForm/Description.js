import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'
import { SectionTitle } from './style'
import { TextEditor } from '../../../components/Form/WithoutValidation'
import { Button } from '../../../components'

const Container = styled.div`
`

const CurrentDescription = styled.div`
    font-size: 1.4rem;
`

const TitleContainer  = styled.div`
    height: 3.4rem;
    display: flex;
    align-items: center;
`

const DescriptionInputContainer = styled.div`
    margin-top: 2rem;
    position: relative;
    padding-left: 4rem;
`

const DescriptionCta = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    padding-left: 4rem;
`

const EditButton = styled.div`
    padding: .7rem 2rem;
    background: ${props => props.theme.background};
    cursor: pointer;
    font-size: 1.4rem;
    margin-left: 1rem;
    font-weight: 400;
`

const Description = props => {

    const { description, setDescription, setIsEditingDescription , isEditingDescription } = props

    const {
        text: { text }
    } = useSelector(state => state)

    const [ currentDescription, setCurrentDescription ] = useState(description)


    // useEffect(() => {
    //     if(!description){
    //         setIsEditingDescription(true)
    //     }
    // },[])

    const input = useRef()

    const cancelHandler = () => {
        setCurrentDescription(description)
        setIsEditingDescription(false)
    }

    const saveHandler = () => {
        setDescription(currentDescription)
        setIsEditingDescription(false)
    }

    useOnClickOutside(input, () => {
        if(isEditingDescription && description){
            cancelHandler()
        }
    })

    return (
        <Container>
            <SectionTitle>
                <TitleContainer>
                    <FontAwesomeIcon  icon="bars"/>
                    {text.description}
                </TitleContainer>
                {description && !isEditingDescription && (
                    <EditButton onClick={() => setIsEditingDescription(true)}>
                        {text.edit}
                    </EditButton>
                )}
            </SectionTitle>
            <DescriptionInputContainer ref={input}>
                {isEditingDescription ? 
                    <>
                        <TextEditor
                            currentValue={currentDescription} 
                            input={{
                                placeholder: text.description
                            }}
                            onChange={setCurrentDescription}
                            onFocus={() => setIsEditingDescription(true)}
                        />
                        <DescriptionCta>
                            <Button
                                medium
                                onClick={saveHandler}
                            >
                                {text.save}
                            </Button>
                            <Button
                                small
                                transparent
                                onClick={cancelHandler}
                            >
                                {text.cancel}
                            </Button>
                        </DescriptionCta>
                    </>
                    :
                    <CurrentDescription dangerouslySetInnerHTML={{__html: description}}/>
                }
            </DescriptionInputContainer>         
        </Container>
     )
};

export default Description;
