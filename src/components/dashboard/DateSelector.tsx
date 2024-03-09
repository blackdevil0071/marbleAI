import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TabView.css';

// Specify the types for the DateSelectorProps
type DateSelectorProps = {
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
  onUpdateButtonClick: () => void;
};

// Use React.FC with DateSelectorProps as the generic type
const DateSelector: React.FC<DateSelectorProps> = ({ onDateRangeChange, onUpdateButtonClick }) => {
  // Use Date | null as the type for state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Specify the types for handleDateChange function
  const handleDateChange = (date: Date | null, isStart: boolean = false) => {
    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleUpdateButtonClick = () => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    onUpdateButtonClick();
    onDateRangeChange(startDate || new Date(), endDate || new Date());
  };
  return (
    <div className="date-selector-container">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => handleDateChange(date, true)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        dateFormat="MMM dd, yyyy"
        className="custom-input"
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => handleDateChange(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        dateFormat="MMM dd, yyyy"
        className="custom-input"
        calendarClassName="custom-calendar"
      />
      <button onClick={handleUpdateButtonClick}>Update</button>
    </div>
  );
};

export default DateSelector;
