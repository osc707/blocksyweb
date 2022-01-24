import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip
} from 'chart.js'
import React from 'react'
import { PolarArea } from 'react-chartjs-2'

import Gains from './Gains'

const Chart = ({ data, byValue, showGains }): JSX.Element => {
  const formattedGains = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.gains);
  const gains = `Gains: ${formattedGains}, updated ${data.date}`;
  const values = (byValue) ? data.byValue : data.byVolume;
  const label = (byValue) ? 'Percent by $ value' : 'Percent by # of coins';
  const generateColor = (): string => {
    const r = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    const g = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    const b = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    return `rgba(${r}, ${g}, ${b}, .55)`;
  }
  const colors = values.map((coin: string, idx: number) => generateColor());
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  const config = {
    labels: [ ...values.map((coin: any) => `${coin.name} ${coin.ticker}`) ],
    datasets: [
      {
        label: label,
        data: [ ...values.map((coin: any) => coin.percentage)],
        backgroundColor: [ ...colors ],
      }
    ]
  };
  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Assets owned ${label} %`
      }
    },
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className='defiChart'>
      {showGains && (
        <Gains gains={gains}/>
      )}
      <PolarArea data={config} options={options}/>
    </div>
  )
};

export default Chart;