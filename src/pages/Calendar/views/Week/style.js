import styled from 'styled-components'
import { ScrollBar } from '../../../../components'

const Container = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    width: 100%;
    height: 100%;
    display: grid;
    background: ${props => props.theme.surface};

    ${props => {
        const { config: { sidebar, header, length, d, h, pos,isAddingPeriod, small }} = props
        return {
            gridTemplateColumns: `${sidebar}px 1fr`,
            gridTemplateRows: `${header}px 1fr`,
            ".header": {
                "&__slider": {
                    width: `${d * length}px`,
                    gridTemplateColumns: `repeat(auto-fit, ${d}px)`,
                    transform: `translateX(${d * pos * -1}px)`,
                    transition: isAddingPeriod ? "none" : ".3s ease-in",
                    height: "4rem",
                    "> div": {
                        marginBottom: small ? "0rem" : "1rem"
                    }
                },
                "&__header": {
                    transform: `translateX(-${sidebar}px)`,
                    padding: small ? "0" : "0 4rem",
                    width: small ? `${d + sidebar}px` : "calc(100vw - 2rem)",
                    ":before": {
                        height: small ? "4rem" : "2.5rem",
                        width: `${sidebar}px`
                    }
                }
            },
            ".content": {
                gridTemplateColumns: `${sidebar}px 1fr`,
                maxHeight: `calc(100vh - 6.5rem - ${header}px)`,
                "&__slider": {
                    width: `${d * length}px`,
                    gridTemplateColumns: `repeat(auto-fit, ${d}px)`,
                    transform: `translateX(${d * pos * -1}px)`,
                    transition: isAddingPeriod ? "none" : ".3s ease-in"

                }
            },
            ".sidebar": {
                "&__list": {
                    "&__item": {
                        height: `${h}px`
                    }
                }
            },
            ".weekday": {
                width: `${d}px`,
                "&__content": {
                    height: `${h * 24}px`,
                    "&__item": {
                        height: `${h}px`
                    }
                }
            },
            ".item": {
                height: `${h}px`
            }
        }
    }}
`
const Content = styled(ScrollBar)`
    display: grid;
    grid-template-rows: max-content;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
`
const ContentView = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 3;
`

const ContentSlider = styled.div`
    display: grid;
    transition: all .3s ease-in;
    position: relative;

    .layout {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }
`

const GridLayoutItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.surface};
    padding: .2rem;
    box-shadow: ${props => props.hideBackground ? "none" : props.theme.boxShadow};
    border-radius: .2rem;
    position: relative;
    z-index:  5;
    transition: box-shadow .3s ease-in;

    .react-resizable-handle.react-resizable-handle-se {
        bottom: .2rem !important;
        right: .2rem !important;
    }
`

export {
    Container,
    Content,
    ContentView,
    ContentSlider,
    GridLayoutItem
}