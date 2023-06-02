import React, { useState } from 'react';

import { TextField, Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './AddSpend.css'
import Delete from '../../assets/Delete.png'
import Remove from '../../assets/Remove.png'

function Friend(props) {
  const { t } = useTranslation();
//   const [data, setData] = useState(props.data);
  const [inputValue, setInputValue] = useState('');
  const [error , setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddData = () => {
    if (!inputValue) {
        setError(t('editSpending.banchuanhaptenbanbe'));
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
        className='text-friend'
        id="outlined-friend"
        label={t('editSpending.banbe')}
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
            {t('editSpending.themban')}
        </Button>
      {/* <button onClick={handleAddData}>Add Data</button> */}
    </div>
        {/* error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className='list-friend'>
        {props.data.map((item, index) => (
          <li key={index} className='d-flex flex-row'>
            <p className='nameFriend fs-6 fw-bold'>{item}</p>

            <button className='btn-deleteFriend'
            onClick={() => handleDeleteData(index)}
            ><img className='imageDelete' src={Remove}/></button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friend;