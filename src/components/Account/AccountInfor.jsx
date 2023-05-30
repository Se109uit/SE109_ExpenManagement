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

import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, signout } from '../../features/firebase/firebaseSlice';
import { lang } from '../../features/language/languageSlice';

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
import { collection, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { v4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, USER_COLLECTION, avatarImg } from '../../features/firebase/firebase';

import './Account.css'

import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { DocumentScanner } from '@mui/icons-material';



const AccountInfor = () => {

  const { t, i18n } = useTranslation()

  const loginState = useSelector(selectUsers);
  const uid = useSelector((state) => state.login.user);
  const user = auth.currentUser;
  let uuid = null;
  const language = useSelector((state) => state.language.choose);
  const dispatch = useDispatch();
  const [name, setName] = useState('a');
  const [birthday, setBirthday] = useState(dayjs('2023-05-14'));
  const [gender, setGender] = useState('');
  const [money, setMoney] = useState(1);
  const [avatar, setAvatar] = useState('/src/assets/female.png');
  const [selectedFile, setSelectedFile] = useState(null);

  const formattedMoney = money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  const integerMoney = parseInt(formattedMoney.replace(/,/g, ''), 10);

  let imageUrl = null;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const storageRef = ref(getStorage(), `images/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    else {
      imageUrl = avatarImg;
    }
    await updateDoc(doc(db, USER_COLLECTION, user.uid), {
      avatar: imageUrl,
    }).then(
      setAvatar(imageUrl),
      window.alert(t('accountInfo.capnhatanhdaidienthanhcong'))
    )
  };


  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleMoneyChange(event) {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    setMoney(onlyNums);
  }

  const showInfor = async () => {
    const docRef = doc(db, USER_COLLECTION, uuid);
    getDoc(docRef).then(async (docSnap) => {
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        let aBirthday = null;

        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Firefox') > -1) {
          aBirthday = dayjs(docSnap.data().birthday, 'DD/MM/YYYY');
        } 
        else {
          aBirthday = dayjs(docSnap.data().birthday);
        }

        setBirthday(aBirthday);
        const aMoney = docSnap.data().money.toString();
        setMoney(aMoney);
        setGender(docSnap.data().gender);
        console.log("Document data:", docSnap.data());
        setAvatar(docSnap.data().avatar);
      } else if (user !== null && docSnap.exists() === false) {
        try {
          setDoc(doc(db, USER_COLLECTION, uid), {
            avatar: avatarImg,
            birthday: '30/05/2023',
            gender: true,
            money: 0,
            name: user.displayName,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      else {
        console.log("No such document!");
      }
    });


  }

  const updateInformation = async () => {
    const usr = user.uid;
    const docRef = doc(db, USER_COLLECTION, usr);

    const dob = birthday.format('DD/MM/YYYY');

    await updateDoc(docRef, {
      name: name,
      birthday: dob,
      gender: gender,
      money: money
    });

    window.alert(t('accountInfo.capnhatthongtinthanhcong'));
  }

  // function handleLanguageChange(event) {
  //   dispatch(lang(event.target.value));
  // }

  const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uuid = user.uid;
        showInfor();
      } else {
        dispatch(signout());
      }
    });
  }, [loginState]);

  function handleUpdate() {
    updateInformation();
  }


  
  return (
    <div className='mt-4'>
      <Box className='row justify-content-center'>
        <h3 className='my-2'>{t('accountInfo.tieude')}</h3>
        <Box className='col-md-3'>
          {/* Avatar */}
          <Box className='d-flex align-items-center flex-column mt-3'>
            <img
              className="img_avatar img-fluid rounded-circle shadow-4-strong"
              alt={name}
              src={avatar}
            />
            <Box className='text-center' sx={{ width: 300, overflow: 'hidden' }}>
              <input
                accept="image/*"
                id="imageUpload"
                multiple
                type="file"
                onChange={handleFileChange}
                alt='avatar'
                className='py-2 border border-dark'
                data-i18n="[value]showcase.search-value"
              />
              <Button
                type="file"
                className='my-2'
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleUpload}
              >
                {t('accountInfo.anh')}
              </Button>
            </Box>

          </Box>
        </Box>
        <Box className='col-md-6'>
          {/* User information */}
          <Box className='my-3 t-box'>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              hiddenLabel
              id="name-input"
              label={t('accountInfo.ten')}
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
              helperText={name ? "" : t('accountInfo.thieuten')}
              error={name ? false : true}
            />
          </Box>
          <Box className='my-3'>
            {/* <p className='form-control'>{userData?.birthday}</p> */}
            <DatePicker
              label={t('accountInfo.ngaysinh')}
              value={birthday}
              onChange={(newValue) => setBirthday(newValue)}
              slotProps={{ textField: { variant: 'outlined' } }}
              format="DD/MM/YYYY"
            />
          </Box>
          <Box className='my-3 w-box'>
            {/* <p className='form-control'>{userData?.gender}</p> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t('accountInfo.gioitinh')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="gender-select"
                value={gender}
                label="ngày sinh"
                onChange={handleGenderChange}
              >
                <MenuItem value={true}>{t('accountInfo.gioitinhnam')}</MenuItem>
                <MenuItem value={false}>{t('accountInfo.gioitinhnu')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className='my-3 t-box'>
            <TextField
              input="text"
              InputLabelProps={{ shrink: true, inputMode: 'numeric', pattern: '[0-9]*' }}
              required
              hiddenLabel
              id="standard-basic"
              label={t('accountInfo.tienhangthang')}
              variant="outlined"
              fullWidth
              value={money}
              onChange={handleMoneyChange}
              helperText={money ? "" : t('accountInfo.thieusotienhangthang')}
              error={money ? false : true}
            />
          </Box>
        </Box>
      </Box>
      {/* Button */}
      <Box className='d-flex justify-content-center mb-4'>
        <button className='button-logout' onClick={handleUpdate}>{t('accountInfo.luu')}</button>
      </Box>
      <hr />
      <h3 className='my-2'>{t('accountInfo.xuatcsv')}:</h3>
      <Box className="mx-3 text-center">
        <Button variant="contained">{t('accountInfo.xuatcsv')}</Button>
      </Box>
      <hr />
      <h3 className='my-2'>{t('accountInfo.ngonngu')}:</h3>
      <Box className="mx-3 text-center">
        <FormControl>
          <InputLabel id="language-label" sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>{t('accountInfo.ngonngu')}</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            // value={language}
            value={localStorage.getItem("i18nextLng")}
            label="Ngôn ngữ."
            onChange={handleLanguageChange}
          >
            <MenuItem value="vi" className='languageV'>{t('accountInfo.ngonnguviet')}</MenuItem>
            <MenuItem value="en" className='languageE'>{t('accountInfo.ngonnguanh')}</MenuItem>
           
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default AccountInfor;
