import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { Provider, useSelector } from 'react-redux'

import { ProSidebarProvider } from 'react-pro-sidebar';
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistor } from './store'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ProSidebarProvider>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      {/* </PersistGate> */}
    </ProSidebarProvider>
  </Provider>,
)