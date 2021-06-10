import React, { useState, UseEffect } from 'react';
import './style.css';
import Weather from './Weather.js';

export default function App() {
  let [selectedCity, setSelectedCity] = useState('');
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

    //document.body.style.backgroundColor = bgColor;
  }

  async function getWeatherByLocation(url, city) {
    const resp = await fetch(url, { origin: 'cors' });
    const respData = await resp.json();
    console.log(respData);
    const cityName = respData.name;

    const countryName = respData.sys.country;
    setSelectedCity(`${cityName}`);
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
    <div className="app-display">
      <div className="search-box">
        <h1>
          How is the weather in {selectedCity} {country}
          {country && (
            <img
              src={`https://www.countryflags.io/${country}/flat/64.png`}
              style={{ width: '40px', height: '20px' }}
            />
          )}
        </h1>

        <input id="city-check" type="text" />
        <button
          style={{ width: '70%', margin: '1rem auto' }}
          className="btn-success"
          onClick={() => {
            
            handleWeather(document.getElementById('city-check').value);
          }}
        >
          {' '}
          Check Weather!{' '}
        </button>

        <p>Let's see!</p>
      </div>

      {temperature && <Weather city={selectedCity} newCity= {selectedCity} icon={weatherIcon} />

      /*
      (
        <div id="result">
          {' '}
          <div className="flag-city">
            <img
              src={`https://www.countryflags.io/${country}/flat/64.png`}
              style={{ width: 30 }}
            />
            <p> {city} </p>
          </div>
          <h1 id="temperature-out">
            {' '}
            {temperature} <span id="celcius">°C </span>
          </h1>
          <img
            id="icon"
            src={`https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${weatherIcon}.png`}
          />
        </div>
      )
      */
      }

      <div className="container-fluid">
        <div className="row">
          {' '}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="New York" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="London" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="Paris" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="Berlin" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="Barcelona" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="Rio de Janeiro" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="Dubai" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <Weather city="Bangkok" />
          </div>
        </div>
      </div>
    </div>
  );
}
