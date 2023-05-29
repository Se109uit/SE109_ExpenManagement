import React, { useState, useEffect } from 'react';

import { db , storage, auth, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { getStorage, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';

export const SpendingHistory = () => {
  const [spendingData, setSpendingData] = useState([]);
  const _user = useSelector((state) => state.login.user);

  const user = auth.currentUser;
//   const useruid = user.uid;
  const getAllSpending = async () => {
      const docRef = collection(db, SPEND_COLLECTION);
      const q = query(docRef, where("uuid", "==", _user));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const data = doc.data();
          console.log("data", data);
          setSpendingData(data);
      }
      );
  }

  useEffect(() => {
    getAllSpending();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>test</th>
        </tr>
      </thead>
      <tbody>
      {Object.values(spendingData).map((spending) => (
        console.log("spending", spending)
        //   <tr key={spending.uid}>
        //     <td>{spending.date}</td>
        //     <td>{spending.money}</td>
        //     <td>{spending.type}</td>
        //   </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SpendingHistory;