import { PaginateTable } from "../table/PaginateTable";
import { DropDown } from "../../molecules/navigation/Dropdown";

/* eslint-disable-next-line react/prop-types */
export const SolicitudList = ({ DataSolicitud }) => {
  const COLUMNAS = [
    "Prioridad",
    "Costo",
    "Estado",
    "Fecha de la solicitud",
    "Acciones",
  ];

  /* eslint-disable-next-line react/prop-types */
  const newArrayDataSolicitud = DataSolicitud.map((item) => {
    const formattedDate = new Date(item.fecha_solicitud).toLocaleDateString(
      "es-ES",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    return {
      prioridad: item.soli_prioridad,
      costo: item.soli_costo_estimado,
      estado: item.soli_estado,
      fecha: formattedDate,
    };
  });

  return (
    <>
      <section className="px-10">
        <PaginateTable
          columns={COLUMNAS}
          data={newArrayDataSolicitud.map((fila) => ({
            ...fila,
            acciones: (
              <>
                <DropDown
                  dropdown={["Ver solicitud"]}
                  DropdownTriggerElement={"..."}
                />
              </>
            ),
          }))}
        />
      </section>
    </>
  );
};
