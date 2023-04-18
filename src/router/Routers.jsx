import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import '../App.css'

import Home from "../components/Home/Home";
import AddSpending from "../components/AddSpending/AddSpending";
import Calendar from "../components/Calendar/Calendar";

const Router = () => {
     return(
          <Routes>
               <Route path='/' element={<Navigate to='/home'/>}/>
               <Route path='/home' element={<Home/>}/>
               <Route path='/calendar' element={<Calendar/>}/>
               <Route path='/addSpending' element={<AddSpending/>}/>
          </Routes>
     )
}
export default Router