import React, {useState} from 'react'
import {Form, FormGroup} from 'reactstrap'
import Select from 'react-select'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
import './addSpending.css'
// import {options} from './Icon.js'

import coins from '../../assets/coins.png'
import many from '../../assets/Tiền.png'
import time from '../../assets/Thời gian.png'
import images from '../../assets/Ảnh.png'

const options = [
  { value: 'Gia dinh', label: 'Gia đình' },
  { value: 'Hen ho', label: 'Hẹn hò' },
  { value: 'Dien nuoc', label: 'Điện nước' },
  { value: 'Thuoc - Y te', label: 'Thuốc - Y tế' },
  { value: 'An uong', label: 'Ăn uống' },
  { value: 'Taxi', label: 'Taxi' },
  { value: 'Thu cung', label: 'Thú cưng' },
  { value: 'Tro choi dien tu', label: 'Trò chơi điện tử' },
  { value: 'Dien thoai', label: 'Điện thoại' },
  { value: 'The thao', label: 'Thể thao' },
];

const friend = [
  { value: 'Nguyen Nhu Tu', label: 'Nguyễn Như Từ' },
  { value: 'Nguyen Thanh Sang', label: 'Nguyễn Thanh Sang' },
  { value: 'Le Khoa', label: 'Lê Khoa' },
  { value: 'Nguyen Duong Trung Hieu', label: 'Nguyễn Dương Trung Hiếu' },
];


const AddSpending = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState('10:00');

  //  const onChange = (timeValue) => {
  //     setValue(timeValue);
  //  }
  return (
    <div className='AddSpending'>
    <h2>Thêm chi tiêu</h2>
      <div className='header d-flex justify-content-center w-100'>
      <Form>
        <div className='many-type'>
          <FormGroup className='many'>
            <li>
              <p>Nhập số tiền:</p>
              <input type="text" id="typeText" class="form-control" placeholder='100.000' />
            </li>
          </FormGroup>
          <FormGroup className='type'>
            <li><p>Loại:</p>
            <Select className='w-50'
              placeholder='lựa chọn'
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              />
          </li>
          </FormGroup>
        </div>
       

        <div className='day_time'>
          <FormGroup className='day'>
            <li><p>Ngày:</p> <input type="date" id="typeText" class="form-control" /></li>
          </FormGroup>

          <FormGroup className='time'>
            <li class=''>
              <p>Thời gian:</p> 
              <input type="time" id="typeText" class="form-control" /></li>
          </FormGroup>

          <FormGroup className='location'>
            <li ><p>Địa chỉ:</p> <input type="text" id="typeText" class="form-control" placeholder='Số nhà, quận.......'/></li>
          </FormGroup>
        </div>

        <div className='friend'>
          <li><p>Bạn bè:</p> <Select className='w-50' 
              placeholder='Tên'
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={friend}
              /></li>

          <li ><p className='image'>Ảnh:</p> 
          <div class="input-group mb-3">
            <div class="custom-file">
              <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02"></label>
              <input type="file" class="custom-file-input" id="inputGroupFile02"/>
            </div>
          </div>
          </li>
        </div>

        

        <div className='note'>
          {/* <input type='form-control' placeholder='Ghi chú'/>*/}
          <textarea class="form-control" id="textAreaExample" rows="6" placeholder='Ghi chú'></textarea>
        </div>
        <button type="button" class="btn btn-primary">Thêm chi tiêu</button>
      </Form>
      </div>
    </div>
  )
}
export default AddSpending
