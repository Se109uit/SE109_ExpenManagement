import React, { useEffect } from 'react';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase';

import { useDispatch } from 'react-redux';
import { closeadd } from '../../features/spend/spendSlice';
import { openchange } from '../../features/change/changeSlice';

import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import { use } from 'i18next';

import { options } from '../../utils/data';

const SpendingData = ({ spending, setDeleteSpending }) => {
  const dispatch = useDispatch();
  const typeOption = options.find(option => option.value === spending.type.toString());
  let sharing = false;

  const handleShare = async () => {
    window.alert('tinh nang dang hoan thien')
  };

  const handleChangeSpending = () => {
    dispatch(openchange(spending.id));
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this spending?');
    if (confirmed) {
      await deleteDoc(doc(db, SPEND_COLLECTION, spending.id));
      setDeleteSpending(spending.id);
    }
  };

  return (
    <div className='pl-3 mb-1' style={{ paddingLeft: '1rem' }} key={spending.id}>
      <div className="card" style={{ width: '90%' }}>
        <div className="card-body">
          <div className="card-text" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="card-text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                {spending.money} VND
              </span>
              <span style={{ fontSize: '1.1rem' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Time: </span> {spending.date.toDate().toLocaleTimeString()}
              </span>
              <span style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
                {/* <IconButton aria-label="share" color="primary" onClick={handleShare}>
                  <ShareIcon/>
                </IconButton> */}
                <IconButton aria-label="change" onClick={handleChangeSpending}>
                  <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </p>
            <hr />
            <span style={{ display: 'flex', justifyContent: 'space-between', marginRight: 100 }}>
              <span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Location: </span> 
                {spending.location}
                </span>
              <span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Friends: </span>
                {spending.friends.join(', ')}
                </span>
              <span>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Type: </span>
               {typeOption ? typeOption.label : spending.type}
               </span>
            </span>
              <span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Note: </span> 
                {spending.note}
                </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingData;

