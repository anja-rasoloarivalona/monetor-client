import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { serialize } from 'object-to-formdata'
import ImageCropper from "../../ImageCropper/ImageCropper"

const Container = styled.div`

`

const ImageContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 2rem;
    background: ${props => props.theme.background};
    cursor: pointer;

    svg {
        font-size: 1.7rem;
    color: ${props => props.theme.background ? props.theme.text : props.theme.textLight};

    }
`

const Pannel = styled.div`
    width: 30rem;
    height: 20rem;
    position: absolute;
    top: calc(100% + 2rem);
    z-index: 99;
    right: 0;
    background: yellow;
`

const UserProfileImage = () => {

    const [ show, setShow ] = useState(false)

    const [ image, setImage ] = useState(null)
    const [ showCropper, setShowCropper ] = useState(false)

    const selectFileHandler = list => {
        setImage(list[0])
        setShowCropper(true)
    }


    const uploadHandler = async img => {
        // try {
        //     const formData = serialize({ })
        //     formData.append("image", img)
        //     const res = await axios({
        //         url: "/user/profile/image",
        //         method: 'post',
        //         data: formData,
        //         headers: {
        //             accept: "*",
        //             "content-type": "multipart/form-data"
        //         }
        //     })
        //     console.log({
        //         res
        //     })
        // } catch(err){
        //     console.log({
        //         err
        //     })
        // }
    }

    return (
        <Container>
            <ImageContainer
                onClick={() => setShow(prev => !prev )}
            >
                <FontAwesomeIcon icon={faUser}/>
            </ImageContainer>   
            {show && (
                <Pannel>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={e => selectFileHandler(e.target.files)}
                        multiple={false}
                    />
                </Pannel>
            )}
            {showCropper && (
                <ImageCropper 
                    image={image}
                    closeHandler={() => setShowCropper(false)}
                    saveHandler={uploadHandler}
                />
            )}    
        </Container>
     )
};

export default UserProfileImage;
