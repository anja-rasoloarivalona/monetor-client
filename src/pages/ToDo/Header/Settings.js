import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropDown, BackgroundSelector } from '../../../elements'
import { useOnClickOutside, useWindowSize } from '../../../hooks'

const Container = styled.div`
    margin-right: 2rem;
    position: relative;
`

const CurrentView = styled.div`
    width: 35rem;
    overflow-x: hidden;
    transition: all .3s ease-in;
    transform-origin: left;

    ${props => {
        if(props.currentSection === "background"){
            return {
                width: "52.5rem",
                ".current__view__slider": {
                    transform: "translateX(-35rem)"
                }
            }
        }
    }};
`

const CurrentViewSlider = styled.div`
    display: grid;
    grid-template-columns: 35rem 52.5rem;
    grid-templete-rows: max-content;
    transform: translateX(0);
    transition: all .3s ease-in;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ListItem = styled.div`
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    cursor: pointer;
    border-radius: .5rem;
    :hover {
        background: ${props => props.theme.background};
    }
`

const ListItemLabel = styled.div`
    font-size: 1.4rem;
`

const activeLabelStyle = (theme) => {
    return {
        boxShadow: theme.boxShadow,
        color: theme.text,
        background: theme.surface,
    }
}

const Label = styled.div`
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
        ${props => activeLabelStyle(props.theme)}
    };

    ${props => {
        if(props.active){
            return activeLabelStyle(props.theme)
        }
    }}

    svg {
        font-size: 1.3rem;
        color: inherit;
        margin-right: 1rem;
    }

`


const Settings = () => {

    const { 
        text : { text },
    } = useSelector(s => s)

    const [ currentSection, setCurrentSection ] = useState("main")
    const [ showList, setShowList ] = useState(false)

    const container = useRef()

    const configs = {
        main: {
            config: {
                w: 350,
                h: 3 * 45 + 20,
                style: {
                    right: 0
                }
            },
        },
        background: {
            config: {
                w: 525,
                h: 680,
                style: {
                    right: 0
                }
            }
        }
    }
    
    // const [ configs, setConfigs] = useState(initialConfigs)
    const [ config, setConfig ] = useState(configs.main)


    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }

    const closeHandler = () => {
        setShowList(false)
        toggleSectionHandler("main")
    }

    useOnClickOutside(container, () => {
        if(showList){
            closeHandler()
        }
    })

    useEffect(() => {
        if(showList && showList !== "settings"){
            toggleSectionHandler("main")
        }
    }, [showList])


    return (
        <Container ref={container}>
            <Label
                onClick={() => setShowList(prev => !prev)}
                active={showList}
            >
                <FontAwesomeIcon icon="cog"/>
                {text.settings}
            </Label>

            {showList && (
                <DropDown
                    config={config.config}
                    closeHandler={closeHandler}
                >
                    <CurrentView currentSection={currentSection}>
                        <CurrentViewSlider className="current__view__slider">
                            <List>
                                <ListItem>
                                    <ListItemLabel>
                                        Automation
                                    </ListItemLabel>
                                </ListItem>
                                <ListItem>
                                <ListItemLabel>
                                        {text.labels}
                                    </ListItemLabel>
                                </ListItem>
                                <ListItem onClick={() => toggleSectionHandler("background")}>
                                    <ListItemLabel>
                                        {text.background}
                                    </ListItemLabel>
                                    <FontAwesomeIcon icon="chevron-right"/>
                            </ListItem>
                            </List>
                            <BackgroundSelector 
                                element="todo"
                                closeHandler={force => force ? setShowList(false) : toggleSectionHandler("main")}
                                setConfig={setConfig}
                                config={configs.background.config}
                            />
                        </CurrentViewSlider>
                    </CurrentView>
                </DropDown>
            )}
        </Container>
     )
};

export default Settings;
