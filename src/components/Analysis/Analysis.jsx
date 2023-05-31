import React, { useState, useEffect } from "react";
import "./analysis.css";
import { Line, Bar } from "react-chartjs-2";
import {
  db,
  storage,
  auth,
  DATA_COLLECTION,
} from "../../features/firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDocs,
  QuerySnapshot,
  where,
} from "firebase/firestore";

import search from "../../assets/Search.png";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);
import { useTranslation } from "react-i18next";
import { useStateManager } from "react-select";
import { useAsyncError } from "react-router";
const Analysis = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState([]);

  const [revenue, setRevenue] = useState([]);
  const [expenditure, setExpenditure] = useState([]);

  const [dateRevenue, setDateRevenue] = useState([]);
  const [moneyRevenue, setMoneyRevenue] = useState([]);

  const [dateExpend, setDateExpend] = useState([]);
  const [moneyExpend, setMoneyExpend] = useState([]);
  useEffect(() => {
    const user = auth.currentUser;
    const q = query(collection(db, "spending"), where("uuid", "==", user.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let revenueArray = []; // biểu đồ thu nhập
      let expenditureArray = []; // biểu đồ về chi tiêu
      let testArray = [];

      let dateRe = [];
      let moneyRe = [];
      let dateEx = [];
      let moneyEx = [];
      querySnapshot.forEach((doc) => {
        testArray.push({
          money: doc.data().money,
          date: doc.data().date.toDate().toLocaleDateString(),
        });
      });
      for (let i = 0; i < testArray.length; i++) {
        if (testArray[i].money > 0) {
          revenueArray.push(testArray[i]);
        } else if (testArray[i].money < 0) {
          expenditureArray.push(testArray[i]);
        }
      }
      // let k = 0;
      // for(let i = 0; i < revenueArray.length; i++){
      //   for(let j = i + 1; j < revenueArray.length; j++){
      //     if(revenueArray[i].date == revenueArray[j].date){
      //       k++;
      //       revenueArray[i].money += revenueArray[j].money
      //       revenueArray.splice(j, k)
      //     }
      //   }
      // }

      for (let i = 0; i < revenueArray.length; i++) {
        dateRe.push(revenueArray[i].date);
        moneyRe.push(revenueArray[i].money);
      }
      for (let i = 0; i < expenditureArray.length; i++) {
        dateEx.push(expenditureArray[i].date);
        moneyEx.push(expenditureArray[i].money * -1);
      }
      setDateRevenue(dateRe);
      setMoneyRevenue(moneyRe);
      setDateExpend(dateEx);
      setMoneyExpend(moneyEx);

      setRevenue(revenueArray);
      setExpenditure(expenditureArray);
    });
    return () => unsub();
  }, []);
  console.log(revenue);
  console.log(expenditure);

  console.log(dateRevenue);
  console.log(moneyRevenue);

  console.log(dateExpend);
  console.log(moneyExpend);

  const [dateReceiveChange, setDateReceiveChange] = useState([]);
  const [moneyReceiveChange, setMoneyReceiveChange] = useState([]);
  const [dateExpendChange, setDateExpendChange] = useState([]);
  const [moneyExpendChange, setMoneyExpendChange] = useState([]);
  const [colorReceiveChart, setColorReceiveChart] = useState("");
  const [colorExpendChart, setColorExpandChart] = useState("");
  const [isReceive, setIsReceive] = useState(true);

  const changeChartRev = () => {
    setDateReceiveChange(dateRevenue);
    setMoneyReceiveChange(moneyRevenue);
    setColorReceiveChart("#1ECCEC");
    setIsReceive(true);
  };
  const changeChartEx = () => {
    setDateExpendChange(dateExpend);
    setMoneyExpendChange(moneyExpend);
    setColorExpandChart("#A5191D");
    setIsReceive(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="Analysis align-items-center">
      <div className="nav d-flex flex-row ">
        <li>{t("analysis.tu")}:</li>
        <div className="option d-flex flex-row">
          <input
            type="date"
            className="from form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            // onChange={setChangeFrom}
          />
        </div>

        <li>{t("analysis.den")}:</li>
        <div className="option d-flex flex-row">
          <input
            type="date"
            className=" to form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            // onChange={setChangeTo}
          />
        </div>

        <button className="btn-search">
          <img src={search} />
        </button>
      </div>

      <div className="chart">
        {isReceive ? (
          <Bar
            className="chart-bar"
            data={{
              labels: dateReceiveChange,
              datasets: [
                {
                  data: moneyReceiveChange,
                  label: "Ngày",
                  backgroundColor: colorReceiveChart,
                  fill: false,
                  maxBarThickness: 30,
                },
              ],
            }}
            options={{
              title: {
                display: true,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            }}
          ></Bar>
        ) : (
          <Bar
            className="chart-bar"
            data={{
              labels: dateExpendChange,
              datasets: [
                {
                  data: moneyExpendChange,
                  label: "Ngày",
                  backgroundColor: colorExpendChart,
                  fill: false,
                  maxBarThickness: 30,
                },
              ],
            }}
            options={{
              title: {
                display: true,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            }}
          ></Bar>
        )}
      </div>

      <div className="">
        <button className="btn btn-primary" onClick={changeChartRev}>
          Thu nhập
        </button>
        <button className="btn btn-primary" onClick={changeChartEx}>
          Chi tiêu
        </button>
      </div>
    </div>
  );
};

export default Analysis;

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
