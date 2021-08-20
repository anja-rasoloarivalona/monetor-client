import React ,{useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import Cropper from 'react-easy-crop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import { Button  } from '../../components'
import getCroppedImage from './functions'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, .5);
    z-index: 99;
    display: flex;
    justify-content: center;
    padding: 8rem 0;
`

const Content = styled.div`
    width: 100%;
    max-width: 70rem;
    background: ${props => props.theme.surface};
    height: max-content;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: .5rem;
    position: relative;
    z-index: 2;
    overflow: hidden;
`

const CropperContainer = styled.div`
    position: relative;
    height: 50vh;
    width: 100%;
    background: #333;
    transition: all .3s ease-in;


    // .reactEasyCrop_CropAreaGrid {
    //     width: ${25 * (16 /9)}vh !important;
    //     height: 25vh !important;
    // }
`

const CropperPreview = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 8rem);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    background: #191919;
`

const CropperPreviewImage = styled.img`
    width: 90%;
    object-fit: container;
    // border-radius: 50%;
`



const Controllers = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8rem;
    padding: 0 2rem;
    transition: all .3s ease-in;
`
const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    .MuiSlider-root {
        color: ${props => props.theme.primary}
    }
`

const Label = styled.div`
    margin-right: 1.2rem;
    font-size: 1.3rem;
`

const RotateIconContainer = styled.div`
    display: flex;
    align-items: center;

    svg {
        color: ${props => props.theme.primary};
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        font-size: 1.3rem;
    }
`

const PreviewButton = styled.div`
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 2;
    font-size: 1.4rem;
    color: grey;
    cursor: pointer;
    :hover {
        color: white;
    }

    svg {
        margin-right: 1rem;
    }
`

const CloseButton = styled.div`
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    z-index: 4;
    font-size: 2rem;
    color: white;
    cursor: pointer;
`

const Cta = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2rem;
    height: 8rem;

    button {
    }
`

const ImageCropper = props => {

    const { image, closeHandler, saveHandler } = props

    const {
        text: { text }
    } = useSelector(state => state)

    const [ origin, setOrigin ] = useState(null)

    const [ result, setResult ] = useState(null)
    const [ crop, setCrop ] = useState({ x: 0, y: 0})
    const [ rotation, setRotation ] = useState(0)
    const [ zoom, setZoom ] = useState(1.5)
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null)
    const [ isPreviewing, setIsPreviewing ] = useState(false)


    useEffect(() => {
        initCropHandler()
    },[])

    const initCropHandler = () => {
        if(image.src){
            setOrigin(image)
        } else {
            let reader = new FileReader();

            console.log({
                image
            })

            reader.onload = function(e){
                image.src = e.target.result 
                console.log({
                    image
                })
                setOrigin(image)
            }
            reader.readAsDataURL(image)
        }
    }

    const previewHandler = useCallback(async () => {
        try {
            const prev = await getCroppedImage(
                image.src,
                croppedAreaPixels,
                rotation
            )
            setResult(prev)
            setIsPreviewing(true)
        } catch(err){
            console.log(err)
        }
    },[croppedAreaPixels, rotation]) 

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    const cancelHandler = () => {

    }

    const saveImage = () => {

    }

    if(!origin){
        return null
    }

    return (
        <Container>
            <Content isPreviewing={isPreviewing}>
                <CloseButton onClick={closeHandler}>
                    <FontAwesomeIcon icon="times"/>
                </CloseButton>
                {!isPreviewing && (
                    <PreviewButton onClick={previewHandler}>
                        <FontAwesomeIcon icon="eye"/>
                        {text.preview}
                    </PreviewButton>
                )}
                <CropperContainer className="crop-container">
                    {isPreviewing ?
                        <CropperPreview>
                            <CropperPreviewImage src={result}/>
                        </CropperPreview>
                        :
                        <Cropper 
                            image={origin.src}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={props.aspect || 1}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}   
                            cropShape={props.cropShape || "square"}
                            restrictPosition={false}   
                            // initialCroppedAreaPixels={{
                            //     width: `${25 * (16 /9)}vh`,
                            //     height: `${25}vh`
                            // }}          
                        />
                    }

                </CropperContainer>

                <Controllers className="controllers">
                    <SliderContainer>
                        <Label>Zoom</Label>
                        <Slider
                            defaultValue={1}
                            value={zoom}
                            min={.2}
                            max={3}
                            step={0.1}
                            aria-label="Zoom"
                            onChange={(e, zoom) => setZoom(zoom)}
                            className="slider"
                        />
                    </SliderContainer>
                    <RotateIconContainer>
                        <Label>{text.rotate_left}</Label>
                        <FontAwesomeIcon 
                            icon="undo-alt"
                            onClick={() => setRotation(prevRotation => prevRotation - 90)}
                        />
                    </RotateIconContainer>
                    <RotateIconContainer>
                        <Label>{text.rotate_right}</Label>
                        <FontAwesomeIcon 
                            icon="redo-alt"
                            onClick={() => setRotation(prevRotation => prevRotation + 90)}
                        />
                    </RotateIconContainer>             
                </Controllers>
                <Cta>
                    <Button
                        onClick={isPreviewing ? () => setIsPreviewing(false) : cancelHandler}
                        square
                        transparent
                    >
                        {isPreviewing ? text.change : text.cancel}
                    </Button>
                    <Button
                        onClick={saveImage}
                        square
                    >
                        {text.save}
                    </Button>       

                </Cta>
            </Content>
        </Container>
     )
};

export default ImageCropper;
