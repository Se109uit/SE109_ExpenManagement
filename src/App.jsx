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
import Nav from './components/Nav/Nav';
import AddSpending from './components/AddSpending/AddSpending';
import Analysis from './components/Analysis/Analysis';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Rootpage/>}>
            <Route index element={<Login/>}></Route>
            <Route path='login' element={<Login/>}/>
            <Route path='signup' element={<SignUp/>}/>
            <Route path='expense' element={<Nav/>}>
                <Route path='home' element={<Home/>}></Route>
                <Route path='addspending' element={<AddSpending/>}></Route>
                <Route path='analysis' element={<Analysis/>}></Route>
                <Route path='accountinfor' element={<AccountInfor/>}></Route>
                <Route path='history' element={<History/>}></Route>
                <Route path='currency' element={<Currency/>}></Route>
                <Route path='appinfor' element={<AppInfor/>}></Route>
            </Route>

            <Route path='forgotpassword' element={<ForgotPassword/>}></Route>
            {/* </Route> */}

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