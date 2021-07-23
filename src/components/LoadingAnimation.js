import styled from 'styled-components'

const LoadingAnimation = styled.div`
    position: relative;
    overflow: hidden;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    border-radius: 5px;

    @keyframes placeHolderShimmer{
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    };

    ${props => {
        return {
            width: `${props.width}%`,
            height: `${props.height}px`,
        }
    }}
`

export {
    LoadingAnimation
}