import React from 'react'
import './home.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Bar } from "react-chartjs-2";

const Home = () => {
  return (
    <div className='Home'>
      <div className='spending'>
        <div className='money-spending'>
          <li>
            <h3>Số dư đầu: </h3>
            <div className='money'>
              <h3>12000000</h3>
            </div>
          </li>

          <li>
            <h3>Số dư cuối: </h3>
            <div className='money'>
              <h3>0</h3>
            </div>
          </li>

          <li>
            <h3>Đã chi: </h3>
            <div className='money'>
              <h3>12000000</h3>
            </div>
          </li>
          
        </div>
        <Calendar/>

        
      </div>
    </div>
  )
}
export default Home
