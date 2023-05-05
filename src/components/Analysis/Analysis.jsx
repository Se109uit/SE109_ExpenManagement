import React from 'react'
import './analysis.css'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)


const Analysis = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [
      {
        label: '369',
        data: [3,6,9],
        backgroundColor:'aqua',
        borderColor: 'black',
        borderWidth: 1,

      }
    ]
  }

  const options = {
    
  }
  

  return (
    <div className='Analysis'>
      Analysis
      <div>
        <Bar>
          data={data}
          options={options}
        </Bar>
      </div>
      
      
    </div>
  )
}

export default Analysis
