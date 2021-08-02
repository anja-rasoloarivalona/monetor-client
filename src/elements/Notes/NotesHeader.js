import React from "react"
import styled from "styled-components"
import Icon from '../../icons'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from '../../components/Form/WithoutValidation'
import * as actions from '../../store/actions'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.surface};
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const IconContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
        fill: ${props => props.theme.textLight};
        color:  ${props => props.theme.textLight};
        &.close {
            transform: rotate(45deg);
        }
    }

    :hover {
        background: ${props => props.theme.background};
    }
`

const SortContainer = styled.div`
    position: relative;
    .sort {
        background: ${props => props.theme.background};
        border-radius: .5rem;
        :hover {
            background: ${props => props.theme.onSurface};
        }
    }
`


const TopSection = styled.div`
    display: flex;
    align-items: center;
`


const Title = styled.h1`
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
`

const Cta = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
`

const SearchContainer = styled.div`
    height: 4rem;
    position: relative;
    width: 100%;
    margin-right: 1rem;
    input {
        border: none;
        background: ${props => props.theme.background};
    }
`

const SearchIcon = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 2rem;
    margin: auto;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: ${props => props.theme.textLight};
`


const NotesHeader = props => {

    const dispatch = useDispatch()

    const { search, setSearch, setIsAdding, setSort } = props

    const { 
        text: { text },
        notes: { open }
    } = useSelector(state => state)

    return (
        <Container
            className="notes-header"
            open={open}
        >
            <Top>
                <TopSection>
                    <IconContainer onClick={() => setIsAdding(true)}>
                        <Icon id="plus"/>
                    </IconContainer>
                </TopSection>
                <TopSection>
                    <IconContainer>
                        <Icon id="cog"/>
                    </IconContainer>
                    <IconContainer onClick={() => dispatch(actions.toggleNotes(!open))}>
                        {open ?
                            <Icon id="plus" className="close"/>
                            :
                            <Icon icon={faSquare} />
                        }
                    </IconContainer>
                </TopSection>
            </Top>
            <Title>
                {text.notes}
            </Title>
            <Cta>
                <SearchContainer>
                    <Input 
                        value={search}
                        onChange={setSearch}
                        placeholder={`${text.search}...`}
                    />
                    <SearchIcon>
                        <Icon icon="search"/>
                    </SearchIcon>
                </SearchContainer>
                <SortContainer onClick={() => setSort(prev => prev === "ascendant" ? "descendant" : "ascendant")}>
                    <IconContainer className="sort">
                            <Icon id="sort" />
                    </IconContainer>
                </SortContainer>
            </Cta>
   
        </Container>
     )
};

export default NotesHeader;
