import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import "./Currency.css";
import { API, options } from "../../utils/countries";

const Currency = () => {
  const [typeOne, setTypeOne] = useState("");
  const [typeTwo, setTypeTwo] = useState("");
  const [value, setValue] = useState("");
  const [changeValue, setChangeValue] = useState("");

  const { t, i18n } = useTranslation();

  function updateValue(e) {
    searchValue = e.target.value;
  }

  const updateCurrency = () => {
    fetch(`${API}`)
      .then((currency) => {
        return currency.json();
      })
      .then(displayResults);

    function displayResults(currency) {
      let fromRate = currency.rates[typeOne.label];
      let toRate = currency.rates[typeTwo.label];

      setChangeValue(((toRate / fromRate) * searchValue).toFixed(2));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="currency-container">
        <h3 className="my-2 d-flex justify-content-center">{t("accountInfo.tygia")}</h3>
        <div className="currency-body d-flex flex-column">
          <p>Nhập số tiền hiện tại: </p>
          <input
            type="text"
            className="form-control searchBox"
            aria-describedby="basic-addon1"
            onInput={updateValue}
          />
          <p>Tỷ giá hiện tại đang sử dụng</p>

          <Select
            className="w-100"
            placeholder="lựa chọn"
            onChange={setTypeOne}
            options={options}
          />

          <p>Tỷ giá cần chuyển đổi</p>
          <Select
            className="w-100"
            placeholder="lựa chọn"
            onChange={setTypeTwo}
            options={options}
          />

          <button className="btn btn-primary" onClick={updateCurrency}>
            Chuyển đổi
          </button>
          <p>Giá trị</p>
          <input
            className="form-control value"
            type="text"
            value={changeValue}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Currency;