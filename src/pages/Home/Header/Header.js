import React, {useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { CustomDropdown } from '../../../elements'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from '../../../hooks'
import HeaderSettings from './HeaderSettings'
import HeaderDashboardManager from "./HeaderDashboardManager";

const Container = styled.div`
    height: 6rem;
    width: 100%;
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 2rem;
`

const Section = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-left: 1rem;
    }
`


const SectionItem = styled.div``

const Header = props => {

    const {isManagingDashboard, isSavingDashboardChanges, setIsManaginDashboard, cancelDashboardChangesHandler, saveDashboardChangesHandler } = props

    const { 
        text : { text },
    } = useSelector(s => s)

    const rightSection = useRef()

    const [ showList, setShowList ] = useState(null)

    useOnClickOutside(rightSection, () => setShowList(null))


    return (
        <Container>
            {isManagingDashboard ?
                <HeaderDashboardManager 
                    isSavingDashboardChanges={isSavingDashboardChanges}
                    saveDashboardChangesHandler={saveDashboardChangesHandler}
                    cancelDashboardChangesHandler={cancelDashboardChangesHandler}
                /> :
                <>
                    <Section>

                    </Section>
                    <Section ref={rightSection}>
                        <SectionItem>
                            <HeaderSettings 
                                setIsManaginDashboard={setIsManaginDashboard}
                                showList={showList}
                                setShowList={setShowList}
                            />
                        </SectionItem>
                        <SectionItem>
                            <CustomDropdown
                                showList={showList}
                                setShowList={setShowList}
                                id="add"
                                config={{
                                    w: 350,
                                    h: 600,
                                }}
                                label={{
                                    text: text.add,
                                    icon: "plus",
                                }}
                            >

                            </CustomDropdown>
                        </SectionItem>
                    </Section>
                </>
            }
        </Container>
     )
};

export default Header;
