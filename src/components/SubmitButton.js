import React from "react"
import styled from "styled-components"
import { Button, Loader } from './index'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    button {
        margin: 0 2rem;
    }
`

const SubmitButton = props => {

    const { isSubmitting, label, onClick, submitButtonStyle, disabled, secondaryLabel, onClickSecondary, secondaryButtonStyle } = props

    return (
        <Container>
            {isSubmitting ?
                <Loader /> :
                <>
                    {secondaryLabel && onClickSecondary && (
                        <Button
                            onClick={onClickSecondary}
                            secondary type="button"
                            style={{...secondaryButtonStyle}}
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
