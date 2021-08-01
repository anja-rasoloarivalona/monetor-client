import React, {useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { CustomDropdown } from '../../elements'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundSelector from '../Todo/Header/BackgroundSelector'
import { useOnClickOutside } from '../../hooks'

const Container = styled.div`
    height: 6rem;
    width: 100%;
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Section = styled.div``


const Slider = styled.div`
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
    padding: 0 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    border-radius: .5rem;
    :hover {
        background: ${props => props.theme.background};
    }
`

const SectionItem = styled.div``

const Header = props => {

    const { setIsManaginDashboard } = props

    const { 
        text : { text },
    } = useSelector(s => s)

    const settingsDropdown = useRef()

    const [ currentSection, setCurrentSection ] = useState("main")

    const configs = {
        main: {
            config: {
                w: 350,
                h: 200,
            },
            label: {
                text: text.settings,
                // icon: "cog",
                iconId: "cog",
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

    const toggleSectionHandler = view => {
        setConfig(configs[view])
        setCurrentSection(view)
    }

    const [ config, setConfig ] = useState(configs.main)
    const [ showList, setShowList ] = useState(null)

    useEffect(() => {
        if(!showList){
            toggleSectionHandler("main")
        }
    }, [showList])

    return (
        <Container>
            <Section>

            </Section>
            <Section>
                <SectionItem ref={settingsDropdown}>
                    <CustomDropdown
                        config={config.config}
                        label={config.label}
                        showList={showList}
                        setShowList={setShowList}
                        id="settings"
                    >
                        <Slider currentSection={currentSection}>
                            <List>
                                <ListItem onClick={() => toggleSectionHandler("background")}>{text.background}</ListItem>
                                <ListItem onClick={() => setIsManaginDashboard(true)}>{text.manage_card}</ListItem>
                            </List>
                            <BackgroundSelector 
                                closeHandler={() => {
                                    toggleSectionHandler("main")
                                    setShowList(null)
                                }}
                            />
                        </Slider>
                    </CustomDropdown>
                </SectionItem>
            </Section>
        </Container>
     )
};

export default Header;
