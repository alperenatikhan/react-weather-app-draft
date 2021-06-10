import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function Weather(props) {

  const [data, setData] = useState([props.city]);
  const [weatherCond, setWeatherCond] = useState({});

  useEffect(() => {
    handleWeather();
  }, [props.city]);


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

  return (
    <div className="photo-weather-wrapper">
      <img
        src={`https://source.unsplash.com/800x800/?${props.city}/${Math.ceil(
          Math.random() * 100
        )}`}
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
  );
}
