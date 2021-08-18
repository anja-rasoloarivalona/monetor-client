import React, {useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import HeaderAdd from './HeaderAdd'
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
                    <Section>
                        <SectionItem>
                            <HeaderSettings setIsManaginDashboard={setIsManaginDashboard} />
                        </SectionItem>
                        <SectionItem>
                            <HeaderAdd />
                        </SectionItem>
                    </Section>
                </>
            }
        </Container>
     )
};

export default Header;
