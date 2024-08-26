import {
  Layout,
  CardStyle,
  CardDataStats,
  useGlobalData,
  Icons,
  V,
  Breadcrumb,
} from "../../index.js";
/* import Artboard from "../../components/organisms/Paginacentrar.jsx"; */

export const Home = () => {
  const { dataUser, equiposData, solicitudData } = useGlobalData();

  const dataMap = [
    { title: "Total de usuarios", total: dataUser.length, icon: V.UsersIcon },
    {
      title: "Total de Equipos en el sistema",
      total: equiposData.length,
      icon: V.UsersIcon,
    },
    {
      title: "Total de solicitudes de mantenimiento",
      total: solicitudData.length,
      icon: V.UsersIcon,
    },
  ];

  return (
    <>
      <Layout titlePage={"Home"}>
        <Breadcrumb pageName={"Inicio"} />
        {/* Primera fila con 4 tarjetas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataMap.map((value, index) => (
            <CardDataStats key={index} title={value.title} total={value.total}>
              <Icons icon={value.icon} />
            </CardDataStats>
          ))}

          {/*  <CardStyle />
          <CardStyle />
          <CardStyle /> */}
        </div>

        {/* Segunda fila con una tarjeta grande que ocupa 2/3 del ancho y una más pequeña */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CardStyle> {/*   <Artboard /> */}</CardStyle>
          </div>

          <CardStyle> {/*   <Artboard /> */}</CardStyle>
        </div>

        {/* Tercera fila con dos tarjetas de igual tamaño */}
        {/*   <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
            sff
          </div>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark"></div>
        </div> */}

        {/* Cuarta fila con una tarjeta que ocupa todo el ancho */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* Contenido de la sexta tarjeta */}
            {/*   <Artboard /> */}
          </div>
        </div>
      </Layout>
    </>
  );
};
