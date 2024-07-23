import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from './Modal';
import RegistrarActividades from '../organisms/RegistroActividades.jsx';

const Example = ({ onDateClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setIsModalOpen(true);
        onDateClick(arg.dateStr); // Notify parent component about the date click
    };
    
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div>
      <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        navLinks={true}
        dateClick={handleDateClick}
        events={[]}
      />
      </div>

      <Modal componente={<RegistrarActividades/>} isOpen={isModalOpen} onClose={handleCloseModal} date={selectedDate} />
    </div>
  );
};

export default Example;

