import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to='account'>Account</Link>
        <Outlet></Outlet>
    </div>
  )
}

export default Home