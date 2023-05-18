import React, {useEffect} from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';

const RootPage = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.login.isLogin);

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
            </div>
        </>
    )
}

export default RootPage