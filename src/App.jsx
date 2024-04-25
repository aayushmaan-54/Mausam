import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchCity from './components/SearchCity';
import CurrentWeather from './components/CurrentWeather';

function App() {

  const [ dark, setDark ] = useState(true);
  const [ metric, setMetric ] = useState(true);
  const [city, setCity] = useState([]);
  const [ forecast, setForecast ] = useState(null);

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `/assets/logo.svg`;
    document.head.appendChild(link); 
  }, []);

  return (
    <div className={`m-0 p-0 ${dark ? 'dark' : ''}`}>
      <div className='text-black dark:text-white dark:bg-[#1a1a1a] bg-white w-screen min-h-screen'>
        <Header dark={dark} setDark={setDark} metric={metric} setMetric={setMetric} />
        <hr className='w-[95%] mx-auto mb-4 mt-3' />
        <SearchCity setCity={setCity} />
        <CurrentWeather 
          city={city} 
          metric={metric} 
          forecast={forecast} 
          setForecast={setForecast}
        />
      </div>
    </div>
  )
}

export default App