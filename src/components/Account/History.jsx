import React from 'react'

import { db , storage, auth, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { getStorage, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';

const History = () => {
    const user = auth.currentUser;
    const getAllSpending = async () => {
        const docRef = collection(db, SPEND_COLLECTION);
        const q = query(docRef, where("uuid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        }
        );
    }
    return (
        <div>
            <button onClick={getAllSpending}>button</button>
        </div>
    )
}

export default History