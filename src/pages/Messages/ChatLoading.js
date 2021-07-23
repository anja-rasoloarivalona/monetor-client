import React from "react"
import styled from "styled-components"
import { LoadingAnimation } from '../../components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    position: relative;
`


const Loading = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`


const MessageLoading = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-bottom: 1.6rem;

    > div:first-child {
        margin-bottom: 1rem
    }

    ${props => {
        if(props.isOdd){
            return {
                alignSelf: "flex-end",
                "> div": {
                    alignSelf: "flex-end",
                }
            }
        }
    }}
`

const ChatLoading = () => {

    const renderLoading = () => {
        const loadings = []
        for(let i = 0; i < 5; i++){
            const isOdd = i % 2
            loadings.push(
                <MessageLoading isOdd={isOdd}>
                   <LoadingAnimation width="100" height="20" />
                    <LoadingAnimation width="70" height="20" />
                </MessageLoading>
            )
        }
        return (
            <Loading>
                {loadings}
            </Loading>
        )
    }

    return (
        <Container>
            {renderLoading()}
        </Container>
     )
};

export default ChatLoading;
