import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function Weather(props) {
  const [data, setData] = useState([props.city]);
  const [weatherCond, setWeatherCond] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => handleWeather(), [props.city]);

  const apikey = '3265874a2c77ae4a04bb96236a642d2f';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    props.city
  }&appid=${apikey}&units=metric`;

  function handleWeather() {
    fetch(apiUrl)
      .then(res => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert('Oops, there seems to be an error!(wrong location)');
          }
          alert('Oops, there seems to be an error!');
          throw new Error('You have an error');
        }
      })
      .then(object => {
        setWeatherCond(object);
      })
      .catch(error => console.log(error));
  }

  function HandleDetails() {
    console.log(weatherCond, 'weatherCond');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h4 style={{padding: "0, 10%" }}>{`Weather in ${
          weatherCond.name
        }`}</h4>

        <table style={{ margin: '1rem' }}>
          <tr>
            <td> Temperature : {Math.floor(weatherCond.main?.temp)} </td>{' '}
          </tr>
          <tr>
            {' '}
            Mood : {weatherCond.weather[0].description}{' '}
            <span>
              {' '}
              <img
                src={`https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${
                  weatherCond.weather[0].icon
                }.png`}
                style={{ width: '1.5rem', height: '1rem' }}
              />{' '}
            </span>
          </tr>
          <tr> Feels like : {Math.floor(weatherCond.main?.feels_like)} </tr>
          <tr>
            <td>
              Minimum Temperature : {Math.floor(weatherCond.main?.temp_min)}{' '}
            </td>
          </tr>
          <tr>
            <td>
              Maximum Temperature : {Math.floor(weatherCond.main?.temp_max)}{' '}
            </td>
          </tr>
          <tr> Humidity : {weatherCond.main?.humidity}</tr>
        </table>
      </div>
    );
  }

  return (
    <>
      <div
        className="photo-weather-wrapper"
        onClick={() => setShowDetails(!showDetails)}
      >
        <img className="city-photo"
          src={`https://source.unsplash.com/800x800/?${
            props.city
          }?color:white/${Math.ceil(Math.random() * 10)}`}
        />
        <div className="centered-weather-text">
          <h1 style={{ fontSize: '1.5rem' }}> {weatherCond.name} </h1>

          <h1>
            {' '}
            {`${Math.floor(weatherCond.main?.temp)}`}
            {props.icon && (
              <img
                id="main-pic"
                className="icon"
                src={`https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${
                  props.icon
                }.png`}
              />
            )}
          </h1>
        </div>
      </div>
      {showDetails && <HandleDetails />}
    </>
  );
}
