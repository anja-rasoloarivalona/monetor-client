import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "../../../hooks";
import SettingsPannel from "./SettingsPannel";
import UserProfileImage from "./UserProfileImage";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${props =>props.theme.dynamicText};
  margin-left: 1rem;
`;

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

  svg {
    font-size: 1.7rem;
    color: ${props => props.dynamicText};
  }
`;
const UserName = styled.div`
    margin-right: 1rem;
    font-size: 1.6rem;
`;

const ToggleContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
      background: ${(props) => props.theme.background};
      svg {
        color: ${props => props.theme.text};
      }
  }
`;

const List = styled.div`
  position: absolute;
  top: 90%;
  right: 3rem;
  width: 35rem;
  height: max-content;
  background: ${(props) => props.theme.type === "dark" ? props.theme.background : props.theme.white};
  z-index: 9;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 1rem;
  overflow: hidden;
`;

const ListSlider = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 35rem);
  grid-template-rows: min-content;
  transition: height 0.3s ease-in, transform 0.3s ease-in;
  transform: translateX(
    ${(props) => (props.showSettingsPannel ? "-100%" : "none")}
  );

  ${(props) => {
    const { settingsRef, mainListRef, showSettingsPannel } = props;
    if (!showSettingsPannel) {
      if (mainListRef.current) {
        return {
          height: `${mainListRef.current.clientHeight}px`,
        };
      }
    } else {
      if (settingsRef.current) {
        return {
          height: `${settingsRef.current.clientHeight}px`,
        };
      }
    }
  }}
`;

const MainList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  height: max-content;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListItemContent = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  position: relative;

  :hover {
    background: ${(props) => props.theme.onSurface};
    .label {
      color: ${(props) => props.theme.textLight};
    }
    .toggle {
      color: ${(props) => props.theme.textLight};
    }
  }

  .toggle {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 2rem;
    font-size: 1.4rem;
    color: ${(props) => props.theme.text};
  }
`;

const ListItemIconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.theme.onSurface};
  margin-right: 2rem;

  svg {
    color: ${(props) => props.theme.textLight};
    font-size: 1.5rem;
  }
`;
const ListItemLabel = styled.div`
  font-size: 1.6rem;
  color: ${(props) => props.theme.text};
`;


const UserProfileList = props => {

  const { showSettingsPannel, options,  setShowSettingsPannel, setShowList, container} = props

  const mainListRef = useRef();
  const settingsRef = useRef();
  
  useOnClickOutside(container, () => {
      setShowList(false);
      setShowSettingsPannel(false);
  });

  return (
    <List>
      <ListSlider
        showSettingsPannel={showSettingsPannel}
        mainListRef={mainListRef}
        settingsRef={settingsRef}
      >
      <MainList ref={mainListRef}>
        {options.map((option) => (
          <ListItem
            id={option.label}
            onClick={option.onToggle ? () => option.onToggle() : null}
          >
            <ListItemContent>
              <ListItemIconContainer>
                <FontAwesomeIcon icon={option.icon} />
              </ListItemIconContainer>
              <ListItemLabel className="label">
                {option.label}
              </ListItemLabel>
              {option.onToggle && (
                <FontAwesomeIcon icon="chevron-right" className="toggle" />
              )}
            </ListItemContent>
          </ListItem>
        ))}
      </MainList>
      <SettingsPannel
        setShowSettingsPannel={setShowSettingsPannel}
        customRef={settingsRef}
      />
    </ListSlider>
  </List>
  )
}

const UserProfile = props => {

  const { useTransparentHeader, useSecondary } = props

  const {
    user,
    text: { text },
  } = useSelector((state) => state);

  const container = useRef()
  const [showList, setShowList] = useState(false);
  const [showSettingsPannel, setShowSettingsPannel] = useState(false);

  const options = [
    {
      label: text.settings,
      icon: "cog",
      onToggle: () => setShowSettingsPannel(true),
    },
    { label: text.logout, icon: "power-off" },
  ];

  return (
    <Container
      useTransparentHeader={useTransparentHeader}
      useSecondary={useSecondary}
      ref={container}
    >
      <UserProfileImage />
      <UserName>{user.firstname} {user.lastname}</UserName>
      <ToggleContainer onClick={() => setShowList((prev) => !prev)}>
        <FontAwesomeIcon icon="chevron-down" />
      </ToggleContainer>
      {showList && (
        <UserProfileList 
          showSettingsPannel={showSettingsPannel}
          options={options}
          setShowSettingsPannel={setShowSettingsPannel}
          setShowList={setShowList}
          container={container}
        />
      )}
    </Container>
  );
};

export default UserProfile;
