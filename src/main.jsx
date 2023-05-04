import React from 'react'
import ReactDOM from 'react-dom/client'
import { Container } from 'react-bootstrap';
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>,
)