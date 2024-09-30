import { useState, useEffect } from 'react';
import { useGlobalData } from "../../index";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export const Calendario = () => {
  const { equiposData } = useGlobalData(); // Datos globales de máquinas
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/actividades/listar');
        const data = await response.json();
  
        if (data.resultadoActividad) {
          const mappedEvents = data.resultadoActividad.map(event => {

            const equipo = equiposData.find(equipo => equipo.idFichas === event.idFichas);
            return {
              title: equipo ? equipo.fi_placa_sena : 'Sin Placa',
              start: event.acti_fecha_realizacion,
            };
          });
          setEvents(mappedEvents);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchEvents();
  }, [equiposData]); // Ejecutar cuando cambie equiposData

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        navLinks={true}
        height={750}
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



