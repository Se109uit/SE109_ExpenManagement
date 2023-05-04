import React, { useState } from 'react';
import './DatePicker.css';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    return (
        <>
            <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="ct-date-picker"
        />
        </>
    );
};

export default DatePicker;
