import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import counterReducer from './features/counter/counterSlice'
import loginReducer from './features/firebase/firebaseSlice'
// const persistConfig = {
//   key: 'name',
//   version: 1.1,
//   storage,
// };


// export const rootReducer = combineReducers({
//   counter: counterReducer,
//   login: loginReducer
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActionPaths: ['payload.headers'],
//         // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'users/login/fulfilled', 'users/signup/fulfilled'],
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer
  },
})