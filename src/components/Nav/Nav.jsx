import React, {useEffect, useState} from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import {useDispatch, useSelector} from 'react-redux'
import {signout} from '../../features/firebase/firebaseSlice'
import {openadd} from '../../features/spend/spendSlice'

import Home from '../../assets/newHome.png'
import User from '../../assets/Setting.png'
import PhanTich from '../../assets/newAnalysis.png'
import addSpending from '../../assets/newAddSpending.png'

import newUser from '../../assets/newUser2.png'
import Currency from '../../assets/currency.png'
import History from '../../assets/history.png'
import resetPass from '../../assets/resetPass.png'
import logOut from '../../assets/logOut.jpg'


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { BasicModal } from '../Notification/Notification';
import './Nav.css';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';

const Nav = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { collapseSidebar} = useProSidebar();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login.isLogin);

    // Modal
    const [openM, setOpenM] = useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    
    const [isOk, setIsOk] = useState(false);
    //

    function handleLogout ()  {
        handleOpenM();
    }

    const handleConfirm = () => {
        dispatch(signout());
        handleCloseM();
            // navigate('/login');
      };

    return (
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
            <div className='nav-bar col-2' style={{ height: "100vh", width: 'auto' }}>
                <Sidebar className="side-bar d-flex flex-column justify-content-between">
                    <Menu>
                        <MenuItem className='sider'
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                        collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                        >
                        {" "}
                        </MenuItem>
                        <MenuItem className='menuItems'
                            icon={<img className="img-nav" src={Home}/>}
                            component={<Link to="home" />}
                            > <p className='fs-6 fw-bold'>{t('nav.trangchu')}</p> </MenuItem>
                        <MenuItem className='menuItems'
                            icon={<img className="img-nav" src={PhanTich}/>}
                            component={<Link to="analysis" />}
                        > <p className='fs-6 fw-bold'>{t('nav.thongke')}</p> </MenuItem>
                        <SubMenu className='sub' icon={<img className="img-nav" src={User}/>} label={<p className='fs-6 fw-bold'>{t('nav.taikhoan')}</p>}>
                            <MenuItem className='item-user'
                                icon={<img className="img-user" src={newUser}/>}
                                component={<Link to="accountinfor" />}
                            > <p className='fs-6 fw-normal'>{t('nav.taikhoan')}</p></MenuItem>
                            <MenuItem className='item-user'
                            icon={<img className="img-user" src={resetPass}/>}
                                component={<Link to="resetpassword" />}
                            > {t('nav.doimatkhau')}</MenuItem>
                            {/* <MenuItem> Ngôn ngữ </MenuItem> */}
                            {/* <MenuItem className='item-user'
                            icon={<img className="img-user" src={History}/>}
                                component={<Link to="history" />}
                            > {t('nav.lichsu')} </MenuItem> */}
                            <MenuItem className='item-user'
                            icon={<img className="img-user" src={Currency}/>}
                                component={<Link to="currency" />}
                            > {t('nav.tygia')} </MenuItem>
                            <MenuItem className='item-user'
                            icon={<img className="img-user" src={logOut}/>}
                                onClick={() => handleLogout()}
                            > 
                            <div className='p-1'></div>
                            <p className="text-danger pb-2">{t('nav.dangxuat')}</p> 
                            </MenuItem>
                        </SubMenu>
                        <MenuItem className='menuItems'
                            icon={<img className="img-nav" src={addSpending}/>}
                            onClick={() => dispatch(openadd())}
                            // component={<Link to="addSpending" />}
                        > <p className='fs-6 fw-bold'>{t('nav.themchitieu')}</p></MenuItem>
                    </Menu>
                    
                </Sidebar>
            </div>
            <main className="col">
                <Outlet></Outlet>
            </main>

            {
                openM &&
                <BasicModal 
                open={openM} 
                handleOpen={handleOpenM} 
                handleClose={handleCloseM} 
                handleConfirm={handleConfirm}
                title={t('nav.dangxuat')}
                textBtnOut={t('nav.huy')}
                textBtnOk={t('nav.dangxuat')}
                text={t('nav.bancochacchanmuondangxuat')}
                />
            }
        </div>
    )
}

export default Nav

