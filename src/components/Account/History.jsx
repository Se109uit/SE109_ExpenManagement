import React, { useState, useEffect } from 'react';

import { db , storage, auth, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { getStorage, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';

import SpendingData from '../SpendingData/SpendingData'

const History = () => {
    const [spendingData, setSpendingData] = useState([]);
    const _user = useSelector((state) => state.login.user);

    const user = auth.currentUser;
    //   const useruid = user.uid;
    const getAllSpending = async () => {
        const docRef = collection(db, SPEND_COLLECTION);
        const q = query(docRef, where("uuid", "==", _user));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
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
    }, []);

    return (
        <div className='mt-4'>
            <div className='row justify-content-center'>
                <h3 className='my-2'>Lịch sử</h3>
                <div>
                    {Object.entries(spendingData).map(([date, spendings]) => (
                      <div key={date}>
                        <h4>{date}</h4>
                        {Array.isArray(spendings) && spendings.map((spending) => (
                          <SpendingData key={spending.uid} spending={spending} />
                        ))}
                      </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default History;