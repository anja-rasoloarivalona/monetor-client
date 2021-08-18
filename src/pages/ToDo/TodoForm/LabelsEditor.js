import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Input } from '../../../components/Form/WithoutValidation'
import { Button, Loader } from '../../../components'
import { useSelector, useDispatch  } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as actions from '../../../store/actions'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;

`

const InputContainer = styled.div`
    input {
        height: 3.5rem;
    }
`

const InputLabel = styled.div`
    font-size: 1.3rem;
    margin-bottom: .8rem;
`


const Colors = styled.div`
    margin: 2rem 0;
`

const ColorsLabel = styled.div`
    font-size: 1.3rem;
    margin-bottom: .8rem;

`

const ColorsList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 3.5rem;
    grid-auto-rows: 3.5rem;
    column-gap: .7rem;
    row-gap: .7rem;
 
`

const Color = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .4rem;
    cursor: pointer;

    svg {
        color: ${props => props.theme.white};
    }
`


const Cta = styled.div`
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 4rem;

    button {
        height: 4rem;
    }

    ${props => {
        if(props.isSubmitting){
            return {
                ".save > div": {
                    marginRight: "1rem"
                }
            }
        }
    }}
`

const CtaItem = styled.div`
    display: flex;
    &.save {
        justify-content: flex-end;
    }
`


const LabelsEditor = props => {

    const dispatch = useDispatch()

    const { colors, editedColor, setEditedColor } = props

    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ labelTitle, setLabelTitle ] = useState("")
    const [ labelColor, setLabelColor ] = useState(editedColor.color)

    // console.log({
    //     colors,
    //     labelColor,
    //     editedColor
    // })

    const {
        text: { text },
        user: {
            todoBoards,
            activeTodoBoardId
        }
    } = useSelector(s => s)


    useEffect(() => {
        if(editedColor){
            if(editedColor.title){
                setLabelTitle(editedColor.title)
            }
            setLabelColor(editedColor.color)
        }
    },[])

    const saveHandler = async () => {
        try {
            setIsSubmitting(true)
            const isNew = !editedColor.id
            const data = {
                type: "label",
                color: labelColor,
                title: labelTitle,
                boardId: activeTodoBoardId
            }
            if(!isNew){
                data.id = editedColor.id
            }

            const res = await axios({
                method: isNew ? "POST" : "PUT",
                url: "/todo",
                data
            })
            if(res.status === 200){
                const currentLabels =  todoBoards[activeTodoBoardId].labels
                if(isNew){
                    currentLabels.push(res.data.data)
                } else {
                    const updatedLabelIndex = currentLabels.findIndex(label => label.id === editedColor.id)
                    currentLabels[updatedLabelIndex] = res.data.data
                }
                dispatch(actions.setTodoBoardLabels({
                    labels: currentLabels,
                    boardId: activeTodoBoardId
                }))
                setIsSubmitting(false)
                setEditedColor(false)
            }
        } catch(err){
            console.log({
                err
            })
            setIsSubmitting(false)
        }
    }

    return (
        <Container>
            <InputContainer>
                <InputLabel>
                    {text.name}
                </InputLabel>
                <Input 
                    value={labelTitle}
                    onChange={setLabelTitle}
                    focusOnMount
                />
            </InputContainer>
            <Colors>
                <ColorsLabel>{text.color}</ColorsLabel>
                <ColorsList>
                    {colors.map((color, index) => (
                        <Color
                            style={{background: color}}
                            key={index}
                            onClick={() => setLabelColor(color)}
                        >
                            {labelColor === color && (
                                <FontAwesomeIcon icon="check" />
                            )}
                        </Color>
                    ))}
                </ColorsList>
            </Colors>
            <Cta isSubmitting={isSubmitting}>
                <CtaItem className="cancel">
                    <Button
                        transparent
                        onClick={() => setEditedColor(false)}
                    >
                        {text.cancel}
                    </Button>
                </CtaItem>
                <CtaItem className="save">
                    {isSubmitting ?
                        <Loader />
                        :
                        <>

                            <Button
                                onClick={saveHandler}
                                square
                            >
                                {text.save}
                            </Button>
                        </>
                    }  
                </CtaItem>

 
            </Cta>
        </Container>
     )
};

export default LabelsEditor;
