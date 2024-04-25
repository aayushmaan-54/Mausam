import React, { useEffect, useState } from 'react';
import { HOURLY_FORECAST_OpenWeather_API_URL, DAILY_FORECAST_OpenWeather_API_URL, OpenWeather_API_key, getIconUrl } from '../API';
import Accordion from './Accordion';

const Forecast = ({ tempUnit, city, metric, setForecast, forecast, weather }) => {

  const lon = weather.coord.lon;
  const lat = weather.coord.lat;
  const [dailyForecast, setDailyForecast] = useState();

  const hourlyForecastGetter = async () => {
    if (!city[0] || !city[0].latitude || !city[0].longitude) {
      return;
    }
    const url = metric
      ? `${HOURLY_FORECAST_OpenWeather_API_URL}lat=${lat}&lon=${lon}&appid=${OpenWeather_API_key}&units=metric`
      : `${HOURLY_FORECAST_OpenWeather_API_URL}lat=${lat}&lon=${lon}&appid=${OpenWeather_API_key}&units=imperial`;

    try {
      const response = await fetch(url);
      const forecastRes = await response.json();
      setForecast(forecastRes);
    } catch (err) {
      console.log(err);
    }
  };

  const dailyForecastGetter = async () => {
    const url = metric
      ? `${DAILY_FORECAST_OpenWeather_API_URL}lat=${lat}&lon=${lon}&cnt=16&appid=${OpenWeather_API_key}&units=metric`
      : `${DAILY_FORECAST_OpenWeather_API_URL}lat=${lat}&lon=${lon}&cnt=16&appid=${OpenWeather_API_key}&units=imperial`;

    try {
      const response = await fetch(url);
      const DailyForecastRes = await response.json();
      setDailyForecast(DailyForecastRes);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    hourlyForecastGetter();
    dailyForecastGetter();
  }, [city, metric, weather])


  function convertDatetime(datetimeStr) {
    var datetime = new Date(datetimeStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var formattedDate = datetime.getDate() + ' ' + months[datetime.getMonth()];
    var hours = datetime.getHours() % 12 || 12;
    var minutes = datetime.getMinutes();
    var ampm = datetime.getHours() >= 12 ? 'PM' : 'AM';
    var formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className='w-[80vw] mt-5'>
      <h1 className='font-bold text-2xl uppercase underline mt-10 mb-14'>Forecast{" "}</h1>
      <h1 className='font-bold text-md pt-3'>Hourly Forecast:{" "}</h1>
      <hr className='mb-8' />
      <div>
        <div className='overflow-x-auto flex items-center justify-between gap-4 px-4 w-full pr-10 customScrollbar'>
          {forecast ? (
            <div className='overflow-x-auto flex justify-between items-center gap-4 px-4 w-full pr-10 customScrollbar'>
              {forecast.list.map((item) => (
                <div key={item.dt} className='flex flex-col justify-center items-center text-xs font-semibold pb-2'>
                  <h1 className='whitespace-nowrap opacity-60'>{convertDatetime(item.dt_txt)}</h1>
                  <img
                    src={getIconUrl(weather?.weather[0]?.icon)}
                    className='w-12 ml-2'
                    alt={item.weather[0].description}
                  />
                  <p className='whitespace-nowrap opacity-60'>{item.weather[0].description}</p>
                  <h2>
                    {Math.round(item.main.temp_min)}{tempUnit} / {Math.round(item.main.temp_max)}{tempUnit}
                  </h2>
                </div>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
      <div className='mb-10'>
        <h1 className='font-bold text-md pt-20'>Daily Forecast:{" "}</h1>
        <hr className='mb-4' />
        {dailyForecast && dailyForecast.list && dailyForecast.list.map((item) => (
          <Accordion item={item} key={item.dt} tempUnit={tempUnit} />
        ))}
      </div>
    </div>
  )
}

export default Forecast