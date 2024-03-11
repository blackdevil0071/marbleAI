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
      // Adjust time to the beginning of the next day for both start and end dates
      const adjustedStartDate = new Date(start);
      adjustedStartDate.setHours(0, 0, 0, 0);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);

      const adjustedEndDate = new Date(end);
      adjustedEndDate.setHours(0, 0, 0, 0);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      onDateRangeChange(adjustedStartDate, adjustedEndDate);
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
  calendarClassName="custom-calendar"
  popperPlacement="bottom" // Specify the pop-up placement
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
  popperPlacement="bottom" // Specify the pop-up placement
/>

    </div>
  );
};

export default DateSelector;
