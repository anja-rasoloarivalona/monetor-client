import React from "react"
import styled from "styled-components"
import { usePreview } from 'react-dnd-preview';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { AppDate  } from '../../components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding:  1rem;
  box-shadow: ${props => props.theme.boxShadowLight};
  border-radius: .3rem;
`


const Title = styled.div`
    font-size: 1.4rem;
    flex: 1;
    line-height: 1.4;
    width: 100%;
`

const Cta = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${props => props.theme.grey};
`


const CtaDueDate = styled.div`
    display: flex;
    align-items: center;
    padding: .5rem;
    border-radius: .3rem;
    margin-right: .7rem;

    svg {
        margin-right: .5rem;
    }

    ${props => {
        if(props.completed){
            return {
                background: props.theme.green,
                color: "white"
            }
        }
    }}
`

const CtaDescription = styled.div`

`

const CtaCheckList = styled.div`
    display: flex;
    align-items: center;
    padding: .5rem;
    border-radius: .3rem;
    margin-right: 1rem;

    svg {
        margin-right: .5rem;
    }
`


const CtaCheckListLabel = styled.div`

`

const CardPreview = props => {

    const {display, itemType, item, style} = usePreview();

    if (!display) {
      return null;
    }
    const card = document.getElementById(item.id)

    const showCta = item.dueDate || item.description || item.checkList.length > 0

    const getCompletedCheckList = () => {
      let completed = 0
      item.checkList.forEach(item => {
          if(item.completedAt){
              completed += 1
          }
      })
      return completed
  }

    return (
        <Container
            style={{
                ...style,
                WebkitTransform: `${style.WebkitTransform} rotate(3deg)`,
                width: `${card.clientWidth}px`,
            }}
        >
          <Title>
            {item.title}
          </Title>
          {showCta && (
              <Cta>
                    {item.dueDate && (
                        <CtaDueDate completed={item.completedAt}>
                            <FontAwesomeIcon icon={faClock} />
                            <AppDate 
                                value={item.dueDate}
                                format="mm dd"
                                month="short"
                            />
                        </CtaDueDate>
                    )}
                    {item.checkList.length > 0  && (
                        <CtaCheckList>
                            <FontAwesomeIcon icon="list" />
                            <CtaCheckListLabel>
                                {getCompletedCheckList()}/{item.checkList.length}
                            </CtaCheckListLabel>
                        </CtaCheckList>
                    )}

                    {item.description && (
                        <CtaDescription>
                            <FontAwesomeIcon icon="align-left"/>
                        </CtaDescription>
                    )}
                </Cta>
            )}
        </Container>
     )
};

export default CardPreview;
