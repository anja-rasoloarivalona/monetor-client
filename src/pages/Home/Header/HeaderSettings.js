import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { DropDown, BackgroundSelector } from '../../../elements'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    position: relative;
`

const activeStyle = (theme) => {
    return {
        boxShadow: theme.boxShadow,
        color: theme.text,
        background: theme.surface,
    }
}


const IconContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    font-size: 1.4rem;
    cursor: pointer;
    position: relative;
    height: 3.5rem;
    border-radius: 1rem;
    color: ${props => props.theme.dynamicText};
    background: ${props => props.theme.onSurface};
    :hover {
        ${props => activeStyle(props.theme)}
    };

    ${props => {
        if(props.active){
            return activeStyle(props.theme)
        }
    }}

    svg {
        font-size: 1.3rem;
        color: inherit;
        margin-right: 1rem;
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
        background: {
            config: {
                w: 350,
                h: 700,
                style: {
                    right: 0
                }
            }
        }
    }

    const [ currentSection, setCurrentSection ] = useState("main")
    const [ config, setConfig ] = useState(configs.main)
    const [ showList, setShowList ] = useState(false)

    const container = useRef()

    useOnClickOutside(container, () => closeHandler())


    useEffect(() => {
        if(!showList){
            toggleSectionHandler("main")
        }
    }, [showList])


    
    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }

    const closeHandler = () => {
        setShowList(false)
        toggleSectionHandler("main")
    }

    
    return (
        <Container ref={container}>
            <IconContainer onClick={() => setShowList(prev => !prev)}>
                <FontAwesomeIcon icon="cog"/>
                {text.settings}
            </IconContainer>
            {showList && (
                <DropDown
                    config={config.config}
                    closeHandler={closeHandler}
                >
                    <Slider currentSection={currentSection}>
                        <SliderItem>
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
                            <BackgroundSelector 
                                closeHandler={force => force ? setShowList(false) : toggleSectionHandler("main")}
                                element="main"
                                config={configs.background.config}
                                setConfig={setConfig}
                            />
                        </SliderItem>
                    </Slider>
                </DropDown>
            )}
        </Container>

     )
};

export default HeaderSettings;
 