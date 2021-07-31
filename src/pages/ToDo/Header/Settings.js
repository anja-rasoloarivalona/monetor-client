import React, { useState, useEffect } from "react"
import styled from "styled-components"
import AnimtedDropDown from "./AnimatedDropDown";
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundSelector from './BackgroundSelector'

const Container = styled.div`
    margin-right: 2rem;
`

const CurrentView = styled.div`
    width: 35rem;
    overflow-x: hidden;
`

const CurrentViewSlider = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 35rem);
    grid-templete-rows: max-content;
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

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ListItem = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.background};
    }
`

const ListItemLabel = styled.div`
    font-size: 1.4rem;
`


const Settings = props => {

    const { 
        text : { text },
    } = useSelector(s => s)

    const initialConfig = {
        id: "settings",
        w: 350,
        h: 20 + 2 * 50,
        sectionTitle: {
            label: text.settings,
            icon: "cog"
        }
    }

    const [ currentSection, setCurrentSection ] = useState("main")
    const [ config, setConfig ] = useState(initialConfig)

    const isDisplayed = props.displayed && props.displayed.includes("settings")

    const configs = {
        main: {
            w: 350,
            h: 20 + 2 * 50,
            sectionTitle: {
                label: text.settings,
                icon: "cog"
            }
        },
        background: {
            w: 350,
            h: 600,
            sectionTitle: {
                label: text.background,
                icon: "chevron-left",
                onClick: () => toggleSectionHandler("main")
            }
        }
    }

    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }

    useEffect(() => {
        if(!isDisplayed){
            toggleSectionHandler("main")
        }
    },[isDisplayed])


    return (
        <Container>
            <AnimtedDropDown
                {...config}
                id="settings"
                isDisplayed={isDisplayed}
                setDisplayed={props.setDisplayed}
            >
                <CurrentView>
                    <CurrentViewSlider currentSection={currentSection}>
                        <List>
                            <ListItem>
                                <ListItemLabel>
                                    Automation
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
                            closeHandler={() => props.setDisplayed(null)}
                        />
                    </CurrentViewSlider>
                </CurrentView>

            </AnimtedDropDown>
        </Container>
     )
};

export default Settings;
