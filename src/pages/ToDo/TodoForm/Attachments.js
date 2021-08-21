import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { SectionTitle } from './style'
import { getTimeStamp } from '../../../functions'

const Container = styled.div`
    padding-left: 1rem;
    margin-top: 2rem;
    font-size: 1.4rem;
`

const Header = styled.div`
    margin-bottom: 1.6rem;
`

const List = styled.div`
`

const ListItem = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1.4rem;
    box-shadow: ${props => props.theme.boxShadowLight};
`

const ListItemPreview = styled.div`
    height: 10rem;
    min-width: ${() => 16 * 9 / 10}rem;
    background: ${props => props.theme.background};
    display: flex;
    align-items: center;
    justify-content: center;
`

const ListItemPreviewText = styled.div`
    text-transform: uppercase;
    font-size: 2rem;
    color: ${props => props.theme.textLight};
`

const ListItemPreviewImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: container;
`

const ListItemBody = styled.div`
    height: 100%;
    width: 100%;
    padding: 1rem 1.5rem;
    // background: ${props => props.theme.transparentSurface};
`   
const ListItemTitle = styled.div`
    font-weight: bold;
    line-height: 1.5;
`

const ListItemCtaContainer = styled.div``

const ListItemCta = styled.div``

const Attachments = props => {

    const { edited } = props

    const {
        text: { text },
        settings: { locale }
    } = useSelector(s => s)

    const checkUrl = url => url.match(/\.(jpeg|jpg|gif|png)$/) != null

    return (
        <Container>
            <Header>
                <SectionTitle>{text.attachments}</SectionTitle>
            </Header>
            <List>
                {edited.attachments.map(attachment => {
                    const isImage = checkUrl(attachment.url)
                    return (
                        <ListItem>
                            <ListItemPreview>
                                {isImage ?
                                    <ListItemPreviewImg src={attachment.url}/> :
                                    <ListItemPreviewText>
                                        {text.link}
                                    </ListItemPreviewText>
                                }
                            </ListItemPreview>
                            <ListItemBody>
                                <ListItemTitle>{attachment.title}</ListItemTitle>
                                <ListItemCtaContainer>
                                    <span>{getTimeStamp(attachment.createdAt, locale, { label: text.added })}</span> - 
                                    <span></span>
                                </ListItemCtaContainer>
                            </ListItemBody>
                        </ListItem>
                    )
                })}
            </List>
        </Container>
    )
};

export default Attachments;
