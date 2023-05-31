import React, {useEffect, useState} from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../features/firebase/firebase'
import { signout } from '../../features/firebase/firebaseSlice'

import AddSpend from '../AddSpend/AddSpend';
import ChangeSpend from '../AddSpend/ChangeSpend';
import { use } from 'i18next';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const RootPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login.isLogin);
    const openState = useSelector((state) => state.spend.isOpen);
    const changeState = useSelector((state) => state.change.isChange);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                navigate('expense/home');
            } else {
                setLoading(false);
                dispatch(signout())
                navigate('/');
            }
        });
      }, [loginState]);

    return (
        <>
            <div>
                <Outlet />
                {
                    openState && <AddSpend />
                }
                {
                    changeState && <ChangeSpend />
                }
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    )
}

export default RootPage