import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import calculateTimetoThickness from '../helpers/calculateTimetoThickness';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const getData = (variables) => {
    let thicknessArray = [];
    let timeArray = [];
    
    for(let i = 0; i < 120; i++){
        let { finalThickness } = calculateTimetoThickness({...variables, time: i, timeUnit: 'min', finalThicknessUnit: 'um'});

        thicknessArray.push(finalThickness);
        timeArray.push(i);
    }

  return {
    data: thicknessArray,
    labels: timeArray,
  };
};

export default function ChartThicknessTime({ variables }) {
  const { data, labels } = getData(variables);

  const dataPoints = {
    labels,
    datasets: [
      {
        label: "Tiempo - Grosor",
        data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-row sm:w-full">
      <span className="-rotate-90 h-0 my-auto">Grosor (μm)</span>
      <div className="flex flex-col flex-grow">
        <Line className="flex-grow" options={options} data={dataPoints} />
        <span>Tiempo (min)</span>
      </div>
    </div>
  );
}
