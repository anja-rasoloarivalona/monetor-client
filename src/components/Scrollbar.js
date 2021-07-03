import styled from 'styled-components'
import {isFirefox  } from 'react-device-detect'

const ScrollBar = styled.div`
    overflow-y: ${() => isFirefox ? "auto" : "overlay"};
    ::-webkit-scrollbar {
        width: 16px;
    }
    ::-webkit-scrollbar:hover {
        background: white;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: ${props => props.theme.text};
        border: 4px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        -webkit-border-radius: 7px;
        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    }
    ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(154, 154, 154);
    }
    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }
`
export {
    ScrollBar
}