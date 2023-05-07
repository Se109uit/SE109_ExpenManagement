import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className='d-flex justify-content-center flex-column text-center'>
            <h1 className='text-danger'>404</h1>
            <div>
                <p>Không tìm thấy trang</p>
            </div>
            <div>
                <p>Về trang chủ:</p> 
                <Link to='home'>Nhà chính</Link>
            </div>
        </div>
    )
}

export default ErrorPage