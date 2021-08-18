import styled from 'styled-components'

const List = styled.div`
    list-style: none;
`

const ListItem = styled.li`
    width: 100%;
    font-size: 1.4rem;
    border-radius: .3rem;
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-template-rows: 4rem max-content;
`
const ListItemCheckboxContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    ${props => {
        if(props.disabled){
            return {
                cursor: "default",
                " > div": {
                    border: `none`,
                    background: props.theme.background,
                    cursor: "default !important"
                }
            }
        }
    }}
`

const ListItemCheckbox = styled.div`
    width: 2rem;
    height: 2rem;
    border: 1px solid ${props => props.themetextLight};
    border-radius: .3rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
`

const ListItemCheck = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: ${props => props.theme.background};
    }
`

const ListItemLabel = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.2rem;
    cursor: pointer;
    position: relative;

    :hover {
        background: ${props => props.theme.background};
    }


`

const ListItemLabelText = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;

    ${props => {
        if(props.isChecked){
            return {
                textDecoration: "line-through"
            }
        }
    }}
`

const ListItemLabelCta = styled.div`
    display: flex;
    align-items: center;
`

const ListItemLabelDueDate = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.background};
    padding: .5rem 1rem;
    height: min-content;
    border-radius: .5rem;
    cursor: pointer;

    svg {
        margin-right: 1rem;
    }
`

const ListItemInput = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    position: relative;

    ${props => {
        if(!props.checkList || props.checkList.length === 0){
            return {
                gridColumn: "1 / 3"
            }
        }
    }}
`

const ListItemCta = styled.div`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${props => {
        if(!props.checkList || props.checkList.length === 0){
            return {
                gridColumn: "1 / 3"
            }
        }
    }}
`

const ListItemCtaSection = styled.div`
    display: flex;
    align-items: center;

    button:first-child {
        margin-right: 1rem;
    }
`

export {
    List,
    ListItem,
    ListItemCheckboxContainer,
    ListItemCheckbox,
    ListItemLabel,
    ListItemInput,
    ListItemCta,
    ListItemLabelText,
    ListItemCtaSection,
    ListItemLabelCta,
    ListItemLabelDueDate,
    ListItemCheck
}