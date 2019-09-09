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

  setLoading = () =>{
    this.setState({
      loading: true
    })
  }

  setCurrentDayTemp = async city =>{

    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    //Llamada a la API para traer los datos de la ciudad seleccionada
    const CITY_URL_DATE = `${cors_api_url}https://www.metaweather.com/api/location/${city}`
    const CITY_INFO_RESPONSE =  await fetch(CITY_URL_DATE)
    const data = await CITY_INFO_RESPONSE.json();

    this.setState({
      ciudad: data.title,
      temperatura: data.consolidated_weather[0].the_temp,
      temperatura_minima: data.consolidated_weather[0].min_temp,
      temperatura_maxima: data.consolidated_weather[0].max_temp,
      descipcion: data.consolidated_weather[0].weather_state_name,
      humedad: data.consolidated_weather[0].humidity,
      velocidadViento: data.consolidated_weather[0].wind_speed
    })
  }

  setNextDaysTemp = async (city, yyyy, mm, dd) =>{
      var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    //Llamada a la API para traer los datos de la ciudad seleccionada los próximos 4 días
    var proximosDias = [];
    var proximosDiasSingle = []

    for(var i = 1; i<=4; i ++){
      const CITY_URL_DATE = `${cors_api_url}https://www.metaweather.com/api/location/${city}/${yyyy}/${mm}/${dd + i}`
      const CITY_INFO_RESPONSE =  await fetch(CITY_URL_DATE)
      const data = await CITY_INFO_RESPONSE.json();
      proximosDiasSingle.push(data)
    }

    proximosDias = proximosDiasSingle;

    var dia = ({
      dia: dd,
      mes: mm,
      año: yyyy,
    })

    this.setState({
        proximosDias_1_max: proximosDias[0][0].max_temp,
        proximosDias_1_min: proximosDias[0][0].min_temp,
        proximosDias_2_max: proximosDias[1][1].max_temp,
        proximosDias_2_min: proximosDias[1][1].min_temp,
        proximosDias_3_max: proximosDias[2][2].max_temp,
        proximosDias_3_min: proximosDias[2][2].min_temp,
        proximosDias_4_max: proximosDias[3][3].max_temp,
        proximosDias_4_min: proximosDias[3][3].min_temp,
        loading: false,
        dia: dia,
      })
  }

  getCity = async e => {
      const city = e.target.id;

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

      this.setCurrentDayTemp(cityHash);
      this.setNextDaysTemp(cityHash, yyyy, mm, dd)

        this.setState({
            dia: dia,
          })
  }

  initialCity = async () => {
      var city = 766273;
      var date = new Date()
      var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();

      this.setNextDaysTemp(city, yyyy, mm, dd)
      this.setCurrentDayTemp(city)

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
