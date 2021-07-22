/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import SearchbarItem from './SearchbarItem'

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, .5);
    z-index: 1;
`

const Container = styled.div`
    display: flex;
    position: relative;
    z-index: 2;

    ${props => {
        if(props.isFocused){
            return {
                "input": {
                    width: "45rem"
                }
            }
        }
    }}
`
const InputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
`

const IconContainer = styled.div`
    width: 3.8rem;
    height: 3.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.form.unfocused.border};
    border-left: none;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;


    svg {
        font-size: 1.4rem;
    }
`

const Input = styled.input`
    height: 3.8rem;
    width: 35rem;
    padding: 0 1rem;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    transition: all .3s ease-in;

    :focus {
        outline: none;
    }
`

const Pannel = styled.div`
    position: absolute;
    top: -.7rem;
    left: -.7rem;
    z-index: 1;
    width: calc(100% + 1.4rem);
    height: 40vh;
    border-radius: 1.4rem;
    padding-top: 7rem;
    background: ${props => props.theme.surface};
    box-shadow: ${props => props.theme.boxShadow};
`

const PannelList = styled.div`
    padding: 0 2rem;
`


const Searchbar = () => {

    const [ search, setSearch ] = useState("")
    const [ currentSearch, setCurrentSearch ] = useState("")


    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isFocused, setIsFocused ] = useState(false) 
    const [ mounted, setMounted ] = useState(false)
    const [ results, setResults ] = useState(null)


    let timeout

    useEffect(() => {
        setMounted(true)
    },[])

    useEffect(() => {
        if(mounted){
            clearTimeout(timeout)
            if(search !== ""){
                timeout = setTimeout(() => {
                    setCurrentSearch(search)
                }, 1000)
            }
        }
    },[search])


    useEffect(() => {
        if(search && currentSearch){
            if(search === currentSearch){
                searchHandler(currentSearch)
            }
        }
    },[search, currentSearch])

    const searchHandler = async searchTerm => {
        try {
            const users = await axios.get("/user", {
                params: {
                    username: searchTerm.toLowerCase()
                }
            })
            setResults(users.data.data)
        } catch(err){
            console.log({
                err
            })
        }
    }

    const toggleStateHandler = action => {
        if(!isSubmitting){
            setIsFocused(action)
        }
    }

    return (
        <Container isFocused={isFocused}>
            <InputContainer>
                <Input 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => toggleStateHandler(true)}
                    // onBlur={() => toggleStateHandler(false)}
                />
                <IconContainer>
                    <FontAwesomeIcon icon="search"/>
                </IconContainer>
            </InputContainer>
            {isFocused && (
                <>
                    <Background />
                    <Pannel>
                        {results && (
                            <PannelList>
                                {results.map(user => (
                                    <SearchbarItem
                                        key={user.id} 
                                        user={user}
                                        isSubmitting={isSubmitting}
                                        setIsSubmitting={setIsSubmitting}
                                    />
                                ))}
                            </PannelList>
                        )}

                    </Pannel>
                </>
            )}
        </Container>
     )
};

export default Searchbar;
