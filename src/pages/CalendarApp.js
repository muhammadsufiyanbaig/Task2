import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import CalendarMonth from './CalendarMonth';

const CalendarApp = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  return (
    <div className="container  my-8">
      <MonthSelector selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      <CalendarMonth selectedMonth={selectedMonth} />
    </div>
  );
};

export default CalendarApp;
