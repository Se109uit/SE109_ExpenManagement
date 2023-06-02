import React, { useEffect, useState } from 'react';
import { doc, updateDoc, deleteDoc, arrayRemove } from "firebase/firestore";
import { db, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase';

import { useDispatch } from 'react-redux';
import { closeadd } from '../../features/spend/spendSlice';
import { openchange } from '../../features/change/changeSlice';

import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import { use } from 'i18next';

import type from '../../assets/Type.png'
import time from '../../assets/Time.png'
import note from '../../assets/Note.png'
import friend from '../../assets/Friend.png'
import location from '../../assets/Location.png'
import Delete from '../../assets/Delete.png'
import edit from '../../assets/Edit.png'

import { format } from 'date-fns';

import { BasicModal } from '../Notification/Notification';

import { options } from '../../utils/data';

import { useTranslation } from 'react-i18next';

import './spendingData.css'
import { LogoDev } from '@mui/icons-material';

const SpendingData = ({ spending, setDeleteSpending }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  
  const typeOption = options.find(option => option.value === spending.type);

    // Modal
    const [openM, setOpenM] = useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    
    const [isOk, setIsOk] = useState(false);
    //

  const handleChangeSpending = () => {
    dispatch(openchange(spending.id));
  };

  const handleDelete = () => {
    handleOpenM();
  };

  const timeDel = format(spending.date.toDate(), "MM_yyyy");

  const handleConfirm = async () => {
    await deleteDoc(doc(db, SPEND_COLLECTION, spending.id)).then(async () => {
      await updateDoc(doc(db, DATA_COLLECTION, spending.uuid), {
        [timeDel]: arrayRemove(spending.id),
    });
    setDeleteSpending(spending.id);
    handleCloseM();
    });
  };

  return (
    <div className='pl-3 mb-1' style={{ paddingLeft: '1rem' }} key={spending.id}>
      <div className='spending-history d-flex flex-row justify-content-between'>
        <div className='money-type d-flex flex-column'>
          <div className='d-flex flex-row'>
            <p className='money fs-5 fw-bold'>{spending.money} VND</p>
            <div className='infor d-flex flex-column'>
              <div className='type-time d-flex flex-row'>
                <img className='image-s' src={type}/>
                <p className='type fs-6 fw-bold'>{t('editSpending.loai')}:<span>{typeOption ? typeOption.label : spending.type}</span></p>
                <img className='image-s' src={time}/>
                <p className='fs-6 fw-bold'>{t('editSpending.thoigian')}:<span>{spending.date.toDate().toLocaleTimeString()}</span></p>
              </div>
              <div className='d-flex flex-row'>
                <img className='image-s' src={location}/>
                <p className='location fs-6 fw-bold'>{t('editSpending.diachi')}: <span>{spending.location}</span></p>
              </div>
            </div>
          </div>  
          <hr/>
          <div className='note d-flex flex-column'>
            <p className='friend fs-6 fw-bold d-flex flex-row'><img className='image-s' src={friend}/>{t('editSpending.banbe')}: <span>{spending.friends.join(', ')}</span></p>
            <p className='fs-6 fw-bold d-flex flex-row'><img className='image-s' src={note}/>{t('editSpending.ghichu')}: <span>{spending.note}</span></p>
            
          </div>
        </div>
        <div className='dele-set d-flex flex-column'>
          <btn className='btn' >
            <img className='image-set' src={Delete} onClick={handleDelete}/>
          </btn>
          <btn className='btn'>
            <img className='image-set' src={edit} onClick={handleChangeSpending}/>
          </btn>
        </div>
      </div>
      {
          openM &&
          <BasicModal 
          open={openM} 
          handleOpen={handleOpenM} 
          handleClose={handleCloseM} 
          handleConfirm={handleConfirm}
          title={t('editSpending.xoachitieu')}
          textBtnOut={t('editSpending.huy')}
          textBtnOk={t('editSpending.xoa')}
          text={t('editSpending.bancochacmuonxoa')}
          />
      }
    </div>
  );
};

export default SpendingData;

