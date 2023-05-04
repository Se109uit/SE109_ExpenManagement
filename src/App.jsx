// import React, { useState } from 'react';
// import { Container, Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { Counter } from './features/counter/counter';

// import { BrowserRouter, Route, Link } from 'react-router-dom';
// import Login from './components/Login/Login';
// import './App.css'


// const App = () => {
//   return (
//     <div className='App'>
//       <Login></Login>
//     </div>
//   );
// };

// export default App;

import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import Rootpage from './components/RootPage/RootPage';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AccountInfor from './components/Account/AccountInfor';
import AppInfor from './components/Account/AppInfor';
import Currency from './components/Account/Currency';
import History from './components/Account/History';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Rootpage/>}>
            <Route index element={<Login/>}></Route>
            <Route path='signup' element={<SignUp/>}/>
            <Route path='home' element={<Home/>}>
                <Route path='account' element={<Account/>}>
                    <Route index path='accountinfor' element={<AccountInfor/>}></Route>
                    <Route path='appinfor' element={<AppInfor/>}></Route>
                    <Route path='currency' element={<Currency/>}></Route>
                    <Route path='history' element={<History/>}></Route>
                </Route>
            </Route>
            <Route path='*' element={<ErrorPage/>}></Route>
        </Route>
    )
);

const AppRouter = () => {
    return(
        <RouterProvider router={router}/>
    )
}

export default AppRouter;