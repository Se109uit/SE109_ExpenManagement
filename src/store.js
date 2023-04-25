import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import loginReducer from './features/firebase/firebaseSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login:loginReducer
  },
})