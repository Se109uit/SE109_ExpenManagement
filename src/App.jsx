import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Counter } from './features/counter/counter';
import './App.css'

import Navbar from './components/Navbar/Navbar';
// import Home from './components/Home/Home';
import Router from './router/Routers';

const App = () => {
  return(
    <div className='App'>
      <Navbar/>
      <Router/>
    </div>
  )
}
export default App;

