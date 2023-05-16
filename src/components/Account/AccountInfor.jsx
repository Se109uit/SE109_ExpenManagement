import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/firebase/firebaseSlice';
import { 
    updateProfile, 
    updateEmail, 
    onAuthStateChanged, 
    signOut, 
    reauthenticateWithCredential,
    sendEmailVerification,
    EmailAuthProvider,
    deleteUser
} from 'firebase/auth';
import { collection, doc, getDoc } from "firebase/firestore"; 
import {auth, db} from '../../features/firebase/firebase';

import './Account.css'

const AccountInfor = () => {
    const loginState = useSelector(selectUsers);
    const user = auth.currentUser;
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(dayjs('2023-05-14'));
    const [gender, setGender] = useState('');
    const [money, setMoney] = useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    function handleMoneyChange(event) {
        setMoney(event.target.value);
    }

    useEffect(() => {
      const showInfor = async () => {
        console.log('loginState', loginState);
        console.log('user data', user);
        const usr = user.uid;
        const docRef = doc(db, "infotemp", usr);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setUserData(docSnap.data());
            setName(docSnap.data().name);
            console.log("Document data:", docSnap.data().name);
        } else {
            console.log("No such document!");
        }
      }

      return () => {showInfor()};
  }, [userData]);

  return (
    <div className='mt-4'>
      <Box className='row justify-content-center'>
        <h3 className='my-2'>Thông tin người dùng:</h3>
        <Box className='col-md-3'>
          {/* Avatar */}
          <Box className='d-flex align-items-center flex-column mt-3'>
            <img
              className="img_avatar img-fluid rounded-circle shadow-4-strong"
              alt="Responsive image"
              src="/src/assets/female.png"
            />
            <Button className='my-2' variant="contained" startIcon={<AddIcon />}>
              Thay đổi ảnh
            </Button>
          </Box>
        </Box>
        <Box className='col-md-6'>
          {/* User information */}
          <Box className='my-3 t-box'>
            <TextField 
            id="standard-basic" 
            label="Tên" 
            variant="outlined" 
            fullWidth
            defaultValue={name}
            onChange={handleNameChange}
            />
          </Box>
          <Box className='my-3'>
            {/* <p className='form-control'>{userData?.birthday}</p> */}
            <DatePicker
                label="Ngày sinh"
                value={birthday}
                onChange={(newValue) => setBirthday(newValue)}
                slotProps={{ textField: { variant: 'outlined' } }}
            />
          </Box>
          <Box className='my-3 w-box'>
            {/* <p className='form-control'>{userData?.gender}</p> */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="ngày sinh"
                    onChange={handleGenderChange}
                >
                    <MenuItem value={true}>Nam</MenuItem>
                    <MenuItem value={false}>Nữ</MenuItem>
                </Select>
            </FormControl>
          </Box>
            <Box className='my-3 t-box'>
                <TextField 
                id="standard-basic" 
                label="Tiền hàng tháng" 
                variant="outlined" 
                fullWidth
                defaultValue={userData?.money}
                onChange={handleMoneyChange}
                />
            </Box>
        </Box>
      </Box>
      {/* Button */}
      <Box className='d-flex justify-content-center mb-4'>
        <button className='button-logout'>Lưu</button>
      </Box>
      <hr />
      <h3 className='my-2'>Xuất CSV:</h3>
      <Box className="mx-3 text-center">
        <Button variant="contained">Xuất CSV</Button>
      </Box>
    </div>
  );
};

export default AccountInfor;
