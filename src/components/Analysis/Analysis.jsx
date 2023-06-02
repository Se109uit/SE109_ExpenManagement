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
import { Toys } from "@mui/icons-material";

const dayname = ['CN','T2','T3','T4','T5','T6','T7'];
const monthname = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9']



const Analysis = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState([]);

  const [revenue, setRevenue] = useState([]);
  const [expenditure, setExpenditure] = useState([]);

  const [dateRevenue, setDateRevenue] = useState([]);
  const [copydateRevenue, setcopydateRevenue] = useState([])
  const [moneyRevenue, setMoneyRevenue] = useState([]);

  const [dateExpend, setDateExpend] = useState([]);
  const [copydateExpend, setcopydateExpend] = useState([])
  const [moneyExpend, setMoneyExpend] = useState([]);

  useEffect(() => {

    changeDayFrom.setDate(1)
    console.log(changeDayFrom)
    changeDayTo.setDate(8)
    console.log(changeDayTo)
    searchChange()

    // setCdf(dayname[(changeDayFrom).getDay()] + '/' + (changeDayFrom).getDate())
    // setCdt(dayname[(changeDayTo).getDay()] + '/' + (changeDayTo).getDate())


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
          date: doc.data().date.toDate(),
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
      setcopydateRevenue(dateRe)
      setMoneyRevenue(moneyRe);

      setDateExpend(dateEx);
      setcopydateExpend(dateEx)
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
    // updateChartRev()
    setDateReceiveChange(dateRevenue);
    setMoneyReceiveChange(moneyRevenue);
    setColorReceiveChart("#1ECCEC");
    setIsReceive(true);
  };
  const changeChartEx = () => {
    // updateChartEx()
    setDateExpendChange(dateExpend);
    setMoneyExpendChange(moneyExpend);
    setColorExpandChart("#A5191D");
    setIsReceive(false);
  };

  const [changeDayFrom, setChangeDayFrom ]= useState(new Date())
  const [changeDayTo, setChangeDayTo]= useState(new Date())

  // function updateChartRev(){
  //   for(let i = 0; i < copydateRevenue.length; i++){
  //     const l = copydateRevenue[i].toLocaleDateString()
  //     copydateRevenue[i] = l
  //   }
  // }

  // function updateChartEx(){
  //   for(let j = 0; j < copydateExpend.length; j++){
  //     const k = copydateExpend[j].toLocaleDateString()
  //     copydateExpend[j] = k
  //   }
  // }

  function updateDayFrom(e){
    setChangeDayFrom(new Date(e.target.value))
  }

  function updateDayTo(e){
    setChangeDayTo(new Date(e.target.value))
  }

  const searchChange = () => {
    if(changeDayFrom > changeDayTo){
      alert("Nhập cho đúng ngày!")
    }else{
      let revDay = []
      let revMo = []
      for(let i = 0; i < revenue.length; i++){
        if(revenue[i].date >= changeDayFrom && revenue[i].date <= changeDayTo){
          revDay.push(revenue[i].date.toLocaleDateString())
          revMo.push(revenue[i].money)
        }
      }
      setDateReceiveChange(revDay);
      setMoneyReceiveChange(revMo);

      let exDay = []
      let exMo = []
      for(let i = 0; i < expenditure.length; i++){
        if(expenditure[i].date >= changeDayFrom && expenditure[i].date <= changeDayTo){
          exDay.push(expenditure[i].date.toLocaleDateString())
          exMo.push(expenditure[i].money*-1)
        }
      }
      setDateExpendChange(exDay);
      setMoneyExpendChange(exMo);
    }

    console.log(changeDayFrom.getDay())
    console.log(changeDayTo)

    


  }

  return (
    <div className="Analysis align-items-center">
      <div className="nav d-flex flex-row">
        {/* <p>{t("analysis.tu")}:</p> */}
        <div className="option d-flex flex-row">
          <input
            type="date"
            className="fromI form-control"
            onInput={updateDayFrom}
          />
        </div>

        {/* <p>{t("analysis.den")}:</p> */}
        <div className="option d-flex flex-row">
          <input
            type="date"
            className="toI form-control"
            onInput={updateDayTo}
          />
        </div>

        <button className="btn-search" onClick={searchChange}>
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

      <div className="btn search">
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