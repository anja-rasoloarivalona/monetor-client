import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Container, Label, Error } from '../FormStyle'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ScrollBar } from '../../Scrollbar'
import { useOnClickOutside } from '../../../hooks'

const Content = styled.div`
    color: ${props => props.theme.text};

    ${props => {
        if(props.showList){

        } else {
            return {
                color: props.theme.text,
                ".value": {
                    fontSize: props.showPlaceholder ? "1.4rem" : "1.6rem"
                }
                
            }
        }
    }}
`

const CurrentValue = styled.div`
    width: 100%;
    height: 4.5rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
    background: ${props => props.theme.form.unfocused.background};
    border: 1px solid ${props => props.theme.form.unfocused.border};
    padding: 0 1.2rem;
    padding-right: 2rem;
    border-radius: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    ${props => {
        if(props.showList){
            return {
                border: `1px solid ${ props.theme.form.focused.border}`
            }
        }
    }}
`

const List = styled(ScrollBar)`
    position: absolute;
    width: 100%;
    right: 0;
    min-width: 15rem;
    border: 1px solid ${props => props.theme.form.focused.border};
    background: ${props => props.theme.background};
    z-index: 2;
    top: 6.5rem;
    border-radius: .5rem;
    color: ${props => props.theme.text};
    display: flex;
    flex-direction: column;
    max-height: 30vh;
    z-index: 9;


    ${props => {
        if(props.theme.type === "light"){
            return {
                background: props.theme.surface,
                boxShadow: "0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)",
                border: "none",
            }
        }
    }}
`
const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1.2rem;
    padding-right: 2rem;
    cursor: pointer;
    font-size: 1.4rem;



    ${props => {
        if(props.isListDisplayed){
            return {
                "&, :hover": {
                    background: props.isListDisplayed ? props.theme.onSurface : props.theme.textActive,
                    color: props.isListDisplayed ? props.theme.text : props.theme.background
                },
              
            }
        } else {
            return {
                ":hover": {
                    background: props.isListDisplayed ? props.theme.onSurface : props.theme.textActive,
                    color: props.isListDisplayed ? props.theme.text : props.theme.background
                }
            }
        }
    }}

    ${props => {
        if(props.theme.type === "light"){
            return {
                ":hover": {
                    background: props.theme.onSurface,
                    color: props.theme.text
                }

            }
        }
    }}
`

const CategoryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const SubList = styled.div`
    width: 100%;
    margin-top: 1rem;
`

const SubListItem = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    padding-left: .8rem;
    border-radius: .5rem;

    :hover {
        background: ${props => props.theme.textActive};
        color: ${props => props.theme.background};
    }
`

const Category = props => {

    const {
        settings: { locale },
        theme,
        categories
    } = useSelector(state => state)

    const [ showList, setShowList ] = useState(false)
    const [ displayedList, setDisplayedList ] = useState(false)
    const list = useRef()

    useOnClickOutside(list, () => {
        setShowList(false)
        setDisplayedList(false)
    })


    const  {input, currentValue, onChange, onBlur, touched, errors, values } = props

    const data = [ categories.income, ...Object.values(categories.expense) ]

    const onClickMasterCategory = categoryId => {
        if(categoryId !== displayedList || !displayedList){
            setDisplayedList(categoryId)
        } else {
            setDisplayedList(false)
        }
    }

    const onClickCategory = category => {
        onChange(input.id, category)
        setShowList(false)
        setDisplayedList(false)
    }

    useEffect(() => {
        if(displayedList){
            const el = document.getElementById(displayedList)
            if(el){
                el.scrollIntoView({
                    behavior: "smooth",
                    top: 0
                })
            }
         
        }
    },[displayedList])

    return (
        <Container>
            <Content
                showList={showList}
                showPlaceholder={!currentValue}
            >
                <Label className="label">
                    {input.label}
                </Label>
                <CurrentValue
                    className="value"
                    showList={showList}
                    onClick={() => setShowList(prev => !prev)}
                >
                    {values[input.id] ? values[input.id].locale[locale].title : "Select..."}
                    <FontAwesomeIcon icon="chevron-down"/>
                </CurrentValue>
            </Content>
            {showList && (
                <List ref={list}>
                    {data.map(category => (
                        <ListItem
                            id={category.id} 
                            key={category.id}
                            isListDisplayed={category.id === displayedList}
                        >
                            <CategoryItem onClick={() => onClickMasterCategory(category.id)}>
                                {category.locale[locale].title}
                                <FontAwesomeIcon icon="chevron-down"/>
                            </CategoryItem>
                            {displayedList === category.id && (
                                <SubList>
                                    {Object.values(category.children).map(sub => (
                                        <SubListItem
                                            key={sub.id}
                                            onClick={() => onClickCategory(sub)}
                                        >
                                            {sub.locale[locale].title}
                                        </SubListItem>
                                    ))}
                                </SubList>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
     )
};

export default Category;
