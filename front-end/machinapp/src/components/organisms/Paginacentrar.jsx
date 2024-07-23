

import  { useState } from 'react';
import Example from '../molecules/Calendario';
import ListarActividades from './ListarActividades';

const Artboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <h1>Calendario con Actividades</h1>
      <div className="calendar-container">
        <Example onDateClick={handleDateClick} />
      </div>
      {selectedDate && <ListarActividades date={selectedDate} />}
    </div>
  );
};

export default Artboard;