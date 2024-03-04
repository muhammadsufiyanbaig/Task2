// App.js
import React from 'react';
import CalendarApp from './pages/CalendarApp';

const App = () => {
  return (
    <div className=" bg-gray-100 h-screen w-screen">
      <header className="App-header">
        <h1 className="text-4xl font-bold text-start pl-5 pt-5">Asset Events Calendar</h1>
      </header>
      <main>
        <CalendarApp />
      </main>
    </div>
  );
};

export default App;
