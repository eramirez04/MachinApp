import { Layout, Icons, V } from "../index.js";
import TablaMaquinas from "../components/organisms/TablaMaquinas.jsx";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

export const Maquinas = () => {
  return (
    <>
      <Layout titlePage="Maquinas">
        <div className="pt-3 px-9 flex justify-end">
          <Button
            type="submit"
            radius={V.Bradius}
            color={V.BtnRegistrar}
            className="text-white text-base"
          >
            <Link
              to={"/crearfichaequipos"}
              className="flex gap-2 justify-center items-center h-full w-full"
            >
              {" "}
              <Icons icon={V.PlusIcon} /> Añadir nueva Máquina{" "}
            </Link>
          </Button>
        </div>
        <Link className=""></Link>
        <div>
          <div className="mx-11 my-7">
            <p>(Hacer barra de búsqueda)</p>
            <TablaMaquinas />
          </div>
        </div>
      </Layout>
    </>
  );
};
