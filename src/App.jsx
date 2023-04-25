import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Counter } from './features/counter/counter';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import './App.css'






const App = () => {
  return (
    <div className='App'>
      <Login></Login>
    </div>
  );
};

export default App;
