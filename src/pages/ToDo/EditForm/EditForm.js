import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOnClickOutside } from '../../../hooks'
import { TextEditor } from '../../../components/Form/WithoutValidation'
import { Button } from '../../../components'
import AddComponent from "./AddComponent"

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: rgba(0,0,0, .3);
    display: flex;
    justify-content: center;
`
const CloseButton = styled.div`
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;

    svg {
        font-size: 2rem;
    }

    :hover {
        background: ${props => props.theme.background};
    }
`


const Content = styled.div`
    max-height: 90vh;
    min-height: 30vh;
    height: max-content;
    margin-top: 5vh;
    width: 90%;
    max-width: 80rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .5rem;
    position: relative;
    padding: 2rem;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    min-height: 3.5rem;
    width: 90%;
`

const HeaderTitle = styled.div`
    width: 100%;
    min-height: 3.5rem;
    display: flex;
    align-items: center;
    cursor: ${props => props.isEditingTitle ? "initial" : "cursor"};
    position: relative;

    svg {
        margin-right: .2rem;
        font-size: 2.4rem;
    }
`


const HeaderTitleLabel = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
    margin-left: 1rem;
    border: 1px solid transparent;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
`

const HeaderTitleInput = styled.input`
    height: 3.5rem;
    width: 100%;
    font-family: inherit;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    background: ${props => props.theme.form.unfocused.background};
    font-size: 1.6rem;
    padding: 0 1rem;
    border-radius: .3rem;
    font-weight: bold;

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.form.focused.border};
    }
`

const Body = styled.div`
    display: grid;
    grid-template-columns: 1fr 20rem;
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    width: 100%;
    margin-top: 3rem;
    column-gap 2rem;
`

const HeaderListName = styled.div`
    margin-left: 3.8rem;
    font-size: 1.4rem;
    color: ${props => props.theme.grey};
    margin-top: .5rem;
`


const Description = styled.div`
`

const DescriptionTitle = styled.div`
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;
    font-size: 1.6rem;

    svg {
        margin-right: 2.2rem;
        font-size: 1.8rem;
    }
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
    z-index: 9;
    padding-left: 4rem;
`


const EditForm = props => {

    const { edited, todoLists } = props

    const [ isEditingTitle, setIsEditingTitle ] = useState(false)
    const [ title, setTitle ] = useState(edited.title)
    const [ description, setDescription ] = useState(edited.content)

    const {
        text: { text }
    } = useSelector(state => state)

    const headerRef = useRef()
    const titleInputRef = useRef()

    useOnClickOutside(titleInputRef, () => {
        setIsEditingTitle(false)
    })

    useEffect(() => {
        if(isEditingTitle){
            titleInputRef.current.focus()
        }
    },[isEditingTitle])



    return (
        <Container>
            <Content>
                <CloseButton>
                    <FontAwesomeIcon 
                        icon="times"
                    />
                </CloseButton>
                <Header>
                    <HeaderTitle
                        ref={headerRef}
                        isEditingTitle={isEditingTitle}
                    >
                        <FontAwesomeIcon 
                            icon="pencil-alt"
                        />
                        {isEditingTitle ?
                            <HeaderTitleInput
                                ref={titleInputRef} 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            /> :
                            <HeaderTitleLabel onClick={() => setIsEditingTitle(true)}>
                                {edited.title}
                            </HeaderTitleLabel>
                        }
                    </HeaderTitle>
                    <HeaderListName>
                        {text.in_list} {todoLists[edited.todoListId].title}
                    </HeaderListName>
                </Header>
                
                
                <Body>
                    <Description>
                        <DescriptionTitle>
                            <FontAwesomeIcon 
                                icon="bars"
                            />
                            {text.description}
                        </DescriptionTitle>
                        <DescriptionInputContainer>
                            <TextEditor
                                currentValue={description} 
                                input={{
                                    placeholder: text.description
                                }}
                                onChange={setDescription}
                            />
                            <DescriptionCta>
                                <Button medium>
                                    {text.save}
                                </Button>
                            </DescriptionCta>
                        </DescriptionInputContainer>
                    </Description>

                    <AddComponent />
                </Body>
                
            </Content>
        </Container>
     )
};

export default EditForm;
