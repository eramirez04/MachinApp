

import  { useState } from 'react';
import Example from '../molecules/Calendario';
import ListarActividades from './ListarActividades';

const Artboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div >
        <Example onDateClick={handleDateClick} />
      {selectedDate && <ListarActividades date={selectedDate} />}
    </div>
  );
};

export default Artboard;