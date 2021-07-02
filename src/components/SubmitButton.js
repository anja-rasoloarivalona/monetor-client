import React from "react"
import styled from "styled-components"
import { Button, Loader } from './index'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const SubmitButton = props => {

    const { isSubmitting, label, onClick, submitButtonStyle, disabled, secondaryLabel, onClickSecondary } = props

    return (
        <Container>
            {isSubmitting ?
                <Loader /> :
                <>
                    {secondaryLabel && onClickSecondary && (
                        <Button
                            onClick={onClickSecondary}
                            secondary type="button"
                        >
                            {secondaryLabel}
                        </Button>
                    )}
                    <Button
                        onClick={onClick}
                        type="submit"
                        disabled={disabled}
                    > 
                        {label}
                    </Button>
                </>
            }
        </Container>
     )
};

export {
    SubmitButton
};
