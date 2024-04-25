import React, { useState } from 'react';
import { getIconUrl } from '../API';

const Accordion = ({ item, tempUnit }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  function formatDate(unixTimestamp) {
    const dt = unixTimestamp * 1000;
    const date = new Date(dt);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
    return `${day} ${month}, ${dayOfWeek}`;
  }

  return (
    <div className='mb-4 font-semibold accordion'>
      <div className="dark:bg-[#292929] bg-[#e3e3e3] mx-2 rounded-md shadow-xl">
        <div className="cursor-pointer flex items-center justify-between" onClick={toggleAccordion}>
          <div className='flex items-center justify-center'>
            <img src={getIconUrl(item.weather[0].icon)} alt={item.weather[0].description} className='w-12 ml-1 svgIcon' />
            <p className='ml-1'>{formatDate(item.dt)}</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='pr-3'>{item.weather[0].description}</p>
            <p>{Math.round(item.temp.min)}{tempUnit} / {Math.round(item.temp.max)}{tempUnit}</p>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className={`css-8mmkcg mr-3 ml-2 fill-indigo-700 transition-transform duration-300 ease-in-out ${accordionOpen ? 'rotate-180' : ''}`}
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
        >
          <div className="overflow-hidden">
            <hr className='bg-indigo-700 h-[1px]' />
            <div className='flex justify-between text-black dark:text-white font-semibold flex-wrap mt-3 mb-3 px-4'>
              <ul>
                <li className=' font-bold underline'>Temperature:</li>
                <div className='opacity-60'>
                  <li>min: {Math.round(item.temp.min)}{tempUnit}</li>
                  <li>max: {Math.round(item.temp.max)}{tempUnit}</li>
                  <li>morning: {Math.round(item.temp.morn)}{tempUnit}</li>
                  <li>day: {Math.round(item.temp.day)}{tempUnit}</li>
                  <li>evening: {Math.round(item.temp.eve)}{tempUnit}</li>
                  <li>night: {Math.round(item.temp.night)}{tempUnit}</li>
                </div>
              </ul>
              <ul>
                <li className='font-bold underline'>Feels Like:</li>
                <div className='opacity-60'>
                  <li>morning: {Math.round(item.feels_like.morn)}{tempUnit}</li>
                  <li>day: {Math.round(item.feels_like.day)}{tempUnit}</li>
                  <li>evening: {Math.round(item.feels_like.eve)}{tempUnit}</li>
                  <li>night: {Math.round(item.feels_like.night)}{tempUnit}</li>
                </div>
              </ul>
              <ul>
                <li className=' font-bold underline'>Others:</li>
                <div className='opacity-60'>
                  <li>Pressure: {item.pressure}hPa</li>
                  <li>Humidity: {item.humidity}%</li>
                  <li>Wind Speed: {item.speed}m/s</li>
                  <li>Wind Direction: {item.deg}°</li>
                  <li>Gust: {item.gust}m/s</li>
                  <li>Clouds: {item.clouds}%</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;