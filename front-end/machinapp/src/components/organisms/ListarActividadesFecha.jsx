// ListarActividadesFecha.js
import React, { useEffect, useState } from 'react';
import {axiosCliente} from "../../service/api/axios.js"

const ListarActividadesFecha = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await axiosCliente.get(`/actividades/listar/${acti_fecha_realizacion}`);
        setActividades(response.data.resultadoActividad);
      } catch (error) {
        console.error("Error fetching activities: ", error);
      }
    };

    fetchActividades();
  }, [acti_fecha_realizacion]);

  return (
    <div>
      {actividades.map(actividad => (
        <div key={actividad.idActividades}>
          <h3>{actividad.acti_nombre}</h3>
          <p>{actividad.acti_descripciones}</p>
          <p>{actividad.acti_estado}</p>
        </div>
      ))}
    </div>
  );
};

export default ListarActividadesFecha;
