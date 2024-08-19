import { Layout } from "../index.js";
import TablaMaquinas from "../components/organisms/TablaMaquinas.jsx";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Icons } from "../components/atoms/icons/Icons.jsx";
import { PlusIcon } from "@heroicons/react/24/outline";

export const Maquinas = () => {
  return (
    <>
      <Layout titlePage="Maquinas">
        <div className="pt-3 px-9 flex justify-end">
          <Button type="suc" color="success" className="text-white text-base">
            <Link
              to={"/crearfichaequipos"}
              className="flex gap-2 justify-center items-center h-full w-full"
            >
              {" "}
              <Icons icon={PlusIcon} /> Añadir nueva Maquina{" "}
            </Link>
          </Button>
        </div>
        <Link className=""></Link>
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


