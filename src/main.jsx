import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import { ProSidebarProvider } from 'react-pro-sidebar';

import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ProSidebarProvider>
          <App />
    </ProSidebarProvider>
  </Provider>,
)