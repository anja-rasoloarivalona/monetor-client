import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import Chat from '../../pages/Messages/Chat'
import MessageBar from "../../pages/Messages/MessageBar";
import { ScrollBar } from '../../components'
import { ResizableBox } from 'react-resizable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Header = styled.div`
    width: 100%;
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HeaderCta = styled.div`
    width: 5rem;
    height: 4rem;
    background: red;
`


const AvatarContainer = styled.div`
    position: fixed;
    z-index: 9999;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    background: ${props => props.theme.surface};

    > div {
        width: 6rem;
        height: 6rem;

        svg {
            font-size: 2rem;
        }
    }
`

const Avatar = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`



const Body = styled(ScrollBar)`
    flex: 1;
    position: relative;
`


const DraggableMessage = props => {

    const {current  } = props

    const dispatch = useDispatch()

    const {
        text: { text },
        theme
    } = useSelector(state => state)

    const [ messageBarHeight, setMessageBarHeight ] = useState(null)
    const [ opened, setOpened ] = useState(false)
    const [ isDragging, setIsDragging] = useState(false)

    if(!current){
        return null
    }

    const style = {
        position: "fixed",
        zIndex: 999,
        boxShadow: theme.boxShadow,
        display: "flex",
        flexDirection: "column",
        maxHeight: "60rem",
        borderRadius: ".6rem",
        background: theme.onSurface,
        height: "max-content",
        width: "60rem"
    }

    const dragHandler = e => {
        const value = e.type === "mousedown"
        const timeout = value ? 0 : 0.1
        setTimeout(() => {
            setIsDragging(value)
        }, timeout)
    }

    const toggleHandler = () => {
        if(!isDragging){
            setOpened(prev => !prev)
        }
    }


    return (
            <Draggable
                handle=".drag-header" 
                onStart={dragHandler}
                onStop={dragHandler}
            >

                {opened ?
                    <ResizableBox style={style} width={600} height={600}>
                        <Header className="drag-header">
                            <Avatar>
                                <FontAwesomeIcon icon="user" />
                            </Avatar>
                            <HeaderCta onClick={toggleHandler} />
                        </Header>
                        <Body>
                            <Chat 
                                current={current}
                                messageBarHeight={messageBarHeight} 
                            />
                        </Body>
                        <MessageBar
                            current={current}
                            messageBarHeight={messageBarHeight} 
                            setMessageBarHeight={setMessageBarHeight} 
                            rounded={true}
                        />
                    </ResizableBox> :
                    <AvatarContainer
                        className="drag-header"
                        onClick={toggleHandler}
                    >
                        <Avatar>
                            <FontAwesomeIcon icon="user" />
                        </Avatar>
                    </AvatarContainer>                                 
                }
            </Draggable>
     )
};

export default DraggableMessage;
