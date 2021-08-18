import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { DropDown } from '../../../elements'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOnClickOutside } from '../../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import TodoQuickForm from "../../Todo/TodoForm/TodoQuickForm"

const Container = styled.div`
    position: relative;
`

const Label = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.onSurface};
    padding-right: 1.5rem;
    font-size: 1.4rem;
    cursor: pointer;

    :hover {
        box-shadow: ${props => props.theme.boxShadow};
    }

`

const IconContainer = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.3rem;
        color: ${props => props.theme.textLight};
    }

 
 
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ListItem = styled.div`
    width: 100%;
    padding: 1.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
    border-radius: .5rem;
    :hover {
        background: ${props => props.theme.background};
    }
`
const Slider = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 35rem);
    grid-template-rows: max-content;
    transform: translateX(0%);
    transition: all .3s ease-in;
    ${props => {
        if(props.currentSection === "todo"){
            return {
                transform: "translateX(-100%)"
            }
        }
    }}
`

const SliderItem = styled.div`
    display: flex;
    flex-direction: column;
`

const HeaderAdd = () => {

    const dispatch = useDispatch()

    const {
        text: { text }
    } = useSelector(s => s)

    const configs = {
        main: {
            config: {
                w: 350,
                h: 200,
                style: {
                    right: 0
                }
            }
        },
        todo: {
            config: {
                w: 350,
                h: 350,
                style: {
                    right: 0
                }
            }
        }
    }

    const [ config, setConfig ] = useState(configs.main)
    const [ currentSection, setCurrentSection ] = useState("main")
    const [ showList, setShowList ] = useState(false)


    const container = useRef()

    useOnClickOutside(container, () => closeHandler())


    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }

    const closeHandler = () => {
        setShowList(false)
        toggleSectionHandler("main")
    }

    const listItems = [
        {id: "transactions", label: text.transactions, cta: () => openFormHandler("transactions")},
        {id: "todo", label: text.to_do, cta: () => toggleSectionHandler("todo")},
        {id: "note", label: text.note},
    ]

    const openFormHandler = id => {
        dispatch(actions.setForm({
            opened: id
        }))
        setShowList(false)
    }

    return (
        <Container ref={container}>
            <Label onClick={() => setShowList(prev => !prev)}>
                <IconContainer>
                    <FontAwesomeIcon icon="plus"/>
                </IconContainer>
                {text.add}
            </Label>
            {showList && (
                <DropDown
                    config={config.config}
                    closeHandler={closeHandler}
                >
                    <Slider currentSection={currentSection}>
                        <SliderItem>
                            <List>
                                {listItems.map(item => (
                                    <ListItem
                                        key={item.id}
                                        onClick={item.cta ? () => item.cta() : null}
                                    >
                                        {item.label}
                                    </ListItem>
                                ))}
                            </List>
                        </SliderItem>
                        <SliderItem>
                            <TodoQuickForm 
                                closeHandler={() => toggleSectionHandler("main")}
                            />
                        </SliderItem>
                    </Slider>
                </DropDown> 
            )} 
        </Container>
     )
};

export default HeaderAdd;
