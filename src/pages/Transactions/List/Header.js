import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Button } from '../../../components'
import { Input } from '../../../components/Form/WithoutValidation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Container = styled.div`
    padding: 3rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Section = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-left: 1rem;
    }
`

const SectionIcon = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.form.unfocused.border};
    border-radius: .5rem;
`

const SearchBar = styled.div`
    width: 4rem;
    height: 4rem;
    position: relative;
    transition: all .3s ease-in;
    overflow-x: hidden;

    input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 4rem;
        height: 4rem;
        border-radius: 0;
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
        border-left: none;
        width: 0rem;
        left: 4rem;
        z-index: 1;
        transition: all .3s ease-in;
        color: ${props => props.theme.text} !important;
    }

    ${props => {
        if(props.isSearching){
            return {
                width: "24rem",
                ".icon": {
                    borderRadius: ".5rem 0rem 0rem .5rem"
                },
                input: {
                    width: "20rem"
                }
            }
        }
    }}
`

const SearchBarIcon = styled(SectionIcon)`
    transition: all .3s ease-in;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
`

const AddButtonIcon = styled(SectionIcon)`

`

const Header = props => {

    const { search, setSearch } = props

    const inputRef = useRef()

    const [ isSearching, setIsSearching ] = useState(false)


    const toggleHandler = () => {
        if(!isSearching){
            setIsSearching(true)
            inputRef.current.focus()
        } else {
            setSearch("")
            setIsSearching(false)
        }
    }


    

    return (
        <Container>
            <Section>

            </Section>
            <Section>
                <SearchBar isSearching={isSearching}>
                    <SearchBarIcon 
                        onClick={toggleHandler}
                        className="icon"
                    >
                        <FontAwesomeIcon icon="search"/>
                    </SearchBarIcon>
                    <Input 
                        value={search}
                        onChange={setSearch}
                        customRef={inputRef}
                    />
                </SearchBar>
                <AddButtonIcon>
                    <FontAwesomeIcon icon="plus" />
                </AddButtonIcon>
            </Section>
        </Container>
     )
};

export default Header;
