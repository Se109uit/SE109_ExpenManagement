import React, {useEffect, useState} from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";

import {
    collection,
    doc,
    getDoc,
    updateDoc,
    setDoc,
    addDoc,
    where,
    onSnapshot,
    query,
    documentId,
    getDocs,
    QuerySnapshot,
  } from "firebase/firestore";
  import {
    auth,
    db,
    storage,
    SPEND_COLLECTION,
    WALLET_COLLECTION,
    DATA_COLLECTION,
    avatarImg,
  } from "../../features/firebase/firebase";

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
import { InputModal } from '../Notification/InputModal';
import './nav.css';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import { set } from 'date-fns';

const Nav = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { collapseSidebar} = useProSidebar();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login.isLogin);
    const user = auth.currentUser;

    // Modal
    const [openM, setOpenM] = useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    
    const [isOk, setIsOk] = useState(false);

    function handleLogout ()  {
        handleOpenM();
    }

    const handleConfirm = () => {
        dispatch(signout());
        handleCloseM();
            // navigate('/login');
      };

    // Input modal
    const [openI, setOpenI] = useState(false);
    const [errorTF, setErrorTF] = useState(false);
    const datetime = new Date();
    const handleOpenI = () => setOpenI(true);
    function handleCloseI(event, reason) {
        if (reason && reason == "backdropClick") return;
        setOpenI(false);
      }
    const [valueTF, setValueTF] = useState('');
    const handleChangeTF = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setValueTF(onlyNums);
    };

    let moneyNow =  0;
    const handleConfirmTF = async () => {
        //check money
        if (valueTF === '' || valueTF === 0 || valueTF === null) {
            setErrorTF(true);
            return;
        }
        setErrorTF(false);
        //transfer money to number
        if (typeof valueTF === 'string') {
            moneyNow = parseInt(valueTF.replace(/[^0-9.-]+/g,""));
          }
          else if (typeof valueTF === 'number') {
            moneyNow = valueTF;
          }
          //update money
          await setDoc(doc(db, WALLET_COLLECTION, user.uid), {
            [format(datetime, "MM_yyyy")]: [moneyNow],
          });

    };
    
    // useEffect(async () => {
    //     const docRef = collection(db, WALLET_COLLECTION);
    //     const q = query(docRef, where(documentId(), "==", user.uid));
    //     const querySnapshot = await getDocs(q);
    //     // const formattedDate = format(datetime, "MM_yyyy");
    //     console.log(querySnapshot);

    //     if (querySnapshot.empty === true) {
    //         handleOpenI();
    //     } 
    //   }, [loginState]);

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
            {
                openI &&
                <InputModal
                open={openI}
                handleOpen={handleOpenI}
                handleClose={handleCloseI}
                handleConfirm={handleConfirmTF}
                title={'Nhập thu nhập của bạn:'}
                textBtnOk={'OK'}
                text={'Thu nhập'}
                valueTF={valueTF}
                handleChangeTF={handleChangeTF}
                errorTF={errorTF}
                />
            }
        </div>
    )
}

export default Nav

