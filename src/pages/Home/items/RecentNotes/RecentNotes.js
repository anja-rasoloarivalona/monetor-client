import React from "react"
import styled from "styled-components"
import { HeaderCta, HeaderCtaItem, HeaderCtaItemIcon, HeaderLabel, Cta, CtaItem } from '../style'
import { useSelector } from 'react-redux'
import AppIcon from '../../../../icons'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Header = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2rem;
`

const RecentNotes = () => {
    const { 
        text: { text }
    } = useSelector(state => state)
    return (
        <Container>
            <Header>
                <HeaderLabel>{text.notes}</HeaderLabel>
            </Header>
            <HeaderCta>
                <HeaderCtaItem>
                    <HeaderCtaItemIcon>
                        <AppIcon id="plus"/>
                    </HeaderCtaItemIcon>
                </HeaderCtaItem>
                <HeaderCtaItem>
                    <HeaderCtaItemIcon>
                        <AppIcon id="ellipsis-h"/>
                    </HeaderCtaItemIcon>
                </HeaderCtaItem>
            </HeaderCta>
        </Container>
     )
};

export default RecentNotes;
