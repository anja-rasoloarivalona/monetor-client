import React, { useState } from "react"
import styled from "styled-components"
import TextEditor from '../../../components/Form/WithoutValidation/TextEditor'
import { useSelector  } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.4rem;
`

const HeaderIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 1rem;
    font-size: 1.2rem;
`

const InputContainer = styled.div`
    width: 100%;
    box-shadow: ${props => props.theme.boxShadowLight};
`

const ListContainer = styled.div`
    margin-top: 2rem;
`

const ListHeader = styled.div`

`

const TodoQuickForm = props => {

    const { closeHandler } = props

    const {
        theme,
        text: { text }
    } = useSelector(s => s)

    const [ value, setValue ] = useState("")

    const submitHandler = () => {

    }

    const close = () => {
        setValue("")
        closeHandler()
    }

    return (
        <Container>
            <Header>
                <HeaderIcon onClick={close}>
                    <FontAwesomeIcon icon="arrow-left"/>
                </HeaderIcon>
                {text.to_do}
            </Header>
            <InputContainer>
                <TextEditor 
                    currentValue={value}
                    onChange={setValue}
                    submitHandler={submitHandler}
                    customStyle={{
                        background: theme.background,
                        ".textinput": {
                            minHeight: "10rem",
                            maxHeight: "15rem"
                        }
                    }}
                />    
            </InputContainer>
            <ListContainer>
                <ListHeader>
                    {text.unlisted_todo}
                </ListHeader>
            </ListContainer>
        </Container>
     )
};

export default TodoQuickForm;
