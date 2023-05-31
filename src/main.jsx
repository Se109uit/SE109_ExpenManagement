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

import i18n from './components/locales/Translation/i18n'
import { I18nextProvider } from 'react-i18next'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ProSidebarProvider>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </LocalizationProvider>
      {/* </PersistGate> */}
    </ProSidebarProvider>
  </Provider>,
)