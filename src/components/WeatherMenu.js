import React from 'react'

import './style/WeatherMenu.css'

const WeatherMenu = props => {
    function handleClick(e) {
        var city = e.target.id;
        e.preventDefault();
        console.log(city);
      }
    return (
        <div className="card card-body">
            <div className='container'>
                <p  id="Madrid" onClick={handleClick}>Madrid</p>
                <p id="Londres" onClick={handleClick}>Londres</p>
                <p id="SanFrancisco" onClick={handleClick}>San Francisco</p>
                <p id="NuevaYork" onClick={handleClick}>Nueva York</p>
            </div>
        </div>
    )
}

export default WeatherMenu