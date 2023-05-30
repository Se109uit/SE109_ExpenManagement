import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openadd, closeadd } from '../../features/spend/spendSlice';
import { collection, doc, getDoc, updateDoc, setDoc, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { auth, db, storage, SPEND_COLLECTION, DATA_COLLECTION, avatarImg } from '../../features/firebase/firebase';

import { Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, TextField, 
    FormControl, Select, MenuItem, InputLabel, Box  } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, TimePicker, DateTimePicker  } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ImageUploading from 'react-images-uploading';
import CurrencyInput from 'react-currency-input-field';

import './AddSpendB.css';
import {options} from './data'
import ManageFriend from './friend';

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
      console.log("submit", money, datetime, location, friends, type, note, uuid, url);
      const result = await addDoc(collection(db, SPEND_COLLECTION), {
        money,
        date: datetime,
        location,
        friends: friends,
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
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
</div>
  );
}

export default AddSpend;