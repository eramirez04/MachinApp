import {
  PaginateTable,
  SearchComponent,
  useGlobalData,
  ButtonNext,
  V,
} from "../../../index";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const BuscarAmbientesGeneral = () => {
  const [data, setData] = useState([]);

  // para poder filtrar los ambientes en la tabla
  const [filtroAmbientes, setFiltroAmbientes] = useState([]);

  // obtener los ambientes mediante el uso de los contextos
  const { ambientes } = useGlobalData();

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
      /*    const response = await axiosCliente.get("/sitio/listarsitio"); */
      const sitios = ambientes.map((sitio) => ({
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
    };

    fetchData();
  }, [ambientes]);

  const filtrarAmbientes = (buscar) => {
    const resultado = data.filter((ambiente) => {
      return (
        ambiente.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
        ambiente.tipositio.toLowerCase().includes(buscar.toLowerCase()) ||
        ambiente.area.toLowerCase().includes(buscar.toLowerCase()) ||
        ambiente.municipio.toLowerCase().includes(buscar.toLowerCase())
      );
    });
    setFiltroAmbientes(resultado);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sitios</h1>
      <div className="flex justify-between">
        <SearchComponent onSearch={filtrarAmbientes} label={"hola"} />

        <ButtonNext
          type="submit"
          className={`${V.bg_sena_verde} ${V.text_white}`}
        >
          <Link to={"/Ambientes/Registrar"}>Registrar Nuevo Ambiente</Link>
        </ButtonNext>
      </div>
      <PaginateTable
        columns={columns}
        data={filtroAmbientes}
        itemsPerPage={5}
      />
    </div>
  );
};


