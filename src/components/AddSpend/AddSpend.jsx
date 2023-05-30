import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openadd, closeadd } from "../../features/spend/spendSlice";
import { format } from "date-fns";
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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  auth,
  db,
  storage,
  SPEND_COLLECTION,
  DATA_COLLECTION,
  avatarImg,
} from "../../features/firebase/firebase";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ImageUploading from "react-images-uploading";
import CurrencyInput from "react-currency-input-field";

import "./AddSpend.css";
import { options } from "./data";
import ManageFriend from "./friend";

function AddSpend() {
  const dispatch = useDispatch();
  const openState = useSelector((state) => state.spend.isOpen);
  const [open, setOpen] = useState(false);
  const [spend, setSpend] = useState({ title: "", amount: 0 });
  const uuid = useSelector((state) => state.login.user);

  let [money, setMoney] = useState(null);
  const [moneyError, setMoneyError] = useState(false);
  // const [date, setDate] = useState(dayjs('2022-04-17T15:30'));
  const now = dayjs();
  const [date, setDate] = useState(now);
  // const [time, setTime] = useState(dayjs('2022-04-17T15:30'));
  const [location, setLocation] = useState("");
  const [myfriend, setMyfriend] = useState("");
  const [friends, setFriends] = useState([]);
  const [type, setType] = useState(1);
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const user = auth.currentUser;
  const [scroll, setScroll] = useState("body");

  function handleOpen() {
    dispatch(openadd());
    setOpen(true);
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setFile(imageList);
  };

  function handleClose(event, reason) {
    if (reason && reason == "backdropClick") return;
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

  function handleChangeNote(event) {
    setNote(event.target.value);
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

  async function handleSpendSubmit(event) {
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
      imageRef = ref(storage, `spending-web/${file.name + v4()}`);
      const result2 = await uploadBytes(imageRef, file).then(async () => {
        if (imageRef !== null) {
          url = await getDownloadURL(imageRef);
        }
      });
    }
    if (type < 20) {
      money = -Math.abs(money);
    } else {
      money = Math.abs(money);
    }

    try {
      console.log(
        "submit",
        money,
        datetime,
        location,
        friends,
        type,
        note,
        uuid,
        url
      );
      const result = await addDoc(collection(db, SPEND_COLLECTION), {
        money,
        date: datetime,
        location,
        friends: friends,
        type,
        note,
        uuid,
        image: url,
      }).then(async () => {
        alert("Thêm chi tiêu thành công");
        const docRef = collection(db, DATA_COLLECTION);
        const q = query(docRef, where(documentId(), "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((value) => {
          var dataSpending = [];
          if (value.exists) {
            const data = value.data();
            const formattedDate = format(spending.dateTime, "MM_yyyy");
            if (data[formattedDate] !== null) {
              dataSpending = data[formattedDate]
                .map((e) => e.toString())
                .concat([firestoreSpending.id]);
              firestoreData.update({
                [formattedDate]: dataSpending,
              });
            } else {
              dataSpending.push(firestoreSpending.id);
              data[formattedDate] = dataSpending;
              firestoreData.set(data);
            }
          } else {
            dataSpending.push(firestoreSpending.id);
            firestoreData.set({
              [format(spending.dateTime, "MM_yyyy")]: dataSpending,
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
    // Close the dialog
    handleClose();
  }

  return (
    <>
      <Dialog
        open={openState}
        onClose={handleClose}
        scroll="paper"
        maxWidth="sm"
        fullWidth
        sx={{ maxHeight: "calc(100vh - 64px)" }}
      >
        <DialogTitle>
          Thêm chi tiêu
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Money */}
            <label htmlFor="">Nhập số tiền:</label>
            <CurrencyInput
              id="input-example"
              name="input-name"
              placeholder="100.000VND"
              value={money}
              decimalsLimit={2}
              onValueChange={(value) => setMoney(Number(value))}
              intlConfig={{ locale: "vi-VN", currency: "VND" }}
              className="currency-input"
              style={{ maxWidth: "300px" }}
            />
            {moneyError && (
              <p style={{ color: "red" }}>Vui lòng nhập số tiền</p>
            )}
            {/* Type */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Loại
              </InputLabel>
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
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                setDate(newValue);
              }}
              slotProps={{ textField: { variant: "outlined" } }}
              sx={{ m: 1, minWidth: 120 }}
            />
            {/* Time */}
            <TimePicker
              label="Thời gian"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              slotProps={{ textField: { variant: "outlined" } }}
              sx={{ m: 1, minWidth: 120 }}
            />
            <Box sx={{ display: "flex", flex: 1 }}>
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
            </Box>
            {/* My friend */}
            <Box>
              <ManageFriend data={friends} setData={setFriends} />
            </Box>
            {/* <TextField
                id="outlined-friend"
                label="Bạn bè"
                rows={4}
                value={myfriend}
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                onChange={handleChangeMyFriend}
                /> */}
            {/* Image */}
            <div className="Image-upload mt-1">
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
                      sx={{
                        fontFamily: "Montserrat",
                        m: 1,
                        minWidth: 120,
                        fontWeight: "bold",
                      }}
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Thêm ảnh
                    </Button>
                    &nbsp;
                    <Button
                      onClick={onImageRemoveAll}
                      sx={{
                        fontFamily: "Montserrat",
                        m: 1,
                        minWidth: 120,
                        fontWeight: "bold",
                      }}
                    >
                      Xoá ảnh
                    </Button>
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image["data_url"]} alt="" width="100" />
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
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={handleClose}
            sx={{ fontFamily: "Montserrat", minWidth: 120, fontWeight: "bold" }}
            variant="contained"
            color="error"
          >
            Thoát
          </Button>
          <Button
            variant="contained"
            sx={{ fontFamily: "Montserrat", minWidth: 120, fontWeight: "bold" }}
            onClick={handleSpendSubmit}
            color="primary"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSpend;
