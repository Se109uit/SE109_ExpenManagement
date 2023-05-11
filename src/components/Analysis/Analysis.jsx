import React from 'react'
import './analysis.css'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
)
const Analysis = () => {
  return (
    <div className='Analysis'>
      <div className='nav'>
        <li>Tuần</li>
        <li>Tháng</li>
        <li>Năm</li>
      </div>

      <div className='chart'>
        <Bar className='chart-bar'
          data={{
            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
            datasets: [
              {
                data: [900000, 1200000],
                label: "Africa",
                backgroundColor: "#1ECCEC",
                fill: false,
                maxBarThickness: 30,
              },
            ]
          }}
          options={{
            title: {
              display: true,
            },
            legend: {
              display: true,
              position: "bottom"
            },
          }}
        ></Bar>
      </div>
    </div>
  )
}

export default Analysis









// import React from 'react'
// import './analysis.css'
// import { Line, Bar } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement
// } from 'chart.js'

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement
// )
// const Analysis = () => {
//   return (
//     <div className='Analysis'>
//       <Bar className='chart'
//         data={{
//           labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
//           datasets: [
//             {
//               data: [900000],
//               label: "Africa",
//               backgroundColor: "red",
//               fill: false
//             },
//           ]
//         }}
//         options={{
//           title: {
//             display: true,
//             text: "World population per region (in millions)"
//           },
//           legend: {
//             display: true,
//             position: "bottom"
//           }
//         }}
//       ></Bar>
//     </div>
//   )
// }

// export default Analysis

