import React from "react"
import styled from "styled-components"

const Img = styled.img`
    width: 2rem;
    height: 2rem;
`

const codes = {
    200: "light-thunder",
    201: "rain-thunder",
    202: "rain-thunder",
    210: "light-thunder",
    211: "light-thunder",
    212: "heavy-thunder",
    221: "heavy-thunder",
    230: "rain-thunder",
    231: "rain-thunder",
    232: "rain-thunder",
    300: "extra-light-rain",
    301: "light-rain",
    302: "light-rain",
    310: "rain",
    311: "rain",
    312: "rain",
    313: "rain",
    314: "moderate-rain",
    321: "moderate-rain",
    500: "light-rain",
    501: "moderate-rain",
    502: "heavy-rain",
    503: "torrential-rain",
    504: "torrential-rain",
    511: "rain",
    520: "light-rain",
    521: "rain",
    522: "heavy-rain",
    531: "heavy-rain",
    600: "light-snow",
    601: "snow",
    602: "heavy-snow",
    611: "sleet",
    612: "sleet",
    613: "light-snow",
    615: "light-snow",
    616: "snow",
    620: "light-snow",
    621: "snow",
    622: "heavy-snow",
    701: "mist",
    711: "mist",
    721: "mist",
    731: "mist",
    741: "mist",
    751: "mist",
    761: "mist",
    762: "mist",
    771: "mist",
    781: "mist",
    800: "clear",
    801: "partly-cloudy",
    802: "partly-cloudy",
    803: "cloudy",
    804: "cloudy",
}


const WeatherIcon = props => {
    const { data:{ id: code , icon} } = props
    const type = icon[2] === "d" ? "day" : "night"
    const id = codes[code]
    return <Img src={require(`./weatherIcon/${type}/${id}.png`).default} alt={id} />
};

export default WeatherIcon;
