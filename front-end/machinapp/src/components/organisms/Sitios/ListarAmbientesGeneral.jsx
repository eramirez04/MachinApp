import { PaginateTable } from "../table/PaginateTable";
import { useEffect, useState } from "react";
import { axiosCliente } from "../../../service/api/axios";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const BuscarAmbientesGeneral = () => {
  const [data, setData] = useState([]);
  const columns = [
    "ID",
    "Nombre",
    "Tipo de sitio",
    "Área",
    "Instructor encargado",
    "Acciones",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get("/sitio/listarsitio");
        const sitios = response.data.resultadoSitio.map((sitio) => ({
          id: sitio.idAmbientes,
          nombre: sitio.sit_nombre,
          tipositio: sitio.tipo_sitio,
          area: sitio.area_nombre,
          municipio: sitio.instructor_encargado,
          acciones: (
            <Link to={`/Ambientes/Actualizar/${sitio.idAmbientes}`}>
              <FaEdit className="cursor-pointer" />
            </Link>
          ),
        }));
        setData(sitios);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sitios</h1>
      <div className="flex justify-end">
        <Link to={"/Ambientes/Registrar"}>
          <button className="bg-blue-500 rounded-md p-3 hover:bg-blue-700 mb-5 font-semibold">
            Registrar nuevo
          </button>
        </Link>
      </div>
      <PaginateTable columns={columns} data={data} itemsPerPage={5} />
    </div>
  );
};

export default BuscarAmbientesGeneral;