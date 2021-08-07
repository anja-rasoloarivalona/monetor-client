import React from "react"
import styled from "styled-components"
import { Button, Loader } from '../../../components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;

    > button {
        margin-left: 2rem;
    }
`

const HeaderDashboardManager = props => {

    const { cancelDashboardChangesHandler, saveDashboardChangesHandler, isSavingDashboardChanges } = props

    const {
        text: { text }
    } = useSelector(state => state)

    return (
        <Container>
            {isSavingDashboardChanges ?
                <Loader /> :
                <>
                    <Button
                        transparent
                        onClick={cancelDashboardChangesHandler}
                    >
                        {text.cancel}
                    </Button>
                    <Button
                        onClick={saveDashboardChangesHandler}
                    >
                        {text.save}
                    </Button>
                </>
            }
        </Container>
     )
};

export default HeaderDashboardManager;
