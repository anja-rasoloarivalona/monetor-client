import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '../../../components'
import { AnimatedDropdown, CustomDropdown } from '../../../elements'

const Content = styled.div`
    margin-right: 2rem;
`

const Contact = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    padding: 0 1rem;
    cursor: pointer;
    border-radius: .4rem;
    :hover {
        background: ${props => props.theme.background};     
        .image__container {
            background: ${props => props.theme.surface};
        }
    }
`
const ContactLabel = styled.div`
    display: flex;
    align-items: center;
`

const ContactLabelImageContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.background};
    border-radius: 50%;
    margin-right: 2rem;
    svg {
        font-size: 1.4rem;
    }
`

const ContactLabelImage = styled.img`
`

const ContactLabelName = styled.div`
    font-size: 1.4rem;
`

const ContactCheckBox = styled.div`
    width: 2rem;
    height: 2rem;
    border: 1px solid ${props => props.theme.form.unfocused.border};
    ${props => {
        if(props.checked){
            return {
                background: props.theme.primary
            }
        }
    }}
`

const Cta = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 6rem;
`

const InviteMember = props => {

    const { 
        text : { text },
        user: { contacts }
    } = useSelector(s => s)

    const [ selected, setSelected ] = useState([])

    const toggleHandler = id => {
        setSelected(prev => {
            if(prev.includes(id)){
                return prev.filter(i => i !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    const data = [...contacts, ...contacts, ...contacts]

    const label = {
        icon: "users",
        text: text.invite_members,
        floating: true
    }

    const config = {
        w: 350,
        h: data.length * 50 + 20 + 60,
    }


    return (
        <Content> 
            <CustomDropdown
                label={label}
                config={config}
                showList={props.showList}
                setShowList={props.setShowList}
                id="invite"
            >
                {data.map(contact => {
                    const data = contact.user
                    return (
                        <Contact onClick={() => toggleHandler(data.id)}>
                            <ContactLabel>
                                <ContactLabelImageContainer className="image__container">
                                    <FontAwesomeIcon icon="user"/>
                                </ContactLabelImageContainer>
                                <ContactLabelName>
                                    {data.firstname} {data.lastname}
                                </ContactLabelName>
                            </ContactLabel>
                            <ContactCheckBox
                                checked={selected.includes(data.id)}
                            >
                            </ContactCheckBox>
                        </Contact>
                    )
                })}
                <Cta>
                    <Button square small outlined>
                        {text.save}
                    </Button>
                </Cta>
            </CustomDropdown>
        </Content>
    )
};

export default InviteMember;
