import React, { useEffect, useState } from 'react';
import NoInput from './NoInput';
import { CurrentWeather_OpenWeather_API_URL, CurrentWeather_OpenWeather_CITY_API_URL, getIconUrl, OpenWeather_API_key } from '../API';
import Forecast from './Forecast';

const CurrentWeather = ({ city, metric, setForecast, forecast }) => {

  const [weather, setWeather] = useState();
  const [City, setCity] = useState([]);
  const [tempUnit, setTempUnit] = useState();
  const [backupCity, setBackupCity] = useState();

  const weatherGetter = () => {
    if (!city[0] || !city[0].latitude || !city[0].longitude) {
      return;
    }

    const url = metric
      ? `${CurrentWeather_OpenWeather_API_URL}lat=${city[0]?.latitude}&lon=${city[0]?.longitude}&appid=${OpenWeather_API_key}&units=metric`
      : `${CurrentWeather_OpenWeather_API_URL}lat=${city[0]?.latitude}&lon=${city[0]?.longitude}&appid=${OpenWeather_API_key}&units=imperial`;

    try {
      fetch(url)
        .then((res) => res.json())
        .then((res) => setWeather(res))
    } catch (err) {
      console.log(err);
    }
  };

  function tempUnitHandler() {
    if (metric) {
      setTempUnit("°C")
    } else {
      setTempUnit("°F")
    }
  }

  useEffect(() => {
    weatherGetter();
    tempUnitHandler();
  }, [city, metric])

  useEffect(() => {
    setCity(city);
    tempUnitHandler();
  }, [city, weather, metric]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  useEffect(() => {
    if (!City[0]?.city && City[0]?.latitude && City[0]?.longitude) {
      getCityData();
    }
  }, [City]);

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = getIconUrl(weather?.weather[0]?.icon) || `/src/assets/logo.svg`;
    document.head.appendChild(link); 
  }, [City, weather, metric, forecast]);
  
  function getCityData() {
    const url = metric
      ? `${CurrentWeather_OpenWeather_CITY_API_URL}lat=${City[0].latitude}&lon=${City[0].longitude}&appid=${OpenWeather_API_key}&units=metric`
      : `${CurrentWeather_OpenWeather_CITY_API_URL}lat=${City[0].latitude}&lon=${City[0].longitude}&appid=${OpenWeather_API_key}&units=imperial`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setBackupCity(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center justify-center mt-10">
      {weather && City.length > 0 ? (
        <div className='flex flex-col items-center justify-center'>
          <div className="flex justify-around dark:bg-[#292929] bg-[#e3e3e3] font-bold w-fit px-8 py-6 rounded-lg flex-wrap shadow-xl www">
            <div className="flex flex-col">
              {City[0]?.city ? (
                <a href={`https://www.wikidata.org/wiki/${City[0].wikiID}`} className="wasd text-xl mt-10" target='_blank'>
                  {City[0].city}, {City[0].countryCode}🔗
                </a>
              ) : (
                <>
                  {backupCity ? (
                    <a href={`https://en.wikipedia.org/wiki/${backupCity.name}`} className="wasd text-xl mt-10" target='_blank'>
                      {backupCity.name}, {backupCity.sys.country}🔗
                    </a>
                  ) : null}
                </>
              )}
              <span className="text-xs">{capitalize(weather.weather[0].description)}</span>
              <div className="flex flex-col py-20 text-6xl mr-10 wasdw">
                {weather && Math.round(weather.main.temp)}{tempUnit}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={getIconUrl(weather?.weather[0]?.icon)}
                alt={`${weather.weather[0].description}`}
                className=" w-28"
              />

              <div className="flex flex-col text-xs w-[200px] card">
                <div className="flex items-center justify-center underline text-lg">
                  <span>Details</span>
                </div>
                <div className="flex justify-between">
                  <span>Feels Like:</span>
                  <span>{Math.round(weather.main.feels_like)}{tempUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Temp:</span>
                  <span>{Math.round(weather.main.temp_min)}{tempUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Temp:</span>
                  <span>{Math.round(weather.main.temp_max)}{tempUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pressure:</span>
                  <span>{weather.main.pressure} hPa</span>
                </div>
                <div className="flex justify-between">
                  <span>Humidity:</span>
                  <span>{weather.main.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Visibility:</span>
                  <span>{weather.visibility} m</span>
                </div>
                <div className="flex justify-between">
                  <span>Wind Speed:</span>
                  <span>{weather.wind.speed} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Wind Direction:</span>
                  <span>{weather.wind.deg}°</span>
                </div>
                <div className="flex justify-between">
                  <span>Gust:</span>
                  <span>{weather.wind.gust} m/s</span>
                </div>
                <div className='flex justify-between'>
                  <span>Clouds:</span>
                  <span>{weather.clouds.all}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full justify-evenly font-bold mt-5'>
            <div className='flex flex-col items-center justify-center'>
              <img src={`https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunrise.svg` || `./src/assets./weatherIcons./sunrise.svg`} alt="Sunrise" className='w-20' />
              <p className='opacity-60 font-normal mt-[-20px]'>Sunrise</p>
              <p>{formatTime(weather.sys.sunrise)}{" "}AM</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img src={`https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunset.svg` || `./src/assets/weatherIcons/sunset.svg`} alt="Sunset" className='w-20' />
              <p className='opacity-60 font-normal mt-[-20px]'>Sunset</p>
              <p>{formatTime(weather.sys.sunset)}{" "}PM</p>
            </div>
          </div>
          <div>
          </div>
          <Forecast
            tempUnit={tempUnit}
            city={city}
            metric={metric}
            setForecast={setForecast}
            forecast={forecast}
            weather={weather}
          />
        </div>
      ) : (
        <NoInput />
      )}
    </div>
  );
}

export default CurrentWeather;