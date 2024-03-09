import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TabView.css';

type DateSelectorProps = {
  onDateRangeChange: (startDate: Date, endDate: Date) => void;

};
// ... (other imports and code)

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateRangeChange,
}: DateSelectorProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);

    // Check if both start and end dates are not null before calling the callback
    if (start && end) {
      onDateRangeChange(start, end);
    }
  };

  return (
    <div className="date-selector-container">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => handleDateChange(date, endDate)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        dateFormat="MMM dd, yyyy"
        className="custom-input"
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => handleDateChange(startDate, date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        dateFormat="MMM dd, yyyy"
        className="custom-input"
        calendarClassName="custom-calendar"
      />
    </div>
  );
};

export default DateSelector;
