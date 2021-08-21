import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropDown, BackgroundSelector } from '../../../elements'
import { useOnClickOutside } from '../../../hooks'

const Container = styled.div`
    margin-right: 2rem;
    position: relative;
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


const Label = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    position: relative;
    height: 3.5rem;
    border-radius: .4rem;
    border: 1px solid ${props => props.theme.line};
    color: ${props => props.theme.line};

    :hover {
        box-shadow: ${props => props.theme.boxShadow};
    }

    svg {
        font-size: 1.3rem;
        color: inherit;
        margin-left: 1rem;
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
      
            // label: {
            //     text: text.settings,
            //     icon: "cog",
            //     floating: true
            // }
        },
        background: {
            config: {
                w: 350,
                h: 640,
                style: {
                    right: 0
                }
            }
        }
    }
    
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
            <Label onClick={() => setShowList(prev => !prev)}>
                {text.settings}
                <FontAwesomeIcon icon="cog"/>
            </Label>

            {showList && (
                <DropDown
                    config={config.config}
                    closeHandler={closeHandler}
                >
                    <CurrentView>
                        <CurrentViewSlider currentSection={currentSection}>
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
                            />
                        </CurrentViewSlider>
                    </CurrentView>
                </DropDown>
            )}
        </Container>
     )
};

export default Settings;
