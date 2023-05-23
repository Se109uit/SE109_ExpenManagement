import React from 'react'
import './home.css'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Bar } from "react-chartjs-2";
import {CardActions, CardContent, Typography, IconButton, Box, Card, Button } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Home = () => {
  

  return (
    <div className='Home'>
      <div className='spending mb-4'>
        <div className='money-spending'>
          <li>
            <h3>Thu nhập: </h3>
            <div className='money'>
              <h3>12000000</h3>
            </div>
          </li>

          <li>
            <h3>Chi tiêu: </h3>
            <div className='money'>
              <h3>0</h3>
            </div>
          </li>

          <li>
            <h3>Tổng: </h3>
            <div className='money'>
              <h3>12000000</h3>
            </div>
          </li>
          
        </div>
        <Calendar/>
        
      </div>
      <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography> */}
              <Typography variant="h5" component="div">
                Tiền chuyển đi
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography> */}
              <Typography variant="body2">
                100.000 VND
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Sửa</Button>
              <Button size="small">Chia sẻ</Button>
              <Button size="small">Xoá</Button>
            </CardActions>
          </Card>
        </Box>
    </div>
  )
}
export default Home