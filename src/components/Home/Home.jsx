import React from 'react'
import './home.css'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Bar } from "react-chartjs-2";
import {CardActions, CardContent, Typography, IconButton, Box, Card, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className='Home d-flex flex-column'>
      <div className='spending d-flex flex-rows'>
        <div className='money-spending d-flex flex-column'>
          <div className='total d-flex flex-row  justify-content-between'>
            <p className='title fs-5 fw-bold'>{t('home.sodudau')}:</p>
            <p className='money fs-5 fw-bold '>12000000</p>
          </div>
          <div className='total d-flex flex-row  justify-content-between'>
            <p className='title fs-5 fw-bold'>{t('home.soducuoi')}: </p>
            <p className='money fs-5 fw-bold '>0</p>
          </div>
          <div className='total d-flex flex-row  justify-content-between'>
            <p className='title fs-5 fw-bold'>{t('home.dachi')}: </p>
            <p className='money fs-5 fw-bold '>0</p>
          </div>
         
          
        </div>
        <Calendar/> 
        {/* Calendar */}
        
      </div>
      <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography> */}
              <Typography variant="h5" component="div">
              {t('home.tienchuyendi')}
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography> */}
              <Typography variant="body2">
                100.000 VND
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{t('home.sua')}</Button>
              <Button size="small">{t('home.chiase')}</Button>
              <Button size="small">{t('home.xoa')}</Button>
            </CardActions>
          </Card>
        </Box>
    </div>
  )
}
export default Home