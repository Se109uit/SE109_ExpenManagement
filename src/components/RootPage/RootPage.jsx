import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'

const RootPage = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default RootPage