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

import Home from '../../assets/Home.png'
import User from '../../assets/User.png'
import Calendar from '../../assets/Calendar.png'
import PhanTich from '../../assets/PhanTich.png'
import addSpending from '../../assets/AddSpending.png'
import Logout from '../../assets/Logout.png'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { BasicModal } from '../Notification/Notification';
import { InputModal } from '../Notification/InputModal';
import './Nav.css';
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

