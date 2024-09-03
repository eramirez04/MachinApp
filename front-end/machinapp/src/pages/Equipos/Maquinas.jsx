import { Layout, Icons, V, Breadcrumb } from "../../index.js";
import TablaMaquinas from "../../components/organisms/TablaMaquinas.jsx";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export const Maquinas = () => {
  return (
    <>
      <Layout titlePage="Maquinas">

        <Breadcrumb pageName={`Fichas tecnicas`} />
        <div className="pt-3 px-9 mt-10 flex justify-between">
          <Button type="suc" className="text-white text-base bg-green-600">
            <Link
              to={"/crearTiposFichaTec"}
              className="flex gap-2 justify-center items-center h-full w-full"
            >
              Registrar tipo de ficha <Icons icon={PlusIcon} /> 
            </Link>
          </Button>

          <Button
           type="suc" className="text-white text-base bg-green-600"
          >
            <Link
              to={"/crearfichaequipos"}
              className="flex gap-2 justify-center items-center h-full w-full"
            >
              Añadir equipo  <Icons icon={PlusIcon} /> 
            </Link>
          </Button>
          
        </div>
        
        <div>
          <div className="mx-11 my-7">
            <p>(Hacer barra de busqueda)</p>
            <TablaMaquinas />
          </div>
        </div>
      </Layout>
    </>
  );
};

