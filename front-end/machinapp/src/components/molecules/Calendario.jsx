import  { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';


const Example = ( ) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/actividades/listar'); 
        const data = await response.json();
  
        if (data.resultadoActividad) {
          const mappedEvents = data.resultadoActividad.map(event => ({
            title: event.acti_nombre,
            start: event.acti_fecha_realizacion,
          }));
          setEvents(mappedEvents);
        } else {
          console.error( data);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchEvents();
  }, []);

    
  return (

      <div > 
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={esLocale}
          navLinks={true}
          height= {750}
          headerToolbar={{
            start: '', 
            center: 'title', // Título centrado
            end: 'today dayGridMonth prev,next' // Botones de navegación a la derecha
          }}
          events={events}

          
        
        />
      </div>


  );
};

export default Example;


