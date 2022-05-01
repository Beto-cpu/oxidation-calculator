import { coefficients, constantK } from '../constants/index';
import getColorFromThickness from './getColorFromThickness';

export default function calculateThicknesstoTime(values){
    const newResults = {};

    const kelvinTemperature = values.temperatureUnit == 'k'? values.temperature  : values.temperature + 273.15 ;
    const umFinalThickness = values.finalThicknessUnit == 'um'? values.finalThickness : values.finalThickness / 1000 ;
    const umInitialThickness = values.initialThicknessUnit == 'um'? values.initialThickness : values.initialThickness / 1000 ;
    const actualLinearCoefficient = coefficients[values.type][values.orientation]['linear'];
    const actualParabolicCoefficient = coefficients[values.type][values.orientation]['parabolic'];
    

    newResults.linear = actualLinearCoefficient['d0'] * Math.E ** (-actualLinearCoefficient['ea']/( constantK * kelvinTemperature));
    newResults.parabolic = actualParabolicCoefficient['d0'] * Math.E ** (-actualParabolicCoefficient['ea']/( constantK * kelvinTemperature));
    const tao = umInitialThickness ** 2 / newResults.parabolic + umInitialThickness / newResults.linear;
    newResults.time = umFinalThickness ** 2 / newResults.parabolic + umFinalThickness / newResults.linear - tao;

    newResults.time = values.timeUnit == "hrs"? newResults.time : newResults.time * 60 ;

    let {value, name} = getColorFromThickness(umFinalThickness);
    newResults.colorValue = value;
    newResults.colorName = name;

    // Notacion Cientifica
    newResults.time = newResults.time.toFixed(4);
    newResults.linear = newResults.linear.toExponential(4);
    newResults.parabolic = newResults.parabolic.toExponential(4);
    

    return (newResults);
  }