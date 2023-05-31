import React, {useEffect} from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import {useDispatch, useSelector} from 'react-redux'
import {signout} from '../../features/firebase/firebaseSlice'
import {openadd} from '../../features/spend/spendSlice'

import Home from '../../assets/Home.png'
import User from '../../assets/User.png'
import Calendar from '../../assets/Calendar.png'
import PhanTich from '../../assets/PhanTich.png'
import addSpending from '../../assets/AddSpending.png'
import Logout from '../../assets/Logout.png'

import './Nav.css';
import { useTranslation } from 'react-i18next';

const Nav = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { collapseSidebar} = useProSidebar();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login.isLogin);

    function handleLogout ()  {
        const confirmed = window.confirm('Are you want to logout?');
        if (confirmed)
        dispatch(signout());
    }

    return (
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
            <div className='nav-bar col-2' style={{ height: "100vh", width: 'auto' }}>
                <Sidebar className="side-bar" style={{ height: "100vh" }}>
                    <Menu>
                        <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                        collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                        >
                        {" "}
                        </MenuItem>
                        <MenuItem 
                            icon={<img className="img-nav" src={Home}/>}
                            component={<Link to="home" />}
                            > {t('nav.trangchu')} </MenuItem>
                        <MenuItem 
                            icon={<img className="img-nav" src={PhanTich}/>}
                            component={<Link to="analysis" />}
                        > {t('nav.thongke')} </MenuItem>
                        <SubMenu icon={<img className="img-nav" src={User}/>} label={t('nav.taikhoan')}>
                            <MenuItem
                                component={<Link to="accountinfor" />}
                            > {t('nav.taikhoan')}</MenuItem>
                            <MenuItem
                                component={<Link to="resetpassword" />}
                            > {t('nav.doimatkhau')}</MenuItem>
                            {/* <MenuItem> Ngôn ngữ </MenuItem> */}
                            <MenuItem
                                component={<Link to="history" />}
                            > {t('nav.lichsu')} </MenuItem>
                            <MenuItem
                                component={<Link to="currency" />}
                            > {t('nav.tygia')} </MenuItem>
                            <MenuItem
                                onClick={() => handleLogout()}
                            > 
                            <div className='p-1'></div>
                            <p className="text-danger pb-2">{t('nav.dangxuat')}</p> 
                            </MenuItem>
                        </SubMenu>
                        <MenuItem 
                            icon={<img className="img-nav" src={addSpending}/>}
                            onClick={() => dispatch(openadd())}
                            // component={<Link to="addSpending" />}
                        > {t('nav.themchitieu')} </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <main className="col">
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default Nav