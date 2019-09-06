import React, { Component } from 'react';

import './style/App.css';
import WeatherInfo from './WeatherInfo';
import WeatherMenu from './WeatherMenu';

class App extends Component {

  render(){
    return(
      <div className="container__app">
        <div>
         <WeatherInfo />
        </div>
        <div>
          <WeatherMenu />
        </div>
      </div>
    )
  }
}

export default App;
