import React, {useState, useEffect} from 'react'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import { db , storage, auth, DATA_COLLECTION, SPEND_COLLECTION } from '../../features/firebase/firebase'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, query, where, Timestamp } from 'firebase/firestore'
import { getStorage, ref, uploadBytes} from 'firebase/storage'
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid'

import SpendingData from '../SpendingData/SpendingData'
import './HomePage.css'
import { options } from '../../utils/data';
import { set } from 'date-fns';
import { ca } from 'date-fns/locale';

const Home = () => {
  const { t } = useTranslation()
  const [date, setDate] = useState(new Date());
  const [spendingData, setSpendingData] = useState([]);
  const [deleteSpending, setDeleteSpending] = useState(false);
  const _user = useSelector((state) => state.login.user);
  const _addSpending = useSelector((state) => state.spend.isOpen);
  const _editSpending = useSelector((state) => state.change.isChange);
  const timestamp = Timestamp.fromDate(date);

  const [income, setIncome] = useState(0);
  const [spend, setSpend] = useState(0);

  let add = 0;
  let del = 0;
  let addMonth = 0;
  let delMonth = 0;

  const [incomeMonth, setIncomeMonth] = useState(0);
  const [spendMonth, setSpendMonth] = useState(0);

  const getAllSpending = async () => {
    const docRef = collection(db, SPEND_COLLECTION);
    const q = query(docRef, where("uuid", "==", _user));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        data.push({ id: doc.id, ...doc.data() });
    });
    caculateIncomeMonth(data);
    // setSpendingData(data);
    return data;
  }

  const resetSpending = () => {
    setSpendingData([]);
  }

  const caculateIncome = (spendingData) => {
    add = 0;
    del = 0;
    spendingData.forEach((spending) => {
      if (spending.type > 20) {
        add += spending.money;
      } else {
        del += spending.money;
      }
    });
    setIncome(add);
    setSpend(del);
  }

  const caculateIncomeMonth = (spendingData) => {
    // addMonth = 0;
    // delMonth = 0;
    spendingData.forEach((spending) => {
      if (spending.date.toDate().getMonth() === date.getMonth()) {
        if (spending.type > 20) {
          addMonth += spending.money;
        } else {
          delMonth += spending.money;
        }
      }
      setIncomeMonth(addMonth);
      setSpendMonth(delMonth);
    });
  }

useEffect(() => {
  resetSpending();
  getAllSpending().then((data) => {
    const filteredData = data.filter((spending) => {
      return spending.date.toDate().toLocaleDateString() === date.toLocaleDateString();
    });
    setSpendingData(filteredData);
    caculateIncome(filteredData);
  });

}, [_addSpending, _editSpending, deleteSpending, date]);

  return (
    <div className='mt-4'>
      {/* top */}
      <h3 className='my-2 pb-3'>Trang chủ</h3>
      <div className='spending d-flex justify-content-between' style={{ width: '95%' }}>
        {/* Spending infor */}
        <div className='spending-infor' style={{ paddingLeft: '1rem', width: '50%' }}>
          <div className="card" style={{ paddingRight: '1rem'}}>
            <div className="card-body">
              <h4 className="card-title mb-2 px-4">Chi tiêu tháng</h4>
              <div className='card-div'>
                <h5 className="card-title pt-2">Thu nhập: </h5>
                <p className="card-text income">{incomeMonth}</p>
              </div>
              <div className='card-div'>
                <h5 className="card-title pt-2">Chi tiêu: </h5>
                <p className="card-text income">{spendMonth}</p>
              </div>
              <div className='card-div'>
                <h5 className="card-title pt-2">Tổng tiền: </h5>
                <p className="card-text income" style={{fontWeight: 700}}>{incomeMonth + spendMonth}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className='calend'>
          <Calendar value={date} onChange={setDate}></Calendar>
        </div>
      </div>

      <div className='spending-infor mt-2' style={{ paddingLeft: '1rem' }}>
          <div className="card" style={{ width: '90%', background: '#73C6B6' }}>
            <div className="card-body d-flex justify-content-between">
              <h4 className="card-infor mb-2 px-4">Chi tiêu ngày</h4>
                <p className="card-text income">Thu nhập: </p>
                <p className="card-text income">{income}</p>
                <p className="card-text income">Chi tiêu: </p>
                <p className="card-text income">{spend}</p>
                <p className="card-text income">Tổng tiền: </p>
                <p className="card-text income" style={{fontWeight: 700, paddingRight: 20}}>{income + spend}</p>
            </div>
          </div>
        </div>

        { spendingData.length === 0 ?
        
        <div className='mt-2' style={{ width: '90%'}}>
          <h5 className='text-center'>Ngày này không có dữ liệu</h5>
        </div>

        :

      <div className='mt-2'>
          {Object.entries(spendingData).map(([date, spending]) => (
            <div key={date}>
                <SpendingData key={spending.id} spending={spending} setDeleteSpending={setDeleteSpending}/>
            </div>
          ))}
      </div>

          }
      
    </div>
  )
}
export default Home