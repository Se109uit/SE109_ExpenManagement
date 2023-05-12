import React, {useState, useEffect} from 'react'
  import {Form, FormGroup} from 'reactstrap'
  import Select from 'react-select'
  import './addSpending.css'
  
  import { options, friend } from './data'
  import { db , storage } from '../../features/firebase/firebase'
  import { collection, addDoc } from 'firebase/firestore'
  
  import { getStorage, ref, uploadBytes} from 'firebase/storage'
  import { v4 } from 'uuid'

  import money from '../../assets/money.png'
  import Type from '../../assets/Type.png'
  import Date from '../../assets/Date.png'
  import Location from '../../assets/Location.png'
  import Time from '../../assets/Time.png'
  import Friend from '../../assets/Friend.png'

  
  
  const AddSpending = () => {
    // const [selectedOption, setSelectedOption] = useState(null);
  
    const [many, setMany] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [myfriend, setMyfriend] = useState("");
    const [type, setType] = useState("");
    const [note, setNote] = useState("");
  
  
    const [file, setFile] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        if (many !== "" && date !== "" && time !== "" && type !== "") {
          await addDoc(collection(db, "spending-web"), {
           many,
           date,
           time,
           location,
           myfriend,
           type,
           note,
          });
          setMany("");
          setDate("")
          setTime("")
          setLocation("")
          setMyfriend(""),
          setType(""),
          setNote("")
          const imageRef = ref(storage, `spending-web/${file.name + v4()}`)
          uploadBytes(imageRef, file).then(() => {
            alert("Thêm chi tiêu thành công")
          })
        }
        else{
          alert('Nhập đầy đủ những thông tin cần thiết')
        }
      }catch(err){
        console.log(err)
      }
      
    };
    
    return (
      <div className='AddSpending'>
      <h2>Thêm chi tiêu</h2>
        <div className='header d-flex justify-content-center w-100'>
        <Form onSubmit={handleSubmit}>
          <div className='many-type'>
            <FormGroup className='many'>
              <li>
                <div>
                  <p><span><img src={money}/></span>Nhập số tiền:</p>
                </div>
                <input type="text" id="typeText" class="form-control" placeholder='100.000' value={many}
                  onChange={(e) => setMany(e.target.value)}
                />
              </li>
            </FormGroup>
            <FormGroup className='type'>
              <li>
              <p><span><img src={Type}/></span>Loại:</p>
              <Select className='w-50'
                placeholder='lựa chọn'
                onChange={setType}
                options={options}
                />
            </li>
            </FormGroup> 
          </div>
         
  
          <div className='day_time'>
            <FormGroup className='day'>
              <li><p><span><img src={Date}/></span>Ngày:</p> <input type="date" id="typeText" class="form-control" value={date}
              onChange={(e) => setDate(e.target.value)}
              /></li>
            </FormGroup>
  
            <FormGroup className='time'>
              <li class=''>
                <p><span><img src={Time}/></span>Thời gian:</p> 
                <input type="time" id="typeText" class="form-control" value={time}
                onChange={(e) => setTime(e.target.value)}
                /></li>
            </FormGroup>
  
            <FormGroup className='location'>
              <li ><p><span><img src={Location}/></span>Địa chỉ:</p> <input type="text" id="typeText" class="form-control" placeholder='Số nhà, quận.......' value={location}
              onChange={(e) => setLocation(e.target.value)}
              /></li>
            </FormGroup>
          </div>
  
          <div className='friend'>
            <li><p><span><img src={Friend}/></span>Bạn bè:</p> 
            <Select className='w-50' 
                placeholder='Tên'
                onChange={setMyfriend}
                options={friend}
                /></li>
  
            <li><p className='image'>Ảnh:</p> 
            <div class="input-group mb-3">
              <div class="custom-file">
                <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02"></label>
                <input type="file" class="custom-file-input" id="file"
                onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            </li>
          </div>
  
          
  
          <div className='note'>
            <textarea class="form-control" id="textAreaExample" rows="6" placeholder='Ghi chú' value={note}
            onChange={(e) => setNote(e.target.value)}></textarea>
          </div>
          <button class="btn btn-primary">Thêm chi tiêu</button>
        </Form>
        </div>
      </div>
    )
  }
  export default AddSpending
