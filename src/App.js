import React, { useState, UseEffect } from 'react';
import './style.css';

export default function App() {
  let [city, setCity] = useState('');
  let [temperature, setTemperature] = useState('');
  let [country, setCountry] = useState('');
  let [weatherIcon, setWeatherIcon] = useState('');

  function getBackground(temperature) {
    let bgColor;
    if (temperature < 1) {
      bgColor = '#4b595e';
    } else if (temperature > 29) {
      bgColor = '#ff6d6d';
    } else if (temperature < 9) {
      bgColor = '#8ad0ce';
    } else {
      bgColor = '#ffe963';
    }

    document.body.style.backgroundColor = bgColor;
  }

  async function getWeatherByLocation(url, city) {
    const resp = await fetch(url, { origin: 'cors' });
    const respData = await resp.json();
    const cityName = respData.name;

    const countryName = respData.sys.country;
    setCity(`${cityName}  (${countryName})`);
    setCountry(countryName);
    const weatherCond = respData.weather[0].main;
    const temperature_info = Math.floor(respData.main.temp - 273.15);
    setTemperature(temperature_info);
    const apiIcon = respData.weather[0].icon;
    setWeatherIcon(apiIcon);
    //document.getElementById('result').innerText=` ${cityName} (${countryName}) : ${temperature} C
    //${weatherCond} `;
    getBackground(temperature_info);
  }

  let handleWeather = key => {
    console.log(key);
    const apikey = '3265874a2c77ae4a04bb96236a642d2f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${key}&appid=${apikey}`;

    getWeatherByLocation(url, key);
  };

  return (
    <div>
      <h1>
        What is the Weather in {city}
      </h1>

      <input
        id="city-check"
        type="text"
        onChange={el => setCity(el.target.value)}
      />
      <button
        onClick={() => {
          document.body.style.backgroundColor = 'lightgray';
          handleWeather(document.getElementById('city-check').value);
        }}
      >
        {' '}
      </button>

      <p>Start editing to see some magic happen :)</p>

      {temperature && <div id="result"> <h1 id= "temperature-out"> {temperature} <span id="celcius">°C </span></h1>
      <img id="icon" src= {`https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${weatherIcon}.png`}/>
       <img
              src={`https://www.countryflags.io/${country}/flat/64.png`}
              style={{ width: 30 }}
            />
      
      </div>}
    </div>
  );
}
