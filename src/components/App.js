import React, { Component } from 'react';

import './style/App.css';
import WeatherInfo from './WeatherInfo';
import WeatherMenu from './WeatherMenu';
import Loading from './Loading';

class App extends Component {

  state = {
    temperatura: '',
    temperatura_minima: '',
    temperatura_maxima: '',
    descipcion: '',
    ciudad: '',
    error: '',
    dia: ({
      dia: ''
    }),
    loading: true
  }

   getCity = async e => {

    console.log('Hola')

    const city = e.target.id;
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

    switch(city){
      case 'madrid':
      var cityHash = 766273
      break;
      case 'london':
      var cityHash = 44418
      break;
      case 'sanFrancisco':
      var cityHash = 2487956
      break;
      case 'newYork':
      var cityHash = 2459115
      break;
    }

    var date = new Date()
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    var dia = ({
      dia: dd,
      mes: mm,
      año: yyyy
    })
    //Llamada a la API para traer los datos de la ciudad seleccionada
      const CITY_URL_DATE = `${cors_api_url}https://www.metaweather.com/api/location/${cityHash}`
      const CITY_INFO_RESPONSE =  await fetch(CITY_URL_DATE)
      const data = await CITY_INFO_RESPONSE.json();

      console.log(data)

      //Llamada a la API para traer los datos de la ciudad seleccionada los próximos 4 días
      var proximosDias = [];
      var proximosDiasSingle = []

      for(var i = 1; i<=4; i ++){
        console.log('hola 1')
        const CITY_URL_DATE = `${cors_api_url}https://www.metaweather.com/api/location/${cityHash}/${yyyy}/${mm}/${dd + i}`
        const CITY_INFO_RESPONSE =  await fetch(CITY_URL_DATE)
        const data = await CITY_INFO_RESPONSE.json();
        proximosDiasSingle.push(data)
        console.log('hola 2')
      }

      proximosDias = proximosDiasSingle;

      console.log(proximosDias)

      this.setState({
          temperatura: data.consolidated_weather[0].the_temp,
          temperatura_minima: data.consolidated_weather[0].min_temp,
          temperatura_maxima: data.consolidated_weather[0].max_temp,
          descipcion: data.consolidated_weather[0].weather_state_name,
          ciudad: data.title,
          dia: dia,
          proximosDias: proximosDias,
          loading: false
        })
      }


  initialCity = async () => {
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    const CITY_URL = `${cors_api_url}https://www.metaweather.com/api/location/766273`
    const CITY_INFO_RESPONSE = await   fetch(CITY_URL)
    const data = await  CITY_INFO_RESPONSE.json();

    var date = new Date()
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    var dia = ({
      dia: dd,
      mes: mm,
      año: yyyy,
    })

    this.setState({
      temperatura: data.consolidated_weather[5].the_temp,
      temperatura_minima: data.consolidated_weather[5].min_temp,
      temperatura_maxima: data.consolidated_weather[5].max_temp,
      descipcion: data.consolidated_weather[5].weather_state_name,
      ciudad: data.title,
      dia: dia,
      error: null,
      loading: false,
    })
  }


  render(){
    if(this.state.loading === true){
      this.initialCity();
      return(
        <div>
          <WeatherMenu getCity={this.getCity} city={this.city} />
          <Loading {... this.state}/>
        </div>
      )
    }
    return(
      <div>
        <WeatherMenu getCity={this.getCity} city={this.city} />
        <WeatherInfo {...this.state}/>
      </div>
    )
  }
}

export default App;
