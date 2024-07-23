import { CardStyle } from "../components/molecules/CardStyle.jsx";
import Layout from "../components/template/Layout.jsx";

const Fichas = () => {
  const titulos = [
    { name: "Fichas de Maquinas", url: "/crearfichaequipos" },
    { name: "Fichas de Mantenimiento", url: "/crear_ficha_mantenimiento"},
  ];
  return (
    <Layout titlePage="crear">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 sm:m-6 md:m-8 lg:m-10">
        {titulos.map((ficha) => (
          <CardStyle
            key={ficha.name}
            titleCard={ficha.name}
            link={ficha.url}
            nameLink={"Crear Ficha"}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Fichas;
