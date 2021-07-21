import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition } from "react-transition-group";
import { useOnClickOutside } from '../../hooks'
import * as actions from '../../store/actions'

const Container = styled.div`
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    z-index: 9;
`

const Toggle = styled.div`
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.primary};
    cursor: pointer;
    box-shadow: ${props => props.theme.boxShadow};
    position: relative;
    z-index: 2;

    svg {
        color: white;
        font-size: 3.5rem;
        transition: all .3s ease-in;
    }

    ${props => {
        if(props.showList){
            return {
                svg: {
                    transform: "rotate(45deg)"
                }
            }
        }
    }}
`

const ToggleContainer = styled.div`
    position: absolute;
    bottom: 8rem;
    right: 0;
    width: 30rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
    transition: all 0.3s ease-in;
    opacity: 0;
    transform: translateY(3rem);
    z-index: 1;
    padding: 0 2rem;
    border-radius: .3rem;

    &.entering,
    &.entered {
        opacity: 1;
        transform: translateY(0px);
    }
    &.exiting,
    &.exited {
        opacity: 0;
        transform: translateY(3rem);
    }

`

const ToggleClose = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    font-size: 1.6rem;
`

const ToggleHeader = styled.div`
    padding-top: 2rem;
    padding-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    border-bottom: ${props => `1px solid ${props.theme.form.unfocused.border}`};
    color: ${props => props.theme.form.unfocused.color};

    svg {
        margin-right: 1rem;
    }
`

const ToggleList = styled.ul`
    list-style: none;
    padding: 1rem 0;
`

const ToggleListItem = styled.div`
    padding: 2rem 1rem;
    border-radius: .5rem;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.background};
    }

    svg {
        margin-right: 2rem;
    }
`

const AddComponent = () => {

    const {
        text: { text }
    } = useSelector(state => state)

    const [ showList, setShowList ] = useState(false)

    const container = useRef()

    const dispatch = useDispatch()

    useOnClickOutside(container, () => setShowList(false))



    const list = [
        {
            id: "transaction",
            label: text.transaction,
            icon: "coins",
        },
        {
            label: text.to_do,
            icon: "list",
            id: "todo",
        },
        {
            label: text.wallet,
            icon: "credit-card",
            id: "wallet"
        },
        {
            label: text.budget,
            icon: "piggy-bank",
            id: "budget"
        }
    ]

    return (
        <Container ref={container}>
            <Toggle
                onClick={() => setShowList(prev => !prev)}
                showList={showList}
            >
                <FontAwesomeIcon icon="plus"/>
            </Toggle>
            <Transition timeout={500} in={showList}>
               {state => (
                   <ToggleContainer className={state}>
                       <ToggleClose onClick={() => setShowList(false)}>
                           <FontAwesomeIcon icon="times"/>
                       </ToggleClose>
                       <ToggleHeader>
                           <FontAwesomeIcon icon="plus"/>
                           {text.add}
                       </ToggleHeader>
                       <ToggleList>
                           {list.map(item => (
                               <ToggleListItem
                                    key={item.id}
                                    onClick={() => dispatch(actions.setForm({ opened: item.id }))}
                                >
                                   <FontAwesomeIcon icon={item.icon}/>
                                   {item.label}
                               </ToggleListItem>
                           ))}
                       </ToggleList>
                   </ToggleContainer>
               )}
            </Transition>

        </Container>
     )
};

export default AddComponent;
