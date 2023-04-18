import React from 'react'
import { Container, NavLink, Row} from 'reactstrap'
import './navbar.css'

import avatarUser from '../../assets/image/Avatar.png'
// import test from '../../assets/image/add.png'

// import {AiFillCalendar} from 'react-icons/ai'
// import {AiFillHome} from 'react-icons/ai'
// import {MdOutlineLocalAtm} from 'react-icons/md'

import Home from '../../assets/image/Home.png'
import User from '../../assets/image/User.png'
import Calendar from '../../assets/image/Calendar.png'
import PhanTich from '../../assets/image/PhanTich.png'
import addSpending from '../../assets/image/AddSpending.png'

const nav_links = [
  {
    path: '/home',
    icon: <img src={Home}/>,
    display: 'Trang chủ'
  },
  {
    path: '/calendar',
    icon: <img src={Calendar}/>,
    display: 'Lịch'
  },
  {
    path: '/addSpending',
    icon: <img src={addSpending}/>,
    display: 'Thêm chi tiêu'
  },
  // =======================
  {
    path: '/addSpending',
    icon: <img src={PhanTich}/>,
    display: 'Phân tích'
  },
  {
    path: '/addSpending',
    icon: <img src={User}/>,
    display: 'Tài khoản'
  },
]

const Navbar = () => {
  return (
    <Container>
      <Row>
        <div className='Navbar'>
          <div className='user-icon'>
            <img src={avatarUser}></img>
            <div className='text'>
              <h2>Nguyễn Thanh Sang</h2>
              <p>Quản lý</p>
            </div>
          </div>

          <div className='menu-items'>
            {
              nav_links.map((item, index) => (
               <li key={index}>
                <NavLink to={item.path} className={navClass => navClass.isActive ? 'active_link' : ''}>
                <a className='icon'>{item.icon}</a>
                <a className='title'>{item.display}</a>
                  </NavLink>      
               </li>
              ))
            }

            {/* {nav_links.map((item) => {
              return <li
              key={item.id}
              onClick={active === item.id ? 'active':""}
              >
                {item.icon}
                <span>{item.display}</span>
              </li>
            })} */}

          </div>
          <div className='bottom-nav'>
            <li>
              Sign Out
            </li>
          </div>
        </div>
      </Row>
    </Container>
  )
}
export default Navbar