import {
  PaginateTable,
  SearchComponent,
  useGlobalData,
  ButtonNext,
  V,
  Icons,
} from "../../../index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@nextui-org/react";

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
    const fetchData = () => {
      const sitios = ambientes.map((sitio) => ({
        id: sitio.idAmbientes,
        nombre: sitio.sit_nombre,
        tipositio: sitio.tipo_sitio,
        area: sitio.area_nombre,
        municipio: sitio.instructor_encargado,
        acciones: (
          <>
            <ButtonNext isIconOnly color="warning" variant="faded">
              <Tooltip content="Editar">
                <Link
                  to={`/Ambientes/Actualizar/${sitio.idAmbientes}`}
                  className="flex justify-center items-center h-full w-full"
                >
                  <Icons icon={V.PencilIcon} />
                </Link>
              </Tooltip>
            </ButtonNext>
          </>
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
          startContent={<Icons icon={V.PlusIcon} />}
        >
          <Link to={"/Ambientes/Registrar"}>Registrar Nuevo Ambiente</Link>
        </ButtonNext>
      </div>
      <PaginateTable
        columns={columns}
        data={filtroAmbientes}
        itemsPerPage={10}
      />
    </div>
  );
};
