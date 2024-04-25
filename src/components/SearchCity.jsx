import React, { useEffect, useRef, useState } from 'react';
import { DropDown, Search, Location } from '../assets/SVGs/SVG';
import { InputLoader } from './Loader';
import useDebounce from '../Hooks/useDebounce';
import { geoDbApiOptions, GEO_API_URL } from '../API';

const SearchCity = ({ setCity }) => {
  const [inputClick, setInputClick] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const debouncedSearchTerm = useDebounce(search, 600);

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  function inputClickHandler() {
    setInputClick(!inputClick);
    setIsLoading(!isLoading);
  }

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputClick(false);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchCity(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  let url;
  if (!debouncedSearchTerm) {
      url = `${GEO_API_URL}/cities?minPopulation=10000`;
  } else {
      url = `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${debouncedSearchTerm}`;
  }

  
  async function fetchCity() {
    setIsLoading(true);
    try {
      const response = await fetch(url, geoDbApiOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.data) {
        setSuggestions(data.data);
      } else {
        setSuggestions([]);
        console.log('Received empty data from the server');
      }
    } catch (error) {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }

  function locationGetter() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCity(() => [
          {
            latitude: latitude,
            longitude: longitude,
          }
        ])
        setInputClick(false);
      },
      error => console.error(error)
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === 'Enter') {
      if (selectedIndex !== -1) {
        const selectedSuggestion = suggestions[selectedIndex];
        setCity(() => [
          {
            city: selectedSuggestion.city,
            countryCode: selectedSuggestion.countryCode,
            latitude: selectedSuggestion.latitude,
            longitude: selectedSuggestion.longitude,
            wikiID: selectedSuggestion.wikiDataId,
          },
        ]);
        setSearch(selectedSuggestion.city);
        setInputClick(false);
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(() => [
      {
        city: suggestion.city,
        countryCode: suggestion.countryCode,
        latitude: suggestion.latitude,
        longitude: suggestion.longitude,
        wikiID: suggestion.wikiDataId,
      },
    ]);
    setSearch(suggestion.city);
    setInputClick(false);
    setSuggestions([]);
  };

  return (
    <div className="w-fit mx-auto">
      <div ref={inputRef} onClick={fetchCity}>
        <div
          className="dark:bg-[#292929] flex items-center justify-center py-2 w-[60vw] rounded-full border-2 border-indigo-700 mx-auto search"
          onClick={inputClickHandler}
          onKeyDown={handleKeyDown}
        >
          <label htmlFor="citySearch">
            <Search />
          </label>
          <input
            type="text"
            id="citySearch"
            placeholder="Select a City..."
            className="outline-none dark:bg-[#292929] w-[55vw] ml-2 font-bold"
            value={search}
            onChange={searchHandler}
            autoComplete="off"
          />
          <div className="flex items-center justify-center">
            {isLoading ? <InputLoader /> : ''}
            <span className="w-[1px] h-6 bg-indigo-700 ml-3"></span>
            <DropDown />
          </div>
        </div>
        <div
          className={`dark:bg-[#292929] rounded-lg mt-2 max-h-[300px] overflow-y-scroll ${
            inputClick ? 'block' : 'hidden'} bg-[#e3e3e3]`}
        >
          <div className="flex flex-col gap-4 pl-4 pt-3 pb-2">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-[#4438ca34] p-2" onClick={locationGetter}>
              <Location />
              <p>Use Your Current Location</p>
            </div>
            <hr className=" dark:text-[#4e4e4e] w-[95%] mx-auto pb-2" />
            <div className="cursor-pointer">
              <div className="pb-4">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.city}-${suggestion.countryCode}-${index}`}
                      className={`${
                        selectedIndex === index ? 'bg-[#4438ca34]' : ''
                      } p-2 cursor-pointer`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseOver={() => setSelectedIndex(index)}
                    >
                      {`${suggestion.city}, ${suggestion.countryCode}`}
                    </div>
                  ))
                ) : (
                  <div>No suggestions found ...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCity;