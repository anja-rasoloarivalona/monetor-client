import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'
import { SectionTitle } from './style'
import { TextEditor } from '../../../components/Form/WithoutValidation'
import { Button } from '../../../components'

const Container = styled.div`
    padding-left: 1rem;
`

const CurrentDescription = styled.div`
    font-size: 1.4rem;
    margin-top: 1.6rem;
    padding-left: 1rem;
`

const Title  = styled.div`
    height: 3.4rem;
    display: flex;
    align-items: center;
`


const DescriptionInputContainer = styled.div`
    margin-top: 1rem;
    position: relative;
`

const DescriptionCta = styled.div`
    margin-top: 1rem;
`

const EditButton = styled.div`
    padding: .7rem 2rem;
    background: ${props => props.theme.background};
    cursor: pointer;
    font-size: 1.4rem;
    margin-left: 1rem;
    font-weight: 400;
`
const Placeholder = styled.div`
    font-size: 1.4rem;
    margin-top: 1.6rem;
    padding: 1.5rem;
    width: 100%;
    background: red;
    height: 10.7rem;
    border-radius: .5rem;
    background: ${props => props.theme.background};
    cursor: pointer;
`

const Description = props => {

    const { description, setDescription, setIsEditingDescription , isEditingDescription } = props

    const {
        text: { text },
        theme
    } = useSelector(state => state)


    const [ currentDescription, setCurrentDescription ] = useState(description)
    const [ focusOnMount, setFocusOnMount ] = useState(description === null)

    const descriptionIsEmpty = description === "<p><br></p>"


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
                <Title>
                    {text.description}
                </Title>
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
                            focusOnMount={focusOnMount}
                            currentValue={currentDescription} 
                            placeholder={text.description}
                            onChange={setCurrentDescription}
                            customStyle={{
                                border: `1px solid ${theme.form.unfocused.border}`
                            }}
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
                    description ?
                    <CurrentDescription dangerouslySetInnerHTML={{__html: description}}/>
                    :
                    <Placeholder onClick={() => setIsEditingDescription(true)}>
                        {text.add_a_detailed_description}
                    </Placeholder>
                }
            </DescriptionInputContainer>         
        </Container>
     )
};

export default Description;
