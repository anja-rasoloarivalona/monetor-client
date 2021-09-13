import React from 'react'
import styled, { keyframes } from 'styled-components'

const keyframe = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const LoaderContainer = styled.div`
    position: relative;
    width: 28.8px;
    height: 28.8px;
    ${props => {
        const { size } = props
        return {
            width: size,
            height: size,
        }
    }}
`

const Loader = styled.div`
    display: inline-block;
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    right: 0;
    margin: auto;

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${props => props.size};
        height: ${props => props.size};
        margin: ${props => props.margin};
        border:  ${props => `${ props.margin } solid ${props.theme.primary}`};
        border-radius: 50%;
        animation: ${keyframe} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${props => props.theme.primary} transparent transparent transparent;
    }

    div:nth-child(1) {
        animation-delay: -0.45s;
    }
    div:nth-child(2) {
        animation-delay: -0.3s;
      }
    div:nth-child(3) {
        animation-delay: -0.15s;
      }
`

const AppLoader = props => {
    const { size } = props

    const multiplyBy = size ? parseFloat(size) : 1

    const sizes = {
        container: `${28.8 * multiplyBy}px`,
        loader: `${25.6 * multiplyBy}px`,
        loaderMargin: `${3.2 * multiplyBy}px`
    }

    return (
        <LoaderContainer size={sizes.container}>
            <Loader
                size={sizes.loader}
                margin={sizes.loaderMargin}
                className="loader"
            >
                <div></div><div></div><div></div><div></div>
            </Loader>
        </LoaderContainer>
    
    )
}

const ComponentLoader = styled.div`
    overflow: hidden;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;

    @keyframes placeHolderShimmer{
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }
`

export {
    AppLoader,
    ComponentLoader
};