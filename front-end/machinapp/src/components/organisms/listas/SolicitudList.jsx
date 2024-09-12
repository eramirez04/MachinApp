import { PaginateTable } from "../table/PaginateTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { SearchComponent,Icons, V } from "../../../index.js";

/* eslint-disable-next-line react/prop-types */
export const SolicitudList = ({ DataSolicitud }) => {
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const COLUMNAS = [
    "Prioridad",
    "Costo",
    "Estado",
    "Fecha de la solicitud",
    "Acciones",
  ];
  const handleEdit = (idSolicitud) => {
    const resultadoSolictud = DataSolicitud.find(
      (solicitud) => solicitud.idSolicitud === idSolicitud
    );

    // Navega a la ruta deseada con la información del usuario
    navigate("/editar/solicitud", { state: { resultadoSolictud } });
  };

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
                        <Button
                              isIconOnly
                              color="warning"
                              onClick={() => handleEdit(fila.idSolicitud)}
                              variant="faded"

                            >
                              <Icons icon={V.PencilIcon} />{" "}
                            </Button>

                            <Button
                              isIconOnly
                              onClick={() => handleEdit(fila.idSolicitud)}
                              variant="faded"
                            >
                              <Icons icon={V.EyeIcon} />{" "}
                            </Button>
                </>
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
};
