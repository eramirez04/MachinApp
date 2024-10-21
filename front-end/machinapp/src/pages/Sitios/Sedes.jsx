import { Layout, BuscarAreas, axiosCliente } from "../../index";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"


export const Sedes = () => {
  const { idSede } = useParams()
  const [nombreSede, setNombreSede] = useState([])

  useEffect(() => {
    const buscarSede = async () => {
      try {
        const response = await axiosCliente.get(`sede/listarsede/${idSede}`)
        setNombreSede(response.data.resultadoSede[0].sede_nombre)
      } catch (error) {
        console.error('No se pudo encontrar la sede')
      }
    };
    buscarSede()
  }, [idSede])

  return (
    <>
      <Layout titlePage={`${nombreSede}`}>
          <BuscarAreas idSede={idSede} />
      </Layout>
    </>
  );
};

