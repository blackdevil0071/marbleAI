import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TabView.css';

const DATE_FORMAT = 'MMM dd, yyyy';

type DateSelectorProps = {
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({ onDateRangeChange }: DateSelectorProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Handle changes to start and end dates
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
        dateFormat={DATE_FORMAT}
        className="custom-input"
        calendarClassName='custom-calendar'
        popperPlacement="bottom"
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => handleDateChange(startDate, date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        dateFormat={DATE_FORMAT}
        className="custom-input"
        calendarClassName="custom-calendar"
        popperPlacement="bottom"
      />
    </div>
  );
};

export default DateSelector;
