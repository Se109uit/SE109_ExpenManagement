import React, {useEffect} from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../features/firebase/firebase'
import { signout } from '../../features/firebase/firebaseSlice'

import AddSpend from '../AddSpend/AddSpend';
import { use } from 'i18next';

const RootPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login.isLogin);
    const openState = useSelector((state) => state.spend.isOpen);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('expense/home');
            } else {
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
            </div>
        </>
    )
}

export default RootPage