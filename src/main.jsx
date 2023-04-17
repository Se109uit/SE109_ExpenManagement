import React from 'react'
import ReactDOM from 'react-dom/client'
import { Container } from 'react-bootstrap';
import App from './App'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'

import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
