import React, { useState } from 'react';

import { TextField, Button, IconButton } from '@mui/material';

function Friend(props) {
//   const [data, setData] = useState(props.data);
  const [inputValue, setInputValue] = useState('');
  const [error , setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddData = () => {
    if (!inputValue) {
        setError('Bạn chưa nhập tên bạn bè');
        return;
    }
    setError('');
    props.setData([...props.data, inputValue]);
    setInputValue('');
  };

  const handleDeleteData = (index) => {
    const newData = [...props.data];
    newData.splice(index, 1);
    props.setData(newData);
  };

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* <input type="text" value={inputValue} onChange={handleInputChange} /> */}
        <TextField
        id="outlined-friend"
        label="Bạn bè"
        rows={4}
        value={inputValue}
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
        onChange={handleInputChange}
        />
        <Button
        onClick={handleAddData}
        variant="contained"
        sx={{ minWidth: 40, maxHeight: 40, marginTop: 2 }}
        >
            Thêm bạn
        </Button>
      {/* <button onClick={handleAddData}>Add Data</button> */}
    </div>
        {/* error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {props.data.map((item, index) => (
          <li key={index}>
            {item}
            <Button 
            onClick={() => handleDeleteData(index)}
            variant="contained"
            color='error'
            >Xóa</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friend;