import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function Weather(props) {
  const [data, setData] = useState([props.city]);
  const [weatherCond, setWeatherCond] = useState({});

  useEffect(() => {
    ifClicked();
  }, []);

  const apikey = '3265874a2c77ae4a04bb96236a642d2f';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    props.city
  }&appid=${apikey}&units=metric`;

  function ifClicked() {
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
        console.log(weatherCond);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="photo-weather-wrapper" >
      <img src="https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />
      <div className="centered-weather-text">
      <h1 style={{"fontSize" : "1.5rem"}}> {weatherCond.name} </h1>
      <h1> {Math.floor(weatherCond.main?.temp)} </h1>
      </div>
    </div>
  );
}
