import React, { useState ,} from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { Link } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Container = styled.div`
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textLight};
`

const Header = styled.div`
    height: 6.5rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.background};
    padding: 0 2rem;
`

const HeaderLabel = styled.div`
    font-size: 1.8rem;
`

const HeaderIcon = styled.div`
    border-radius: 50%;
    position: relative;
    height: 3rem;
    display: flex;
    align-items: center;
    margin-right: 2rem;
    cursor: pointer;

    :hover {
        :before {
            content: "";
            position: absolute;
            top: 0;
            left: -70%;
            margin: auto;
            background: ${props => props.theme.background};
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            z-index: -1;
        }
    }



    svg {
        font-size: 1.5rem;
    }
`


const List = styled.ul`
    list-style: none;
    padding-top: 2rem;
`

const ListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 1.2rem 2rem 1.2rem 3rem;
    font-size: 1.4rem;
    position: relative;

    :hover {
        background: ${props => props.theme.background};
    }
`

const ListItemContent = styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.text} !important;
`

const ListItemIcon = styled.div`
    margin-right: 2rem;
    svg {
        font-size: 1.5rem;
    }
`


const ListItemLabel = styled.div`
`





const AppList = props => {

    const {
        text: { text }
    } = useSelector(state => state)

    const { setShowList, showList} = props

    return (
        <Container showList={showList}>
            {showList && (
                <>
                    <Header>
                        <HeaderIcon onClick={() => setShowList(prev => ({ ...prev, display: false}))}>
                            <FontAwesomeIcon icon="arrow-left"/>
                        </HeaderIcon>
                        <HeaderLabel>
                            {showList.label}
                        </HeaderLabel>
                    </Header>
                    <List>
                        {showList.subList.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemContent to={`/${showList.link}/${item.link}`}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={item.icon}/>
                                    </ListItemIcon>
                                    <ListItemLabel>
                                        {item.label}
                                    </ListItemLabel>
                                </ListItemContent>
                            </ListItem>
                        ))}
                    </List>

                </>
            )}
        </Container>
    )
}

export default AppList