import React from 'react'
import Lottie from 'react-lottie';

import './style/WeatherInfo.css'

import nieve from './animations/nieve.json'
import llovizna from './animations/llovizna.json'
import nubladoLigero from './animations/nublado-ligero.json'
import nublado from './animations/nublado.json'
import soleado from './animations/soleado.json'
import tormenta from './animations/tormenta.json'

class WeatherInfo extends React.Component{

    setDay() {

        function textoFecha(fecha){
            var diasSemana = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
            var diaLetras = diasSemana[fecha.getDay()];

            var meses = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
            var mesLetras = meses[fecha.getMonth()];
            var diaMes = (fecha.getDate());
            var anho = fecha.getFullYear();


            var fechaHoy = diaLetras+ ", "+ mesLetras + " "  + diaMes + " , " + anho;
            return fechaHoy;
        }
        var fecha = new Date();
       return textoFecha(fecha);
    }

    setAnimation(){
        var estadoDescipcion = this.props.descipcion
        switch(estadoDescipcion){
            case 'Snow' || 'Sleet' || 'Hail':
            var estado = nieve
            break;
            case 'Thunderstorm' || 'Heavy Rain':
            var estado = tormenta
            break;
            case 'Light Rain':
            var estado = nubladoLigero
            break;
            case 'Showers':
            var estado = llovizna
            break;
            case 'Heavy Cloud' || 'Light Cloud':
            var estado = nublado
            break;
            case 'Clear':
            var estado = soleado
            break;
          }
        return estado
    }

    constructor(props) {
        super(props);
        this.state = {isStopped: false, isPaused: false};
      }

    render(){
        const animationOptions = {
            loop: true,
            autoplay: true,
            animationData: this.setAnimation(),
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return (
        <div className="container_WeatherInfo" >
            <div className="container__weatherinfoCurrentDay" >
                <div className="header_info">
                    <p className="city">{this.props.ciudad}</p>
                    <div>
                        <p>{this.setDay()}</p>
                    </div>
                    <div>
                        <p>{this.props.descipcion}</p>
                    </div>
                    <Lottie
                        options={animationOptions}
                        height={150}
                        width={150}
                        isStopped={this.state.isStopped}
                        isPaused={this.state.isPaused}/>
                </div>
                <div className="container__temp">
                    <div className="container__temp-minmax">
                        <p>Min {Math.floor(this.props.temperatura_minima)}</p>
                        <p>Max {Math.floor(this.props.temperatura_maxima)}</p>
                    </div>
                    <div className="container__currenttemp">
                        <p className="currentTemp">{Math.floor(this.props.temperatura)}</p>
                    </div>
                    <div className="container__hum">
                        <p>Hum 45%</p>
                        <p>V. Wind 3</p>
                    </div>
                </div>
            </div>
            <div className="container__nextDays">
                <div>
                    <p className="container__nextDays-day">10</p>
                    <p>{Math.floor(this.props.proximosDias_1_max)}</p>
                    <p>{Math.floor(this.props.proximosDias_1_min)}</p>
                </div>
                <span className="separador"></span>
                <div>
                    <p className="container__nextDays-day">11</p>
                    <p>{Math.floor(this.props.proximosDias_2_max)}</p>
                    <p>{Math.floor(this.props.proximosDias_2_min)}</p>
                </div>
                <span className="separador"></span>
                <div>
                    <p className="container__nextDays-day">12</p>
                    <p>{Math.floor(this.props.proximosDias_3_max)}</p>
                    <p>{Math.floor(this.props.proximosDias_3_min)}</p>
                </div>
                <span className="separador"></span>
                <div>
                    <p className="container__nextDays-day">13</p>
                    <p>{Math.floor(this.props.proximosDias_4_max)}</p>
                    <p>{Math.floor(this.props.proximosDias_4_min)}</p>
                </div>
            </div>
        </div>
    )}
}

export default WeatherInfo;