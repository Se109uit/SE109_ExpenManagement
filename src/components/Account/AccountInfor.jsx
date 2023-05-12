import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { selectUsers } from '../../features/firebase/firebaseSlice';
import { useSelector } from 'react-redux';

const AccountInfor = () => {
    const loginState = useSelector(selectUsers);
    return (
        <>
            {/* Avatar */}
            <div className='d-flex align-items-center flex-column mt-3'>
                <img className="img_avatar img-fluid rounded-circle shadow-4-strong" 
                alt="Responsive image" 
                src="/src/assets/female.png" />
                <Button className='my-2' variant="contained" startIcon={<AddIcon />}>
                    Thay đổi ảnh
                </Button>
            </div>
            {/* Button */}
            <div className='d-flex justify-content-center'>
                <button className='button-logout'>Lưu</button>
            </div>
        </>
    )
}

export default AccountInfor