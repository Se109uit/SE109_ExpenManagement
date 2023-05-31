import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './features/counter/counterSlice'
import addspendReducer from './features/spend/spendSlice'
import loginReducer from './features/firebase/firebaseSlice'
import languageSlice from './features/language/languageSlice';
const persistConfig = {
  key: 'name',
  version: 1.1,
  storage,
};


export const rootReducer = combineReducers({
  counter: counterReducer,
  spend: addspendReducer,
  language: languageSlice,
  login: loginReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.headers'],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// // Reset the data
// persistor.purge().then(() => {
//   console.log('Data reset successful');
// }).catch(() => {
//   console.log('Data reset failed');
// });

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     login: loginReducer
//   },
// })