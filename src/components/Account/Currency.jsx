import React, {useState} from 'react'
import { useTranslation } from 'react-i18next';
import Select from 'react-select'
import './Account.css'

const API = "https://api.exchangerate-api.com/v4/latest/USD"; // API CURRENCY

const options = [
    { value: '1', label: 'USD',  },
    { value: '3', label: 'VND' },
    { value: '4', label: 'EUR' },
    { value: '5', label: 'AED' },
    { value: '6', label: 'ARS' },
    { value: '7', label: 'AUD' },
    { value: '8', label: 'BGN' },
    { value: '9', label: 'BRL' },
    { value: '10', label: 'BSD' },
    { value: '11', label: 'CAD' },
    { value: '12', label: 'CHF' },
    { value: '13', label: 'CLP' },
    { value: '14', label: 'COP' },
    { value: '15', label: 'CZK' },
    { value: '16', label: 'DKK' },
    { value: '17', label: 'DOP' },
    { value: '18', label: 'EGP' },
    { value: '19', label: 'FJD' },
    { value: '20', label: 'GBP' },
    { value: '21', label: 'GTQ' },
    { value: '22', label: 'HKD' },
    { value: '23', label: 'HRK' },
    { value: '24', label: 'HUF' },
  ];

  
  var searchValue;
  const Currency = () => {
    const [typeOne, setTypeOne] = useState("")
    const [typeTwo, setTypeTwo] = useState("")

    const [value, setValue] = useState("")
    const [changeValue, setChangeValue] = useState("")

    const { t, i18n } = useTranslation()

    function updateValue(e) {
        searchValue = e.target.value;
    }
    const updateCurrency =() =>{
                fetch(`${API}`)
                .then(currency => {
                    return currency.json();
                }).then(displayResults);

        function displayResults(currency) {
            
            let fromRate = currency.rates[typeOne.label];
            let toRate = currency.rates[typeTwo.label];

            setChangeValue(((toRate / fromRate) * searchValue).toFixed(2))
            
        }
    }
    
    return (
        <div className='currency'>
            <h3 className='my-2'>{t('accountInfo.tygia')}:</h3>
            <div className='currency d-flex flex-column'>
                <p>Nhập số tiền hiện tại: </p>
                    <input type="text" class="form-control searchBox" aria-describedby="basic-addon1" onInput={updateValue}/>
                <p>Tỷ giá hiện tại đang sử dụng</p>
                
                <Select className='w-100'
                placeholder='lựa chọn'
                onChange={setTypeOne}
                options={options}
                />
                
                <p>Tỷ giá cần chuyển đổi</p>
                <Select className='w-100'
                placeholder='lựa chọn'
                onChange={setTypeTwo}
                options={options}
                />

                <button className='btn btn-primary' onClick={updateCurrency}>Chuyển đổi</button>
                <p>Giá trị</p>
                <input class="form-control value" type="text" value={changeValue} disabled/>    
            </div>
        </div>
    )
}

export default Currency