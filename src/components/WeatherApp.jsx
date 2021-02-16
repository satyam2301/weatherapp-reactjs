import { useState } from "react";
import CurrDate from "./CurrDate";
import Search from "./Search";
import './WeatherApp.css'


const api = {
  key: "0e9fc031bdb394de3336591509d1fde4",
  base: "http://api.openweathermap.org/data/2.5/",
  // http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=0e9fc031bdb394de3336591509d1fde4
};
function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});


    const search = (e) => {
      if (e.key === "Enter" || e.type === "click") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          // console.log(res)
          .then(res => res.json())
          .then((result) => {
            setQuery("");
            setWeather(result);
          });
      }
    }

  return (
    <div className="main-container">
      <div className="container">
        <div
          className={
            typeof weather.main != "undefined"
              ? weather.main.temp > 16
                ? "app warm"
                : "app"
              : "app"
          }
        >
          <div className="app-main">
          {typeof weather.main != "undefined" ? (
            <div className="locat-box">
              <div className="locat">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            ) : (
                ''
              )}

            <main>
              <Search
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                search={search}
              />
              {typeof weather.main != "undefined" ? (
                <div>
                  <div className="location-box">
                    <CurrDate />
                  </div>
                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather.main["temp"])}°C
                    </div>
                    <div className="weather">Condition : {weather.weather[0].main}</div>
                    <div className="humidity">Humidity : {weather.main.humidity} %</div>
                    <div className="wind">Wind Speed: {weather.wind.speed} Km/h</div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;