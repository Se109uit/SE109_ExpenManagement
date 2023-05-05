import React from 'react'
import { Container, Row} from 'reactstrap'
import {Link, NavLink} from 'react-router-dom'
import './navbar.css'

import avatarUser from '../../assets/Avatar.png'
// import test from '../../assets/image/add.png'

// import {AiFillCalendar} from 'react-icons/ai'
import {AiFillHome} from 'react-icons/ai'
// import {MdOutlineLocalAtm} from 'react-icons/md'

import Home from '../../assets/Home.png'
import User from '../../assets/User.png'
import Calendar from '../../assets/Calendar.png'
import PhanTich from '../../assets/PhanTich.png'
import addSpending from '../../assets/AddSpending.png'
import Logout from '../../assets/Logout.png'


const nav_links = [
  {
    path: '/home',
    icon: <img src={Home}/>,
  },
  // {
  //   path: '/calendar',
  //   icon: <img src={Calendar}/>,
  // },
  {
    path: '/addSpending',
    icon: <img src={addSpending}/>,
  },
  {
    path: '/analysis',
    icon: <img src={PhanTich}/>,
  },
  {
    path: '/user',
    icon: <img src={User}/>,
  },
]
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.btn-login');


const openModal = () => {
  modal.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
};

// for (let i = 0; i <= btnsOpenModal.length; i++){
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

const eventOpen = () => btnsOpenModal.addEventListener('click', openModal)
const eventClose = () => btnCloseModal.addEventListener('click', closeModal)

const Navbar = () => {
  return (
      <div className='Navbar'>
        {/* <div className='user-icon'>
          <img src={User}></img>
        </div> */}
        {/* <div className='nav-items'> */}
          <div className='menu-items'>
          { 
            nav_links.map((item, index) => (
              <li key={index} to={item.path} className={navClass => navClass.isActive ? 'active_link' : ''}>
              <Link to={item.path} className='icon'><a >{item.icon}</a></Link>
              {/* <Link to={item.path} className='title'><a >{item.display}</a></Link> */}
              </li>
            ))
          }
          </div>
        {/* </div> */}


      {/* Login */}

      
      </div>
  )
}
export default Navbar