import React from 'react'

import './style/WeatherMenu.css'

const WeatherMenu = props => {

    return (
        <div className="card card-body">
            <div className='container'>
                <p  id="madrid" onClick={props.getCity}>Madrid</p>
                <p id="london" onClick={props.getCity}>Londres</p>
                <p id="sanFrancisco" onClick={props.getCity}>San Francisco</p>
                <p id="newYork" onClick={props.getCity}>Nueva York</p>
            </div>
        </div>
    )
}

export default WeatherMenu