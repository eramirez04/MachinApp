import { useEffect, useState } from 'react'
import {axiosCliente} from "../../service/api/axios.js"
import { Layout, Icons, Breadcrumb, PaginateTable, SearchComponent } from "../../index.js";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";



import {Tooltip} from "@nextui-org/react"
import { FaEye } from "react-icons/fa"

import { useTranslation } from "react-i18next";

export const Maquinas = () => {


  const { t } = useTranslation()

  const [maquinas, setMaquinas] = useState([])

  const [maquinasFilt, setMaquinasFil] = useState([])

  useEffect(()=>{

      const buscarInfo = async ()=>{

          try{
              const response = await axiosCliente.get('ficha/listar')
              console.log(response.data)
              setMaquinas(response.data)
          }catch(error){
              console.error('Error listando máquinas ')
          }
      }
      buscarInfo()
  }, [])

  // columnas para la tabla

  const columns = [
    "Id",
    t("placaSena"),
    t("serial"),
    t("marca"),
    t("modelo"),
    t("ubicacion"),
    t("estado"),
    ""
  ]

  const contentTable = maquinas.map((maquina) =>(
    {
    idFichas:maquina.idFichas, 
    placa_sena: maquina.fi_placa_sena,
    serial: maquina.fi_serial,
    marca: maquina.fi_marca,
    modelo: maquina.fi_modelo,
    ubicacion: maquina.sit_nombre, 
    estado: maquina.fi_estado
    }
  ))

  const buscarMaquina = (search) =>{
    const filtrarMaquinas = contentTable.filter((maquina)=>{
      return (
       
        maquina.placa_sena.toLowerCase().includes(search.toLowerCase()) ||
        /* maquina.serial.toLowerCase().includes(search.toLowerCase()) ||
        maquina.marca.toLowerCase().includes(search.toLowerCase()) ||
        maquina.modelo.toLowerCase().includes(search.toLowerCase()) || */
        maquina.ubicacion.toLowerCase().includes(search.toLowerCase()) ||
        maquina.estado.toLowerCase().includes(search.toLowerCase()) 
      )
    })
    setMaquinasFil(filtrarMaquinas)
  }

  return (
    <>
      <Layout titlePage="Maquinas">

        <Breadcrumb pageName={t("FichasTecnicas")} />
        <div className="pt-3 px-9 mt-10 flex justify-between">
          <Button type="suc" className="text-white text-base bg-green-600">
            <Link
              to={"/crearTiposFichaTec"}
              className="flex gap-2 justify-center items-center h-full w-full"
            >
              {t("RegistrarTipoFicha")} <Icons icon={PlusIcon} /> 
            </Link>
          </Button>

          <Button
           type="suc" className="text-white text-base bg-green-600"
          >
            <Link
              to={"/crearfichaequipos"}
              className="flex gap-2 justify-center items-center h-full w-full"
            >
              { t("agregarEquipo")} <Icons icon={PlusIcon} /> 
            </Link>
          </Button>
          
        </div>
        
        <div className="pt-3 px-9 mt-8 mb-10">
          <div className='mb-6'>
            <SearchComponent
                  label={`${t('placaSena')}, ${t('serial')}, ${t('marca')}, ${t('modelo')}`}
                  onSearch={buscarMaquina}
                  className="w-full md:w-auto"
            />
          </div>  

        <PaginateTable
          columns={columns}
          data={
            maquinasFilt.map((maquina)=>({
              ...maquina,
              estado:(
                <>
                <div className={`opacity-[.67] ${
                    maquina.estado === 'operacion' ? 'bg-green-500/40' 
                    : maquina.estado === 'fuera_de_servicio' ? 'bg-red-500/40' 
                    : 'bg-yellow-500/40'
                  } py-1 px-2 flex justify-center rounded-3xl `}>
                    
                    <p className={` ${
                    maquina.estado === 'operacion' ? 'text-green-600' 
                    : maquina.estado === 'fuera_de_servicio' ? 'text-red-600' 
                    : 'text-yellow-600'
                    }  flex justify-center rounded-md `}>{maquina.estado}</p>
                  
                  </div>
                </>
              ),
              ver:(
                <Link to= {`/infoMaquina/${maquina.idFichas}`} className='bg-slate-900'>
                    <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaEye />
                        </span>
                    </Tooltip>
                </Link>
              ), 
            }))
          }
        />
        </div>


      </Layout>
    </>
  )
}