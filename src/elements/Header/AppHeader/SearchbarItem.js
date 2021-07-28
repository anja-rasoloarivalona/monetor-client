/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Button, Loader } from '../../../components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;

    :hover {
        background: ${props => props.theme.background};
        .icon {
            background: ${props => props.theme.surface};
        }
        .cta_button {
            color: ${props => props.theme.white};
            padding: .3rem 0;
        }
        .cta_button_icon {
            background: ${props => props.theme.primary};
        }
    }

    .loader >  div {
        border-color: ${props => props.theme.white} transparent transparent transparent;
    }

    ${props => {
        if(props.isSubmitting){
            return {
                background: props.theme.background,
                ".icon": {
                    background: props.theme.surface
                },
                ".cta_button": {
                    color: props.theme.white,
                    width: "10rem",
                    background: props.theme.primary,
                    padding: ".3rem 0",

                },
                ".cta_button_icon": {
                    background: props.theme.primary
                }
            }
        }
    }}
`

const Label = styled.div`
    display: flex;
    align-items: center;
`

const LabelIcon = styled.div`
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.background};
    margin-right: 1rem;
    border-radius: 50%;

    svg {
        font-size: 1.5rem;
        color: ${props => props.themetextLight};
    }
`

const LabelInfo = styled.div`
    display: flex;
    flex-direction: column;
    height: 4rem;
    justify-content: space-between;
`

const LabelInfoUsername = styled.div`
    font-size: 1.6rem;
    line-height: 1.4;
`

const LabelInfoUserLocation = styled.div`
    font-size: 1.2rem;
    color: ${props => props.themetextLight};
`
const Cta = styled.div`
    margin-right: 1rem;
`

const CtaButton = styled.div`
    display: flex;
    align-items: center;
    border-radius: 1.6rem;
    width: 3rem;
    position: relative;
    overflow: hidden;
    :hover {
        transition: width .3s ease-in, padding .3s ease-in;
        background: ${props => props.theme.primary};
        width: 10rem;
        
        svg {
            transform: translateX(.6rem);
            transition: transform .3s ease-in;
        }
    }
`

const CtaButtonLabel = styled.div`
    font-size: 1.2rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(100% + .8rem);
    margin: auto;
    z-index: 1;
    width: max-content;
    display: flex;
    align-items: center;
`

const CtaButtonIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.2rem;
    background: ${props => props.theme.background};
    position: relative;
`

const SearchbarItem = props => {

    const { user, isSubmitting, setIsSubmitting } = props

    const { 
        text: { text }
    } = useSelector(state => state)

    const requestFriendship = async () => {
        try {
            setIsSubmitting(user.id)
            const res = await axios.post('/user/relation/request', {
                toId: user.id
            })
            if(res.status === 200){
                console.log({
                    res
                })
                setIsSubmitting(false)
            }
        } catch(err){
            console.log({
                err
            })
        }
    }

    return (
        <Container
            key={user.id}
            isSubmitting={isSubmitting && isSubmitting === user.id}
        >
            <Label>
                <LabelIcon className="icon">
                    <FontAwesomeIcon icon="user"/>
                </LabelIcon>
                <LabelInfo >
                    <LabelInfoUsername>
                        {user.firstname} {user.lastname}
                    </LabelInfoUsername>
                    <LabelInfoUserLocation>
                        {user.city}, {user.country}
                    </LabelInfoUserLocation>
                </LabelInfo >
            </Label>

            <Cta>
                <CtaButton
                    className="cta_button"
                    onClick={requestFriendship}
                >
                    <CtaButtonIcon className="cta_button_icon">
                        {isSubmitting ?
                            <Loader /> :
                            <FontAwesomeIcon icon="plus"/>
                        }
                        <CtaButtonLabel className="cta_button_label">
                            {text.add}
                        </CtaButtonLabel>
                    </CtaButtonIcon>

                </CtaButton>
            </Cta>
        </Container>
     )
};

export default SearchbarItem;
