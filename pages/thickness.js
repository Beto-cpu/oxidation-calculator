import Head from 'next/head';

import { useState, useEffect } from 'react';

const coefficients = {
  'seco': {
    '100': {
      'linear': {
        'd0': 3.71e6,
        'ea': 2
      },
      'parabolic': {
        'd0': 772,
        'ea': 1.23
      }
    },
    '111': {
      'linear': {
        'd0': 6.23e6,
        'ea': 2
      },
      'parabolic': {
        'd0': 772,
        'ea': 1.23
      }
    }
  },
  'humedo': {
    '100': {
      'linear': {
        'd0': 9.7e7,
        'ea': 2.05
      },
      'parabolic': {
        'd0': 386,
        'ea': 0.78
      }
    },
    '111': {
      'linear': {
        'd0': 1.63e8,
        'ea': 2.05
      },
      'parabolic': {
        'd0': 386,
        'ea': 0.78
      }
    }
  }
};
const constantK = 0.00008617;


import Header from '../components/header';
import Footer from '../components/footer';

export default function Home() {
  const [ variables, setVariables ] = useState({initialThickness: 25, initialThicknessUnit: 'nm', time: 0, timeUnit: 'min', temperature: 0, temperatureUnit: 'c', type: 'seco', orientation: '100', finalThicknessUnit: 'nm'});
  const [ results, setResults] = useState({linear: '-', parabolic: '-', finalThickness: '-', color: 'rgb(255,255,255)'});

  const calculateNewValues = (values) => {
    const newResults = {};

    const kelvinTemperature = values.temperatureUnit == 'k'? values.temperature  : values.temperature + 273.15 ;
    const hrInitialThickness = values.timeUnit == 'hrs'? values.time : values.time / 60 ;
    const umInitialThickness = values.initialThicknessUnit == 'um'? values.initialThickness : values.initialThickness / 1000 ;
    const actualLinearCoefficient = coefficients[values.type][values.orientation]['linear'];
    const actualParabolicCoefficient = coefficients[values.type][values.orientation]['parabolic'];
    

    newResults.linear = actualLinearCoefficient['d0'] * Math.E ** (-actualLinearCoefficient['ea']/( constantK * kelvinTemperature));
    newResults.parabolic = actualParabolicCoefficient['d0'] * Math.E ** (-actualParabolicCoefficient['ea']/( constantK * kelvinTemperature));
    const tao = umInitialThickness ** 2 / newResults.parabolic + umInitialThickness / newResults.linear;
    newResults.finalThickness = (0.5)*(newResults.parabolic * (( 1 / (newResults.linear ** 2) + 4 * (tao + hrInitialThickness) / newResults.parabolic) ** (1/2)) - newResults.parabolic / newResults.linear );
    newResults.color = 'rgb(255,255,255)';

    console.log(tao);

    newResults.finalThickness = values.finalThicknessUnit == 'um'? newResults.finalThickness : newResults.finalThickness * 1000 ;

    // Notacion Cientifica
    newResults.linear = newResults.linear.toExponential(4);
    newResults.parabolic = newResults.parabolic.toExponential(4);
    newResults.finalThickness = newResults.finalThickness.toExponential(4);

    setResults(newResults);
  }
  const changeHandler = (e) => {
    e.preventDefault();

    const newValue = {...variables};
    newValue[e.target.id] = e.target.type == 'number'? parseFloat(e.target.value) : e.target.value;
    setVariables(newValue);

    calculateNewValues(newValue);
  };


  useState(()=>{calculateNewValues(variables)},[]);


  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Head>
        <title>Grosor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className='flex flex-col items-center text-center mb-6'>
        <h1 className='text-2xl font-bold'>Cálculo de grosor final de óxido en oblea de silicio</h1>
        <p className='text-2xl mb-3'>Llene los campos solicitados</p>
        <form className='flex flex-col space-y-5 mt-4 px-2'>

          {/* Grosor Inicial */}
          <div className='text-2xl'>
            <label>Grosor Inicial</label>
            <div className='flex flex-row place-content-around'>
              <input id="initialThickness" onChange={changeHandler} type="number" className='pl-2 border border-gray-500 rounded-md w-9/12 md:w-full md:mr-3' defaultValue={25}/>
              <select id="initialThicknessUnit" onChange={changeHandler} defaultValue='nm' className='text-center rounded-md border border-gray-500 border-black'>
                <option value="um">μm</option>
                <option value="nm">nm</option>
              </select>
            </div>
          </div>

          {/* Tiempo de Oxidación */}
          <div className='text-2xl'>
            <label>Tiempo de oxidación</label>
            <div className='flex flex-row place-content-around'>
              <input id="time" onChange={changeHandler} type="number" defaultValue={0} className='pl-2 border border-gray-500 rounded-md w-9/12 md:w-full md:mr-3'/>
              <select id="timeUnit" onChange={changeHandler} className='text-center rounded-md border border-gray-500 border-black'>
                <option value="min">min</option>
                <option value="hrs">hrs</option>
              </select>
            </div>
          </div>

          {/* Temperatura de oxidación */}
          <div className='text-2xl'>
            <label>Temperatura de oxidación</label>
            <div className='flex flex-row place-content-around'>
              <input id="temperature" onChange={changeHandler} type="number" defaultValue={0} className='pl-2 border border-gray-500 rounded-md w-9/12 md:w-full md:mr-3'/>
              <select id="temperatureUnit" onChange={changeHandler} className='text-center rounded-md border border-gray-500 border-black'>
                <option value="c">°C</option>
                <option value="k">°K</option>
              </select>
            </div>
          </div>

          {/* Tipo de proceso */}
          <div className='text-2xl flex flex-col mx-3'>
            <label>Tipo de proceso</label>
            <select id="type" onChange={changeHandler} className='text-center rounded-md border border-gray-500 border-black '>
              <option value="seco">Seco</option>
              <option value="humedo">Humedo</option>
            </select>
          </div>
          
          {/* Orientación Cristalina */}
          <div className='text-2xl flex flex-col mx-3'>
            <label>Orientación Cristalina</label>
            <select id="orientation" onChange={changeHandler} className='text-center rounded-md border border-gray-500 border-black'>
              <option value="100">{'<100>'}</option>
              <option value="111">{'<111>'}</option>
            </select>
          </div>
        </form>

        {/* Resultado */}
        <div className='text-2xl mt-10 flex flex-col'>
          <h2 className='font-bold'>Resultados</h2>

          {/* Constante Lineal */}
          <div className='flex flex-row'>
            <p className='font-semibold'>B/A (Linear):</p>
            <p className='ml-4'>{results.linear}</p>
          </div>

          {/* Constante Parabólica */}
          <div className='flex flex-row'>
            <p className='font-semibold'>B (Parabólica):</p>
            <p className='ml-4'>{results.parabolic}</p>
          </div>

          {/* Grosor final */}
          <div className='flex flex-row'>
            <p className='font-semibold'>Grosor final:</p>
            <p className='ml-4'>{results.finalThickness}</p>
            <select onChange={changeHandler} id="finalThicknessUnit" defaultValue='nm' className='text-center rounded-md border border-gray-500 border-black ml-4'>
              <option value="um">μm</option>
              <option value="nm">nm</option>
            </select>
          </div>

          {/* Color final */}
          <div className='flex flex-row items-center'>
            <p className='font-semibold'>Color de la película:</p>
            <div className='ml-4 border border-black rounded-sm' style={{height: '25px',width: '25px', backgroundColor: results.color}}></div>
          </div>
        </div>
        
      </main>

      <Footer/>
    </div>
  )
}
