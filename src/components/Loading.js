import React from 'react'
import Lottie from 'react-lottie';

import './style/WeatherInfo.css'

import loading from './animations/27-loading.json'


class Loading extends React.Component{

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


    constructor(props) {
        super(props);
        this.state = {isStopped: false, isPaused: false};
      }

    render(){
        const animationOptions = {
            loop: true,
            autoplay: true,
            animationData: loading,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return (
        <div className="container_WeatherInfo" >
            <div className="container__weatherinfoCurrentDay" >
                <div className="header_info">
                    <p className="city">Loading</p>
                    <div>
                        <p></p>
                    </div>
                    <div>
                        <p></p>
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
                        <p></p>
                        <p></p>
                    </div>
                    <div className="container__currenttemp">
                        <p className="currentTemp"></p>
                    </div>
                    <div className="container__hum">
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Loading;