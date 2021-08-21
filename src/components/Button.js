import styled from 'styled-components';
import { AppLoader  as Loader } from './Loader'

const Button = styled.button`
    padding: 1rem 3rem;
    font-size: 1.4rem;
    letter-spacing: 0.37px;
    color: ${props => props.theme.white};
    border: none;
    border-radius: 500px;
    transition: background .4s, border .4s, color .4s, box-shadow .4s;
    cursor: pointer;
    background: ${props => props.theme.primary};

    :focus, :active {
        outline: none;
    }

    :hover {
        box-shadow: none;
    }

    > a {
        color: ${props => props.theme.white};
        text-decoration: none;
    }

    ${props => {
        if(props.square){
            return {
                borderRadius: ".2rem"
            }
        }
    }}


    ${props => {
        if(props.secondary){
            return {
                background: "white",
                border: `1px solid  ${props.theme.background}`,
                color: props.theme.background,
                marginRight: "10px"
            }
        }
    }}

    
    ${props => {
        if(props.transparent){
            return {
                background: "transparent",
                color: props.theme.primary,
                border: "1px solid transparent",
            }
        }
    }}

    ${props => {
        if(props.outlined){
            return {
                border: `1px solid ${props.theme.primary} !important`,
                background: "transparent",
                color: props.theme.primary,
            }
        }
    }}



    ${props => {
        if(props.isDisabled){
            return {
                background: props.theme.disabled.background,
                color: props.theme.disabled.color,
                cursor: "not-allowed",
                boxShadow: "none !important"
            }
        }
    }}
    

    ${props => {
        if(props.small){
            return {
                padding: "1rem 1.2rem",
                borderRadius: ".3rem"
            }
        }
        if(props.medium){
            return {
                padding: "1rem 2rem",
                borderRadius: ".3rem"
            }
        }
    }}

    ${props => {
        if(props.isLoading){
            return {
                position: "relative",
                zIndex: -1,
                opacity: 0
            }
        }
    }}

`;

const ButtonContainer = styled.div`
    position: relative;
`

const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonWithLoader = props => {
    return (
        <ButtonContainer className="submit">
            <Button {...props}>
                {props.children}
            </Button>
            {props.isLoading && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}
        </ButtonContainer>
    )
}

export {
    Button,
    ButtonWithLoader
};