import React from 'react'

import { db , storage, auth, DATA_COLLECTION } from '../../features/firebase/firebase'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { getStorage, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';

const History = () => {
    const user = auth.currentUser;
    const h = async () => {
        const docRef = collection(db, "spending");
        const q = query(docRef, where("uuid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        }
        );
    }
    return (
        <div>
            <button onClick={h}>button</button>
        </div>
    )
}

export default History