import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchInput } from "./components/SearchInput";
import { WeatherInfoCard } from "./components/WeatherInfoCard";
import loading from "./img/loading.png";

export default function App() {
  const [searchCity, setSearchCity] = useState("hyderabad");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState([]);

  const FetchApi = async () => {
    try {
      const data = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/find?q=${searchCity.toLocaleLowerCase()}&appid=${
          process.env.REACT_APP_API_KEY
        }&units=metric`
      );
      const json = await data.json();
      setIsLoading(false);
      const { lat = null, lon = null } = json?.list?.[0]?.coord;
      const latitude = lat?.toPrecision(4);
      const longitude = lon?.toPrecision(4);

      if (latitude && longitude) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
        );
        const json = await response.json();

        //sorted based on date
        const sortedData = json.list
          .map((item) => {
            return {
              ...item,
              dt_txt: new Date(item.dt_txt).toLocaleDateString(),
            };
          })
          .sort((a, b) => a.dt_txt.localeCompare(b.dt_txt));
        //getting unique date info bcz response have duplicate dates info
        const uniqueDateWeatherInfo = [
          ...new Map(sortedData.map((item) => [item.dt_txt, item])).values(),
        ];

        //setting data in required format ..
        const updatedData = uniqueDateWeatherInfo?.map((weather) => {
          return {
            date: new Date(weather.dt_txt).toLocaleDateString(),
            min: weather?.main?.temp_min,
            max: weather?.main?.temp_max,
            pressure: weather?.main.pressure,
            humidity: weather?.main.humidity,
          };
        });
        setWeatherInfo(updatedData);
      }
    } catch (error) {
      setIsLoading(false);
      setWeatherInfo([]);
    }
  };
  useEffect(() => {
    FetchApi();
  }, [searchCity]);

  const searchHandler = (value) => {
    setIsLoading(true);
    setSearchCity(value);
  };
  return (
    <div className="App">
      <div className="weather-container">
        <div className="search-container">
          <h2>Weather in your city</h2>
          <div className="loader-search">
            <SearchInput setSearchCity={searchHandler} />
            {isLoading && <img src={loading} alt="loader" />}
          </div>
        </div>
        {isLoading ? (
          "loading..."
        ) : weatherInfo.length > 0 ? (
          <WeatherInfoCard data={weatherInfo} />
        ) : (
          <div className="no-data">No Data found</div>
        )}
      </div>
    </div>
  );
}
