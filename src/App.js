import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=fr&appid=3d930166c15e7509712fe8ca8b1f13a9`;

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(urlAPI).then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input 
        value={location} 
        onChange={e => setLocation(e.target.value)} 
        onKeyUp={searchLocation}
        placeholder='Enter Location' 
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}<span>°C</span></h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like}°C</p> : null}
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed}MPH</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
