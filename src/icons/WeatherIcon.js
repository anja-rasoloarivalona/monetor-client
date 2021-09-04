import React from "react"
import styled from "styled-components"
import sprite from './weatherSprite.svg'

const codes = {
    1000: "clear",
    1003: "partly-cloudy",
    1006: "cloudy",
    1009: "cloudy",
    1030: "mist",
    1063: "light-rain",
    1066: "light-snow",
    1069: "light-sleet",
    1072: "light-rain",
    1087: "light-thunder",
    1114: "snow",
    1117: "heavy-snow",
    1135: "mist",
    1147: "mist",
    1150: "light-rain",
    1153: "light-rain",
    1168: "rain",
    1171: "heavy-rain",
    1180: "light-rain",
    1183: "light-rain",
    1186: "rain",
    1192: "heavy-rain",
    1195: "heavy-rain",
    1198: "light-rain",
    1201: "heavy-rain",
    1204: "light-sleet",
    1207: "light-sleet",
    1210: "light-snow",
    1213: "light-snow",
    1216: "snow",
    1219: "snow",
    1222: "heavy-snow",
    1225: "heavy-snow",
    1237: "pellets",
    1240: "light-rain",
    1243: "heavy-rain",
    1246: "torrential-rain",
    1249: "light-sleet",
    1252: "light-sleet",
    1255: "light-snow",
    1258: "snow",
    1261: "pellets",
    1264: "pellets",
    1273: "rain-thunder",
    1276: "rain-thunder",
    1279: "rain-thunder",
    1282: "rain-thunder"
}

const Container = styled.svg``

const WeatherIcon = props => {
    const { data: { condition, is_day } } = props
    const type = is_day ? "day" : "night"
    const id = codes[condition.code]
    return (
        <Container className={`#${type}-${id}`}>
             <use href={sprite + `#${type}-${id}`}/>          
        </Container>
     )
};

export default WeatherIcon;
