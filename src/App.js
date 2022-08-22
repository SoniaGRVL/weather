import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3d930166c15e7509712fe8ca8b1f13a9`;

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
      <div className="container">
      <div className="search">
        <input 
        value={location} 
        onChange={e => setLocation(e.target.value)} 
        onKeyUp={searchLocation}
        placeholder='Enter Location' 
        type="text" />
      </div>
        <div className="card">
        <div className="cardInner"></div>
          <div className="left">
            <div className="location">
              {data.name ? <h2>{data.name}</h2> : <h2>N/A</h2>}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : <p>-</p>}
            </div>
          </div>
          <div className="right">
            <div className="temp">
              {data.main ? <div className="tempContent"><p className="tempVal">{Math.round(data.main.temp)}</p><p className="tempDeg">°C</p></div> : <div className="tempContent"><p className="tempVal">-</p><p className="tempDeg">°C</p></div>}
            </div>
            <div className="minMax">
              {data.main ? <p>{Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°</p> : <p>-° / -°</p>}
            </div>
          </div>
        <div className="bottom">
          <div className="feels">
            <p className="bottomTitle">Feel Like</p>
            {data.main ? <p>{Math.round(data.main.feels_like)}°</p> : <p>-°</p>}
          </div>
          <div className="humidity">
            <p className="bottomTitle">Humidity</p>
            {data.main ? <p>{data.main.humidity}%</p> : <p>-%</p>}
          </div>
          <div className="wind">
          <p className="bottomTitle">Pression</p>
            {data.main ? <p>{data.main.pressure}mbar</p> : <p>-mbar</p>}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
