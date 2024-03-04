import React from 'react';

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const years = [2024, 2025];

  const handleChange = (e) => {
    const [year, monthIndex] = e.target.value.split('-');
    const newMonth = new Date(parseInt(year), parseInt(monthIndex));
    onMonthChange(newMonth);
  };
  const monthName = selectedMonth.toLocaleString('default', { month: 'long' });
  return (
    <div className="flex justify-start space-x-2 items-center my-4 pr-10">
      <select
        value={monthName}
        onChange={handleChange}
        className="px-6 py-4 bg-transparent rounded-md font-bold text-xl text-gray-500"
      >
        {months.map((month, index) => (
          <option key={month} className="block w-full px-6 py-4 bg-white hover:bg-gray-100" value={`${selectedMonth.getFullYear()}-${index}`}>{month}</option>
        ))}
      </select>

      <select
        value={`${selectedMonth.getFullYear()}-${selectedMonth.getMonth()}`}
        onChange={handleChange}
        className=" px-6 py-4 bg-transparent rounded-md font-bold text-xl text-gray-500"
      >
        {years.map(year => (
          <option key={year} value={`${year}-0`}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
