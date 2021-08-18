import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomDropdown, BackgroundSelector } from '../../../elements'

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


const Settings = props => {

    const { 
        text : { text },
    } = useSelector(s => s)

    const [ currentSection, setCurrentSection ] = useState("main")

    const configs = {
        main: {
            config: {
                w: 350,
                h: 20 + 2 * 50,
            },
            label: {
                text: text.settings,
                icon: "cog",
                floating: true
            }
        },
        background: {
            config: {
                w: 350,
                h: 600,
            },
            label: {
                text: text.background,
                icon: "arrow-left",
                floating: true,
                onClick: () =>   toggleSectionHandler("main")
            }
        }
    }
    
    const [ config, setConfig ] = useState(configs.main)


    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }

    useEffect(() => {
        if(props.showList && props.showList !== "settings"){
            toggleSectionHandler("main")
        }
    }, [props.showList])


    return (
        <Container>
            <CustomDropdown
                label={config.label}
                config={config.config}
                id="settings"
                showList={props.showList}
                setShowList={props.setShowList}
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
                            closeHandler={() => props.setShowList(null)}
                            element="todo"
                        />
                    </CurrentViewSlider>
                </CurrentView>

            </CustomDropdown>
        </Container>
     )
};

export default Settings;
