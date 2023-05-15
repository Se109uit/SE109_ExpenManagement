import React from 'react'
import { Link } from 'react-router-dom'

const AccountLink = () => {
    return (
        <div>
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <ul class="nav navbar-nav">
                    <li>
                        <Link to="accountinfor">Thông tin tài khoản</Link>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default AccountLink