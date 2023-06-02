import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import "./Currency.css";
import { API, options } from "../../utils/countries";

import currencyChange from '../../assets/CurrencyChange.png'

//??? why it outside

const Currency = () => {
  const [typeOne, setTypeOne] = useState("");
  const [typeTwo, setTypeTwo] = useState("");
  const [value, setValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState(false);

  const { t, i18n } = useTranslation();

  function updateValue(e) {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setSearchValue(newValue);
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
        <p className="my-2 d-flex justify-content-center fw-bold fs-2"><img className="imageCurrency" src={currencyChange}/>{t("accountInfo.tygia")}</p>
        <div className="currency-body d-flex flex-column">
          <p className="fs-6 fw-bold">{t('editSpending.nhapsotienhientai')}: </p>
          <input
            type="text"
            className="form-control searchBox"
            aria-describedby="basic-addon1"
            value={searchValue}
            onInput={updateValue}
          />
            {searchError && (
                <p className="error">Chỉ nhập số</p>
            )}
          <p className="fs-6 fw-bold">{t('editSpending.tu')}</p>

          <Select
            className="w-100"
            placeholder={t('editSpending.luachon')}
            onChange={setTypeOne}
            value={typeOne}
            options={options}
          />

          <p className="fs-6 fw-bold">{t('editSpending.qua')}</p>
          <Select
            className="w-100"
            placeholder={t('editSpending.luachon')}
            onChange={setTypeTwo}
            value={typeTwo}
            options={options}
          />

          <button className="btn btn-primary mt-4" onClick={updateCurrency}>
          {t('editSpending.chuyendoi')}
          </button>
          <p className="fs-6 fw-bold">{t('editSpending.giatri')}</p>
          <input
            className="form-control valueChangeCurr"
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