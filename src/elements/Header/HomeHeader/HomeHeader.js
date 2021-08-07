import React from "react"
import HomeHeaderLoggedIn from "./HomeHeaderLoggedIn";
import HomeHeaderLoggedOut from "./HomeHeaderLoggedOut";
import { useSelector } from 'react-redux'


const HomeHeader = () => {
    const {
      user: { token }
    } = useSelector(state => state)
    if(token){
      return  <HomeHeaderLoggedIn /> 
    }
    return  <HomeHeaderLoggedOut />
};

export default HomeHeader;
