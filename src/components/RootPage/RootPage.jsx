import React, {useEffect} from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import AddSpend from '../AddSpend/AddSpend';
import { use } from 'i18next';

const RootPage = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.login.isLogin);
    const openState = useSelector((state) => state.spend.isOpen);

    useEffect(() => {
        if (loginState)
          navigate('expense/accountinfor');
        else 
          navigate('/');
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