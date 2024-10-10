import { useState } from "react"
import { useEffect } from "react"
import { CardStyle, Paginacion } from "../../index.js"
import {axiosCliente} from "../../service/api/axios.js"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"


const ListarMaquinasAmb = ({idAmbiente}) => {

    const [maquinas, setMaquinas] = useState([])
    const [dataMaquinas, setDataMaquinas] = useState([])

    const [noMaquinas, setNoMaquinas] = useState(false)
    
    //para la paginacion de las cards
    const [currentPage, setCurrentPage] = useState(1)
    const total = maquinas.length

    const lastIndex = currentPage * 9 
    const firsIndex = lastIndex - 9 
    
    
    const { t } = useTranslation()

   const setFueraServicio = () =>{
    setMaquinas(dataMaquinas?.filter(item =>item?.fi_estado == "fuera_de_servicio"))
    setCurrentPage(1)  //esto para que se me cargue siempre en la primera pagina
   }

   const setReparacion =()=>{
    setMaquinas(dataMaquinas?.filter(item => item?.fi_estado == "en_reparacion"))
    setCurrentPage(1)
   }

    const setOperacion =() =>{
        setMaquinas(dataMaquinas?.filter(item => item?.fi_estado == "operacion"))
        setCurrentPage(1)
    }

    const setTotalInfo = ()=>{
        setMaquinas(dataMaquinas)
        setCurrentPage(1)
    }

    useEffect(()=>{
        const buscarMaquinas = async () =>{
            try{
                const response = await axiosCliente.get(`ficha/listarPorAmbiente/${idAmbiente}`)

                
                if (response.data.length > 0) {
                    setDataMaquinas(response.data)
                    setMaquinas(response.data) // Para que cargue por defecto todos los equipos
                    setNoMaquinas(false) // Hay máquinas disponibles
                } else {
                    setNoMaquinas(true) // No hay máquinas
                }

            }
            catch(error){
                toast.error(error.response.data.mensaje)
                return
            }
        }
        buscarMaquinas()
    }, [idAmbiente])


  return (
      <>
        <div className="flex items-center justify-between p-4 flex-wrap mt-7">
            <div className="flex space-x-2 my-1">
                <button 
                    onClick={setTotalInfo} 
                    className=" bg-gray-800 text-white py-1 px-3 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 ease-in-out text-sm w-auto"
                >
                    {t('todasMaquinas')}
                </button>
            </div>
            <div className="flex space-x-2 my-1">
                <button 
                    onClick={setOperacion} 
                    className="bg-green-400 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 ease-in-out text-sm w-auto"
                >
                    {t('operacion')}
                </button>
                <button 
                    onClick={setFueraServicio} 
                    className="bg-red-400 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 ease-in-out text-sm w-auto"
                >
                    {t('fueraServicio')}
                </button>
                <button 
                    onClick={setReparacion} 
                    className="bg-yellow-400 text-white py-1 px-3 rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out text-sm w-auto"
                >
                    {t('reparasion')}
                </button>
            </div>
        </div>

        <div className = ' bg-white text-gray-600 flex flex-wrap flex-row justify-center mt-7 mb-20 gap-6'>
            {

                noMaquinas ? (
                    <p className="text-gray-500">No se encontraron máquinas en este ambiente.</p>
                ) : (

                maquinas.map((maquina) =>(
                    <div className="w-[250px]" key= {maquina.idFichas}>
                            <CardStyle 
                            subtitle={`${maquina.ti_fi_nombre }`}  
                            titleCard={`${t('placaSena')}:${maquina.fi_placa_sena}`} 
                            imagen={`imagenes/ficha/${maquina.fi_imagen}`}
                            link={`/infoMaquina/${maquina.idFichas}`}
                            nameLink={t('verMas')} >

                                <ul>
                                    <li><b>{t('serial')}:</b> {maquina.fi_serial}</li>
                                    <li><b>{t('modelo')}:</b> { maquina.fi_modelo}</li>
                                    <li><b>{t('estado')}:</b> {maquina.fi_estado} </li>
                                </ul>

                            </CardStyle>
                    </div>
                ))
                .slice(firsIndex, lastIndex)


                )
            }
        </div>
        <Paginacion
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={total}
            personaPerPage={9}
        />

      </>
    )
}
export default ListarMaquinasAmb  