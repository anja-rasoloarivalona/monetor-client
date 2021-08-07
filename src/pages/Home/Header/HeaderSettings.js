import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import BackgroundSelector from '../../Todo/Header/BackgroundSelector'
import { DropDown } from '../../../elements'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    position: relative;
`

const IconContainer = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${props => props.theme.onSurface};

    svg {
        font-size: 1.3rem;
        color: ${props => props.theme.textLight};
    }

    :hover {
        box-shadow: ${props => props.theme.boxShadow};
    }

 
`

const Slider = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 35rem);
    grid-template-rows: max-content;
    transform: translateX(0);
    transition: all .3s ease-in;
    ${props => {
        if(props.currentSection === "background"){
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

const Header = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    font-size: 1.4rem;
    color: ${props => props.theme.text};
`

const HeaderIcon = styled.div`
    margin-right: 1rem;
    font-size: 1.4rem;
    color: ${props => props.theme.text};
    ${props => {
        if(props.onClick){
            return {
                cursor: "pointer"
            }
        }
    }}
`

const HeaderTitle = styled.div`
    border-bottom: 1px solid ${props => props.theme.form.unfocused.border};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
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

const ListItemLabel = styled.div``

const ListItemIcon = styled.div`

`

const HeaderSettings = props => {

    const { setIsManaginDashboard } = props

    const {
        text: { text }
    } = useSelector(s => s)

    const container = useRef()




    const configs = {
        main: {
            config: {
                w: 350,
                h: 200,
                style: {
                    right: 0
                }
            },
            title: {
                text: text.settings,
                icon: "cog",
            }
        },
        background: {
            config: {
                w: 350,
                h: 700,
                style: {
                    right: 0
                }
            },
            title: {
                text: text.background,
                icon: "arrow-left",
                onClick: () =>   toggleSectionHandler("main")
            }
        }
    }

    const [ currentSection, setCurrentSection ] = useState("main")
    const [ config, setConfig ] = useState(configs.main)
    const [ showList, setShowList ] = useState(false)


    useOnClickOutside(container, () => {
        setShowList(false)
        toggleSectionHandler("main")
    })

    useEffect(() => {
        if(!showList){
            toggleSectionHandler("main")
        }
    }, [showList])


    
    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }


    const renderHeader = props => {
        const { text, icon, onClick } = props
        return (
            <Header>
                <HeaderTitle>
                    <HeaderIcon onClick={onClick || null}>
                        <FontAwesomeIcon icon={icon} />
                    </HeaderIcon>
                    {text}
                </HeaderTitle>
            </Header>
        )
    }


    return (
        <Container ref={container}>
            <IconContainer onClick={() => setShowList(prev => !prev)}>
                <FontAwesomeIcon icon="cog"/>
            </IconContainer>
            <DropDown
                config={config.config}
                show={showList}
            >
                <Slider currentSection={currentSection}>
                    <SliderItem>
                        {renderHeader({
                            text: text.settings,
                            icon: "cog"
                        })}
                        <List>
                            <ListItem onClick={() => toggleSectionHandler("background")}>
                                <ListItemLabel>
                                    {text.background}
                                </ListItemLabel>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon="chevron-right"/>
                                </ListItemIcon>
                            </ListItem>
                            <ListItem onClick={() => setIsManaginDashboard(true)}>{text.manage_card}</ListItem>
                        </List>
                    </SliderItem>
                    <SliderItem>
                        {renderHeader({
                            text: text.background, 
                            icon: "arrow-left",
                            onClick: () => toggleSectionHandler("main")
                        })}
                        <BackgroundSelector 
                            closeHandler={() => {
                                toggleSectionHandler("main")
                                setShowList(null)
                            }}
                        />
                    </SliderItem>
                </Slider>
            </DropDown>
        </Container>

     )
};

export default HeaderSettings;
 