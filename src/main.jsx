import React from 'react'
import ReactDOM from 'react-dom/client'
import { Container } from 'react-bootstrap';
import App from './App'
import './index.css'

import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
