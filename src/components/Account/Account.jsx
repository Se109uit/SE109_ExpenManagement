import React from 'react'
import {Link, Outlet} from 'react-router-dom'

import './Account.css';

const Account = () => {
    return (
        <>
            {/* Name */}
            <div className='text-center shadow-sm p-1 mb-2 bg-white rounded'>
                <h2>Kirito</h2>
            </div>

            {/* Avatar */}
            <div className='d-flex align-items-center flex-column'>
                <img className="img_avatar img-fluid rounded-circle shadow-4-strong" 
                alt="Responsive image" 
                src="/src/assets/female.png" />
                <div className='text-center mt-2'>
                    <p>Tiền hàng tháng</p>
                    <h4 className='font-weight-bold'>3.000.000 VND</h4>
                </div>
            </div>

            {/* Link */}
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#accountinfor">Thông tin tài khoản</a>
                    </li>
                </ul>
            </div>
            </nav>
            {/* <Outlet></Outlet> */}

            {/* Button */}
            <div className='d-flex justify-content-center'>
                <button className='button-logout'>Đăng xuất</button>
            </div>
        </>
    )
}

export default Account