import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openadd, closeadd } from '../../features/spend/spendSlice';
import { collection, doc, getDoc, updateDoc, setDoc, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { auth, db, storage, SPEND_COLLECTION, DATA_COLLECTION, avatarImg } from '../../features/firebase/firebase';

import { Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, TextField, 
    FormControl, Select, MenuItem, InputLabel  } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, TimePicker, DateTimePicker  } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ImageUploading from 'react-images-uploading';
import CurrencyInput from 'react-currency-input-field';

import './AddSpend.css';
import {options} from './data'



function AddSpend() {
    const dispatch = useDispatch();
    const openState = useSelector((state) => state.spend.isOpen);
    const [open, setOpen] = useState(false);
    const [spend, setSpend] = useState({ title: '', amount: 0 });
    const uuid = useSelector(state => state.login.user);

    const [money, setMoney] = useState(null);
    const [moneyError, setMoneyError] = useState(false);
    const [date, setDate] = useState(dayjs('2022-04-17T15:30'));
    // const [time, setTime] = useState(dayjs('2022-04-17T15:30'));
    const [location, setLocation] = useState("");
    const [myfriend, setMyfriend] = useState("");
    const [friends, setFriends] = useState([]);
    const [type, setType] = useState(1);
    const [note, setNote] = useState("");
    const [file, setFile] = useState(null);

  function handleOpen() {
    dispatch(openadd());
    setOpen(true);
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setFile(imageList);
  };

  function handleClose(event, reason) {
    if (reason && reason == "backdropClick") 
        return;
    dispatch(closeadd());
    setOpen(false);
  }

  // handle change

  function handleChangeMoney(event) {
    setMoney(event.target.value);
  }

  function handleChangeLocation(event) {
    setLocation(event.target.value);
  }

  function handleChangeNote (event) {
    setNote (event.target.value);
  }

  function handleChangeType(event) {
    setType(event.target.value);
  }

  function handleChangeMyFriend(event) {
    setMyfriend(event.target.value);
  }

  function handleChangeDate(value) {
    setDate(value);
  }

  async function handleSpendSubmit (event) {
    event.preventDefault();
    // Checking
    if (money === null) {
      setMoneyError(true);
      return;
    }
    // Add spending to Firebase
    let imageRef = null;
    let url = null;
    const datetime = dayjs(date).toDate();
    if (file !== null) {
      imageRef = ref(storage, `spending-web/${file.name + v4()}`)
      const result2 = await uploadBytes(imageRef, file).then(async () => {
        if (imageRef !== null) {
          url = await getDownloadURL(imageRef);
        }
      })
    }
    try {
      console.log("submit", money, datetime, location, myfriend, type, note, uuid, url);
      const result = await addDoc(collection(db, "spending-web"), {
        money,
        datetime,
        location,
        friends: myfriend,
        type,
        note,
        uuid,
        image: url,
      }).then(() => {
        alert("Thêm chi tiêu thành công")
      })
  } catch (error) {
    console.log(error);
  }
    // Close the dialog
    handleClose();
  }

  return (
    <>
      <Dialog open={openState} onClose={handleClose}>
        <DialogTitle>Thêm chi tiêu</DialogTitle>
        <DialogContent sx={{ marginBottom: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Money */}
                <label htmlFor="">Nhập số tiền:</label>
                <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="100.000VND"
                value={money}
                decimalsLimit={2}
                onValueChange={(value) => setMoney(value)}
                intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                className='currency-input'
                />
                {moneyError && <p style={{ color: 'red' }}>Vui lòng nhập số tiền</p>}
                {/* Type */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Loại</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={handleChangeType}
                    label="Loại"
                    required
                >
                    {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                {/* Date */}
                <DatePicker
                label="Ngày"
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
                slotProps={{ textField: { variant: 'outlined' }} }
                sx={{ m: 1, minWidth: 120 }}
                />
                {/* Time */}
                <TimePicker
                label="Thời gian"   
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
                slotProps={{ textField: { variant: 'outlined' }} }
                sx={{ m: 1, minWidth: 120 }}
                />
                {/* Note */}
                <TextField
                id="outlined-multiline-static"
                label="Ghi chú"
                rows={4}
                value={note}
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                onChange={handleChangeNote} 
                />
                {/* Location */}
                <TextField
                id="outlined-location"
                label="Vị trí"
                rows={4}
                value={location}
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                onChange={handleChangeLocation}
                />
                {/* My friend */}
                <Box>
                  
                </Box>
                <TextField
                id="outlined-friend"
                label="Bạn bè"
                rows={4}
                value={myfriend}
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                onChange={handleChangeMyFriend}
                />
                {/* Image */}
                <div className="Image-upload mt-2">
                  <ImageUploading
                    multiple
                    value={file}
                    onChange={onChangeImage}
                    maxNumber={1}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <Button
                         sx={{ fontFamily: 'Montserrat', m: 1, minWidth: 120, fontWeight: 'bold' }}
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Thêm ảnh
                        </Button>
                        &nbsp;
                        <Button 
                        onClick={onImageRemoveAll} 
                        sx={{ fontFamily: 'Montserrat', m: 1, minWidth: 120, fontWeight: 'bold' }}
                        >Xoá ảnh</Button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              {/* <button onClick={() => onImageUpdate(index)}>Update</button>
                              <button onClick={() => onImageRemove(index)}>Remove</button> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </div>
            </div>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
          onClick={handleClose} 
          sx = {{ fontFamily: 'Montserrat', m: 1, minWidth: 120, fontWeight: 'bold' }}
          variant="contained"
          color="error"
          >Thoát</Button>
          <Button 
          variant="contained"
          sx = {{ fontFamily: 'Montserrat', m: 1, minWidth: 120, fontWeight: 'bold' }}
          onClick={handleSpendSubmit} 
          color="primary"
          >Lưu</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSpend;