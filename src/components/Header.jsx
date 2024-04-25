import React from 'react';
import { DarkMode } from '../assets/SVGs/SVG';

const Header = ({ dark, setDark, metric, setMetric }) => {

  function darkModeHandel() {
    setDark(!dark)
  }

  function metricHandle() {
    setMetric(!metric)
  }

  const unit = (`${metric ? '°F' : '°C'}`)

  return (
    <div className='flex items-center justify-between pt-3'>
      <h1 className='text-3xl pl-3 text-indigo-700 font-black hindi'>
        <a href="./" onClick={() => window.location.reload()}>मौसम</a>
        </h1>
      <div className='flex justify-center gap-4 pr-3'>
        <div onClick={darkModeHandel} >
          <DarkMode />
        </div>
        <span className='bg-indigo-700 text-white rounded-full flex items-center justify-center px-[0.38rem] text-xs font-semibold cursor-pointer' onClick={metricHandle}>{unit}</span>
      </div>
    </div>
  )
}

export default Header