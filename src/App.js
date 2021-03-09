import "./App.css";
import React, { useState } from "react";

const api = {
   key: process.env.REACT_APP_API_KEY,
   base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
   const [query, setQuery] = useState("");
   const [weather, setWeather] = useState({});

   const search = (evt) => {
      if (evt.key === "Enter") {
         fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
               setWeather(result);
               setQuery("");
               console.log(result);
            });
      }
   };

   const dateBuilder = (d) => {
      let months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ];
      let days = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
   };

   return (
      <div
         className={
            typeof weather.main != "undefined"
               ? weather.main.temp < 47
                  ? "app winter"
                  : weather.main.temp > 68
                  ? "app summer"
                  : new Date().getMonth() < 4
                  ? "app spring"
                  : "app fall"
               : "app"
         }
      >
         <main>
            <div className="search-box">
               <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
               />
            </div>
            {typeof weather.main != "undefined" ? (
               <div>
                  <div className="location-box">
                     <div className="location">
                        {weather.name}, {weather.sys.country}
                     </div>
                     <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                     <div className="temp">
                        {Math.round(weather.main.temp)}°F
                     </div>
                     <div className="weather">{weather.weather[0].main}</div>
                  </div>
               </div>
            ) : (
               ""
            )}
            <div className="forecast-box">
               Feels like: {Math.round(weather.main.feels_like)}°F with a
               humidity of {Math.round(weather.main.humidity)}.
            </div>
         </main>
      </div>
   );
}

export default App;
