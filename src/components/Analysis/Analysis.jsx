import React, {useState, useEffect} from 'react'
import './analysis.css'
import { Line, Bar } from 'react-chartjs-2'
import { db , storage, auth, DATA_COLLECTION} from '../../features/firebase/firebase'
import { collection, query, onSnapshot, doc, getDocs, QuerySnapshot, where} from 'firebase/firestore'

import search from '../../assets/Search.png'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
)
import { useTranslation } from 'react-i18next';
const Analysis = () => {
  const { t } = useTranslation()
  const [title, setTitle] = useState([]);
  const [many, setMany] = useState([]);
  const [date, setDate] = useState([])
  const [test, setTest] = useState([])
  useEffect(() => {
    const user = auth.currentUser;
    const q = query(collection(db, "spending-web"),where("uuid", "==", user.uid))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let spendingArray = []
      let manyArray = []
      let dateArray = []
      querySnapshot.forEach((doc) => {
        spendingArray.push({...doc.data(), id: doc.id})
        manyArray.push(doc.data().money)
        dateArray.push(doc.data().datetime)
      })

      // for(let i = 0; i < spendingArray.length; i++){
      //   for(let j = i + 1; j < spendingArray.length; j++){
      //     if(spendingArray[i].date === spendingArray[j].date){
      //       spendingArray[i].many = Number(spendingArray[i].many)
      //       spendingArray[j].many = Number(spendingArray[j].many)

      //       spendingArray[i].many += spendingArray[j].many
      //       // const removeIndex = spendingArray.findIndex(item => item.date === spendingArray[j].date)
      //       // spendingArray.splice(removeIndex, 0)
      //     }
      //   }
      //   manyArray.push(spendingArray[i].many)
      //   dateArray.push(spendingArray[i].date)
      // }
      setTitle(spendingArray)
      setMany(manyArray)
      setDate(dateArray)
    })
    return () => unsub();
  }, []);
  console.log(many)
  console.log(date)
  console.log(title)

  return (
    <div className='Analysis'>
      <div className='nav d-flex flex-row'>
        <li>{t('analysis.tu')}:</li>
        <div className='option d-flex flex-row'>
          <input type='date' className="to form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <li>{t('analysis.den')}:</li>
        <div className='option d-flex flex-row'>
          <input type='date' className=" from form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <button className='btn-search'><img src={search}/></button>

        
      </div>

      <div className='chart'>
        <Bar className='chart-bar'
          data={{
            labels: date,
            datasets: [
              {
                data: many,
                label: "Africa",
                backgroundColor: "#1ECCEC",
                fill: false,
                maxBarThickness: 30,
              },
            ]
          }}
          options={{
            title: {
              display: true,
            },
            legend: {
              display: true,
              position: "bottom"
            },
          }}
        ></Bar>
      </div>
    </div>
  )
}

export default Analysis









// import React from 'react'
// import './analysis.css'
// import { Line, Bar } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement
// } from 'chart.js'

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement
// )
// const Analysis = () => {
//   return (
//     <div className='Analysis'>
//       <Bar className='chart'
//         data={{
//           labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
//           datasets: [
//             {
//               data: [900000],
//               label: "Africa",
//               backgroundColor: "red",
//               fill: false
//             },
//           ]
//         }}
//         options={{
//           title: {
//             display: true,
//             text: "World population per region (in millions)"
//           },
//           legend: {
//             display: true,
//             position: "bottom"
//           }
//         }}
//       ></Bar>
//     </div>
//   )
// }

// export default Analysis

