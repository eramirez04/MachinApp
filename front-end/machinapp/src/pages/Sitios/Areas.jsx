import { useEffect, useState } from 'react'
import BuscarAmbientes from '../../components/organisms/Sitios/ListarAmbientes.jsx'
import Layout from '../../components/template/Layout.jsx'
import { useParams } from "react-router-dom"
import { axiosCliente } from "../../service/api/axios.js"

const Areas = () => {
  const { idArea } = useParams();
  const [nombreArea, setNombreArea] = useState([]);

  useEffect(() => {
    const buscarArea = async () => {
      try {
        const response = await axiosCliente.get(`area/listararea/${idArea}`);
        setNombreArea(response.data.resultadoArea[0].area_nombre);
      } catch (error) {
        console.error('No se pudo encontrar el area');
      }
    };
    buscarArea();
  }, [idArea]);

  return (
    <>
      <Layout titlePage={`${nombreArea}`}>
          <BuscarAmbientes idArea={idArea} />
      </Layout>
    </>
  );
};

export default Areas