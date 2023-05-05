import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import '../App.css'

import Home from "../components/Home/Home";
import AddSpending from "../components/AddSpending/AddSpending";
import Calendar from "../components/Calendar/Calendar";
import Analysis from '../components/Analysis/Analysis'
import User from '../components/User/User'
import Login from "../components/Login/Login";

const Routers = () => {
    return(
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/addSpending' element={<AddSpending/>}/>
            <Route path='/analysis' element={<Analysis/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}
export default Routers