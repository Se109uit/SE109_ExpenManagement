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
import './home.css'
import { options } from '../../utils/data';
import { set } from 'date-fns';
import { ca } from 'date-fns/locale';

import incomE from '../../assets/Income.png'
import total from '../../assets/Total.png'
import expend from '../../assets/Expend.png'

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

    <div className='Home'>
      {/* top */}
      <div className='spending d-flex'>
        {/* Spending infor */}
        <div className='spending-infor'>
          <div className="info">
            <div className="spending-monthly">
              <p className="fs-2 fw-bold">{t('home.chitieuthang')}:</p>
              <div className='income-home d-flex flex-row justify-content-between'>
                <div className='d-flex  flex-row'>
                  <img className='image-infor' src={incomE}/>
                  <p className="title fs-4 fw-bold">{t('home.thunhap')}: </p>
                </div>
                <p className="value fs-4 fw-normal">{incomeMonth} VND</p>
              </div>
              <div className='expend-home d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row'>
                  <img className='image-infor' src={expend}/>
                  <p className="title fs-4 fw-bold">{t('home.chitieu')}: </p>
                </div>
                <p className="value fs-4 fw-normal">{spendMonth} VND</p>
              </div>
              <div className='total-home d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row'>
                  <img className='image-infor' src={total}/>
                  <p className="title fs-4 fw-bold">{t('home.tong')}: </p>
                </div>
                <p className="value fs-4 fw-normal">{incomeMonth + spendMonth} VND</p>
              </div>
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className='calend'>
          <Calendar value={date} onChange={setDate}></Calendar>
        </div>
      </div>

      <div className="daily-expend d-flex flex-row justify-content-between">
          <p className="fs-5 fw-bold">{t('home.chitieungay')}</p>
          <div className='d-flex flex-row justify-content-between'>
            <div className='d-flex flex-row'>
            <img src={incomE} className='image-day'/>
              <p className="fs-5 fw-bold">{t('home.thunhap')}: </p>
            </div>
            <p className="fs-5 fw-normal">{income}</p>
          </div>

          <div className='d-flex flex-row justify-content-between'>
            <div className='d-flex flex-row'>
            <img src={expend} className='image-day'/>
            <p className="fs-5 fw-bold">{t('home.chitieu')}: </p>
            </div>
            <p className="fs-5 fw-normal">{spend}</p>
          </div>
          
          <div className='d-flex flex-row justify-content-between'>
            <div className='d-flex flex-row'>
            <img src={total} className='image-day'/>
            <p className="fs-5 fw-bold">{t('home.tong')}: </p>
            </div>
            <p className="fs-5 fw-normal" style={{fontWeight: 700, paddingRight: 20}}>{income + spend}</p>
          </div>
          
          
          
          
          
      </div>

        { spendingData.length === 0 ?
        
        <div className='mt-2' style={{ width: '90%'}}>
          <h5 className='text-center'>{t('home.khongcodulieu')}</h5>
        </div>

        :

      <div className='home'>
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