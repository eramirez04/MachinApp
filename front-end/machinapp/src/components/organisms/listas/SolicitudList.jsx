import { PaginateTable } from "../table/PaginateTable";
import { DropDown } from "../../molecules/navigation/Dropdown";
import { useState } from "react";
import { SearchComponent } from "../../../index";

/* eslint-disable-next-line react/prop-types */
export const SolicitudList = ({ DataSolicitud }) => {
  const [filteredData, setFilteredData] = useState([]);
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

  const handleSearSolicitud = (search) => {
    const filtered = newArrayDataSolicitud.filter((item) =>
      item.costo.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="min-h-screen p-6 flex flex-col gap-8 ">
        <SearchComponent onSearch={handleSearSolicitud} />
        <div className="w-full overflow-x-auto">
          <PaginateTable
            columns={COLUMNAS}
            data={filteredData.map((fila) => ({
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
        </div>
      </div>
    </>
  );
};
