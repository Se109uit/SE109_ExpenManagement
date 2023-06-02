import React, { useState, useEffect } from 'react';

import { db , storage, auth, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { getStorage, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';

import SpendingData from '../SpendingData/SpendingData'

import { useTranslation } from 'react-i18next';

import './History.css'


const History = () => {
  const { t } = useTranslation()
    const [spendingData, setSpendingData] = useState([]);
    const [deleteSpending, setDeleteSpending] = useState(false);
    const _user = useSelector((state) => state.login.user);
    const _addSpending = useSelector((state) => state.spend.isOpen);

    const user = auth.currentUser;
    //   const useruid = user.uid;
    const getAllSpending = async () => {
        const docRef = collection(db, SPEND_COLLECTION);
        const q = query(docRef, where("uuid", "==", _user));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push({ id: doc.id, ...doc.data() });
        });
        data.sort((a, b) => b.date.toDate() - a.date.toDate()); // Sort by date
        const groupedData = data.reduce((acc, spending) => {
          const date = spending.date.toDate().toLocaleDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(spending);
          return acc;
        }, {});
        setSpendingData(groupedData);
    }

    useEffect(() => {
        getAllSpending();
    }, [_addSpending, deleteSpending]);

    return (
        <div className='history'>
            <div className='row justify-content-center'>
                <p className='title fs-2 fw-bold'>{t('editSpending.lichsu')}</p>
                <div className='mt-2'>
                    {Object.entries(spendingData).map(([date, spendings]) => (
                      <div key={date}>
                        <h4 className='pl-1 text-danger mt-1' style={{ paddingLeft: '1rem' }}>{t('editSpending.ngay')}: {date}</h4>
                        {Array.isArray(spendings) && spendings.map((spending) => (
                          <SpendingData key={spending.id} spending={spending} setDeleteSpending={setDeleteSpending}/>
                        ))}
                      </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default History;