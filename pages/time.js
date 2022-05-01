import Head from 'next/head';
import { useState, useEffect } from 'react';

import calculateThicknesstoTime from '../helpers/calculateThicknesstoTime';

import Header from '../components/header';
import Footer from '../components/footer';
import ChartThicknessTime from '../components/chartThicknessTime';

export default function Time() {
  const [ variables, setVariables ] = useState({initialThickness: 25, initialThicknessUnit: 'nm', finalThickness: 25, finalThicknessUnit: 'nm', temperature: 0, temperatureUnit: 'c', type: 'seco', orientation: '100', timeUnit: 'hrs'});
  const [ results, setResults] = useState({linear: '-', parabolic: '-', time: '-', colorName: '', colorValue: 'rgb(255,255,255)'});

  
  const changeHandler = (e) => {
    e.preventDefault();

    const newValue = {...variables};
    newValue[e.target.id] = e.target.type == 'number'? parseFloat(e.target.value) : e.target.value;
    setVariables(newValue);

    setResults(calculateThicknesstoTime(newValue));
  };


  useState(()=>{setResults(calculateThicknesstoTime(variables))},[]);


  return (
    <div className='min-h-screen flex flex-col justify-between max-w-full'>
      <Head>
        <title>Grosor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className='flex flex-col items-center text-center mb-6 mx-auto max-w-full'>
        <h1 className='text-2xl font-bold'>Cálculo de tiempo de oxidación para una película de óxido</h1>
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

          {/* Grosor final */}
          <div className='text-2xl'>
            <label>Grosor final</label>
            <div className='flex flex-row place-content-around'>
              <input id="finalThickness" onChange={changeHandler} type="number" defaultValue={25} className='pl-2 border border-gray-500 rounded-md w-9/12 md:w-full md:mr-3'/>
              <select id="finalThicknessUnit" onChange={changeHandler} defaultValue='nm' className='text-center rounded-md border border-gray-500 border-black'>
                <option value="um">μm</option>
                <option value="nm">nm</option>
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
          <div className='flex mb-3 flex-col sm:flex-row'>
            <p className='font-semibold'>B/A (Linear):</p>
            <p className='ml-4'>{results.linear}</p>
          </div>

          {/* Constante Parabólica */}
          <div className='flex mb-3 flex-col sm:flex-row'>
            <p className='font-semibold'>B (Parabólica):</p>
            <p className='ml-4'>{results.parabolic}</p>
          </div>

          {/* Tiempo */}
          <div className='flex mb-3 flex-col sm:flex-row'>
            <p className='font-semibold'>Tiempo:</p>
            <p className='ml-4'>{results.time}</p>
            <select onChange={changeHandler} id="timeUnit" defaultValue='hrs' className='text-center rounded-md border border-gray-500 border-black ml-4'>
              <option value="hrs">hrs</option>
              <option value="min">min</option>
            </select>
          </div>

          {/* Color final */}
          <div className='flex items-center mb-3 flex-col sm:flex-row'>
            <p className='font-semibold'>Color de la película:</p>
            <div className='flex flex-row items-center'>
              <span className='ml-4'>{results.colorName}</span>
              <div className='ml-4 border border-black rounded-sm' style={{height: '25px',width: '25px', backgroundColor: results.colorValue}}></div>
            </div>
          </div>
        </div>
        <div className='w-full overflow-x-scroll sm:overflow-x-hidden'>
          <ChartThicknessTime variables={variables}/>
        </div>

      </main>


      <Footer/>
    </div>
  )
}
