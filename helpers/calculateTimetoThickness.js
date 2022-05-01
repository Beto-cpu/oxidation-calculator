import { coefficients, constantK } from '../constants/index';
import getColorFromThickness from '../helpers/getColorFromThickness';

export default function calculateTimetoThickness(values){
    const newResults = {};

    const kelvinTemperature = values.temperatureUnit == 'k'? values.temperature  : values.temperature + 273.15 ;
    const hrTime = values.timeUnit == 'hrs'? values.time : values.time / 60 ;
    const umInitialThickness = values.initialThicknessUnit == 'um'? values.initialThickness : values.initialThickness / 1000 ;
    const actualLinearCoefficient = coefficients[values.type][values.orientation]['linear'];
    const actualParabolicCoefficient = coefficients[values.type][values.orientation]['parabolic'];
    

    newResults.linear = actualLinearCoefficient['d0'] * Math.E ** (-actualLinearCoefficient['ea']/( constantK * kelvinTemperature));
    newResults.parabolic = actualParabolicCoefficient['d0'] * Math.E ** (-actualParabolicCoefficient['ea']/( constantK * kelvinTemperature));
    const tao = umInitialThickness ** 2 / newResults.parabolic + umInitialThickness / newResults.linear;
    newResults.finalThickness = (0.5)*(newResults.parabolic * (( 1 / (newResults.linear ** 2) + 4 * (tao + hrTime) / newResults.parabolic) ** (1/2)) - newResults.parabolic / newResults.linear );
    newResults.finalThickness = Math.round(newResults.finalThickness * 10000) / 10000

    let {value, name} = getColorFromThickness(newResults.finalThickness);
    newResults.colorValue = value;
    newResults.colorName = name;


    newResults.finalThickness = values.finalThicknessUnit == 'um'? newResults.finalThickness : newResults.finalThickness * 1000 ;

    // Notacion Cientifica
    newResults.linear = newResults.linear.toExponential(4);
    newResults.parabolic = newResults.parabolic.toExponential(4);
    newResults.finalThickness = newResults.finalThickness.toExponential(4);

    

    return (newResults);
  }