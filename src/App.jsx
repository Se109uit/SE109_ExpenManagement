import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Counter } from './features/counter/counter';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Routers from './router/Routers'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <Routers/>
    </div>
  );
};

export default App;
