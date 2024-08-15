import  { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import {axiosCliente} from "../../service/api/axios.js"

const Example = ( ) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await axiosCliente.get('actividades/listar/{acti_fecha_realizacion}');
        const actividades = response.data.resultadoActividad;


        const calendarEvents = actividades.map(actividad => ({
          title: actividad.acti_nombre, 
          start: actividad.acti_fecha_realizacion,
          description: actividad.acti_descripciones 
        }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
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
          width={1000}
          padding={[2,4]}
          headerToolbar={{
            start: '', 
            center: 'title', // Título centrado
            end: 'today dayGridMonth prev,next' // Botones de navegación a la derecha
          }}
          events={events} // Pasamos los eventos al calendario
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.title}</b>
              <p>{eventInfo.event.extendedProps.description}</p>
            </div>
          )}
          className="h-full"

        />
      </div>


  );
};

export default Example;


