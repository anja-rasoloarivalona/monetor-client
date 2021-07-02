import styled from 'styled-components';

const Button = styled.button`
    padding: 1rem 3rem;
    font-size: 1.4rem;
    letter-spacing: 0.37px;
    color: white;
    border: none;
    border-radius: 500px;
    transition: all 0.4s;
    cursor: pointer;
    background: ${props => props.theme.primary};

    :focus, :active {
        outline: none;
    }

    :hover {
        box-shadow: none;
    }

    > a {
        color: white !important;
        text-decoration: none;
    }




    ${props => {
        if(props.secondary){
            return {
                background: "white",
                border: `1px solid  ${props.theme.dynamic.medium}`,
                color: props.theme.dynamic.medium,
                marginRight: "10px"
            }
        }
    }}

    ${props => {
        if(props.disabled){
            return {
                background: "white",
                color: props.theme.dynamic.semi_bright,
                border: `1px solid ${props.theme.dynamic.semi_bright}`,
                cursor: "not-allowed",
                boxShadow: "none !important"
            }
        }
    }}
`;

export {
    Button
};