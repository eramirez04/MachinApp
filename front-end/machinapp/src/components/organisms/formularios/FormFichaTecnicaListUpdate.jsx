import { Image } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { axiosCliente } from "../../../service/api/axios";
import { InputUpdate, SelectComponent,ButtonNext, TextAreaComponent, useGlobalData} from "../../../index.js";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useNavigate } from 'react-router-dom'

import { multiFormData } from "../../../utils/formData.js"



export const FormFichaTecnicaListUpdate = ({ idMaquina }) => {

  const { refreshEquipos } = useGlobalData()

  const idFicha = idMaquina
  const { t } = useTranslation()
  const navigate = useNavigate()


  //select de ambientes
  const [ambientes, setAmbientes] = useState([])


  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm();

  const [isLoading, setIsLoading] = useState(true)
  const [infoFicha, setInfoFicha] = useState({})

  const [imagen, setImagen] = useState(null)
  const [fichaRes, setFicha] = useState(null)

  // previsua// hookslizar una imagen
  const [estadoImg, setEstadoImg] = useState(false)
  const [previewImagen, setPreviewImagen] = useState(null)


  // almacenaran a la informacion de las variables y detalles
  const [varEspec, setVarEspec] = useState([])
  const [varEspTecnicas, setVarEspTec ] = useState([])
  const [varSecciones, setVarSecciones ] = useState([])
  const [varObligatorias, setVarObligatorias] = useState({})


  const handleSubmitData = async (data) => {


    //creamos un objto para actualizar la informacion basica de la maquina o equipo
    let infoFicha = {
      placaSena : data.fi_placa_sena,
      fiEstado: data.fi_estado ,
      fk_sitio: data.fi_fk_sitios,
      fiImagen: imagen,
      fiTecnica: fichaRes
    }

    //objeto que contenga la informacion de los detalles
    let infoDetalles = {
      ...data.infoDetalles
    }

    //creamos un array para guardar las clave de los objetos que son los id de los detalles y el valor de estas claves es el valor de dicho detalle. 
    let detallesBd =  Object.keys(infoDetalles).map(key => ({
      idDetalle: key, // usa la clave original como idDetalle
      detValor: infoDetalles[key]
    }))


    try{

      //actualizamos la informacion basica de la maquina
      await multiFormData(`/ficha/actualizar/${idFicha}`, infoFicha, "PUT")


      //actualizamos la informacion de los detalles. 
      await axiosCliente.put('detalle/actualizar',{detalles:detallesBd} )

      await refreshEquipos()

      navigate(`/infoMaquina/${idFicha}`)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const infoFichaTecnica = async () => {
      try {
        const response = await axiosCliente.get(`ficha/listarUnica/${idFicha}`)

        //para la info de la ficha
        const ficha = response.data.infoFicha[0]

        setInfoFicha(ficha)
        //reset(ficha) // Rellena el formulario con los datos desde la base de datos
        setIsLoading(false)


        //para info de las variables y detalles
        let variables = response.data.infoVar

        //registramos todos los detalles en  el formulario para poder editarlos , el id del detalle es la clave y el valor es el valor del input.  

        let contDetalles = {}

        for (let i = 0; i < variables.length; i++) {
          let variable = variables[i] // Obtiene el objeto actual
          contDetalles[`${variable.idDetalle}`] = variable.det_valor // Asigna la clave y valor al objeto contDetalles
        }

        let contenidoForm = {...ficha }

        contenidoForm['infoDetalles'] = {...contDetalles}

        reset(contenidoForm)
        
        //separamos las clases de las variables para poder mapearlas
        setVarEspTec(variables?.filter(item => item.var_clase == "especificacionesTecnicas"))
        setVarSecciones(variables?.filter(item => item.var_clase == "seccion"))
        setVarEspec(variables?.filter(item => item.var_clase == "especifica"))   
        

        //manejo de las variables de clase obligatoria

        let varObligatorias = variables?.filter(item => item.var_clase == "obligatoria")

        const objVarObligatorias = {}


        for(let i = 0; i< varObligatorias.length; i++){
          const variable = varObligatorias[i]

          objVarObligatorias[`idVar${variable.idVariable}`] ={
            idDetalle: variable.idDetalle,
            det_valor: variable.det_valor, 
            var_nombre: variable.var_nombre,
            var_descripcion: variable.var_descripcion,
            var_tipoDato: variable.var_tipoDato
          }

        }

        setVarObligatorias(objVarObligatorias)



      } catch (error) {
        console.error(error.response)
      }
    }

    const buscarAmbientes = async ()=> {
      try{
        const response = await axiosCliente.get('sitio/listarsitio')
      
        const ambientesArray = response.data.resultadoSitio.map((item) => ({
          id: item.idAmbientes,
          valor: item.sit_nombre,
        }))

        setAmbientes(ambientesArray)

      }
      catch(error){
        console.error(error)
      }
    }

    buscarAmbientes()
    infoFichaTecnica()



  }, [idMaquina, reset])



  //funciones para cargar documentos.



  const cargarImagen = (event) =>{
    const imagen = event.target.files[0]
    if (imagen){
      const previewUrl = URL.createObjectURL(imagen)
      setPreviewImagen(previewUrl)
      setImagen(imagen)
      setEstadoImg(true)
    }
  }


  const cargarFicha = (event) =>{
    const ficha = event.target.files[0]
    if (ficha){
      setFicha(ficha)
    }
  }



  if (isLoading) {
    return <div>Cargando datos de la ficha técnica...</div>;
  }

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit(handleSubmitData)}>
        <div className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12 mx-auto">
          {/* Cabecera */}
          <div className="flex flex-row h-auto items-center">
            <figure className="flex-shrink-0 h-16 w-1/3 border flex justify-center items-center">
              <Image
                src="logoSenaNaranja.png"
                className="h-16 w-full object-contain"
                alt="logo-sena"
              />
            </figure>
            <div className="flex-grow text-center border px-4 h-16 w-1/3 flex items-center justify-center">
              {t('fichaTecnica')}
            </div>
            <div className="flex-shrink-0 w-1/3 h-16 border flex items-center">
              <p className="overflow-hidden overflow-ellipsis text-center">
                Centro de gestión y desarrollo sostenible surColombiano
              </p>
            </div>
          </div>

{/* contenido */}
          <div>
            <h3 className="w-full text-2xl pl-7 py-1 mt-12 text-white  mb-8 bg-green-600">
              {t('infoBasica')}
            </h3>
            <div className="flex flex-col lg:flex-row  w-full gap-11 px-4">
              <div className="w-full lg:w-1/2 ">
                <div className="grid grid-cols-2 gap-3">

                  <Controller
                    name="fi_placa_sena"
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('placaSena')}`}
                        tipo="text"
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      
                    )}
                  />

                  {/* Serial */}
                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar2.idDetalle}`}    /* se accese al objeto idVar2 por que este es el id de la variable serial en la BD */
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('serial')}`}
                        tipo={`${varObligatorias.idVar2.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      
                    )}
                  />

                  {/* precio */}
                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar9.idDetalle}`}    /* se accese al objeto idVar2 por que este es el id de la variable serial en la BD */
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('precio')}`}
                        tipo={`${varObligatorias.idVar9.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      
                    )}
                  />

                  {/* Marca */}
                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar7.idDetalle}`}   
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('marca')}`}
                        tipo={`${varObligatorias.idVar7.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      
                    )}
                  />

                  {/* Modelo */}
                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar8.idDetalle}`}   
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('modelo')}`}
                        tipo={`${varObligatorias.idVar8.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      
                    )}
                  />

                  {/* Fehca de adquisicion */}

                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar1.idDetalle}`}   
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('fechaAdquisi')}`}
                        tipo={`${varObligatorias.idVar1.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      
                    )}
                  />

                </div>
                


              </div>
              <div className="w-full lg:w-2/4">

                {
                  estadoImg ? (
                    <div className=" border-1 border-gray-300 flex items-center justify-center w-full h-[305px] mt-9 rounded-xl px-3 py-3">
                      <img
                        className="h-full w-full object-contain rounded-md"
                        alt=""
                        src={previewImagen}
                      />
                    </div>
                  ):(
                  <div  className=" border-1 border-gray-300 flex items-center justify-center w-full h-[305px] mt-9 rounded-xl px-3 py-3">

                    <img
                        className="h-full w-full object-contain rounded-md"
                        alt=""
                        src={`http://localhost:3000/imagenes/ficha/${infoFicha.fi_imagen}`}
                    />
                  </div>
                  )
                }
              
              </div>

            </div>

            <div className="flex flex-col md:flex-row w-full gap-11 mt-5">
              {/* contenedor para los select */}
              <div className="w-full md:w-1/2  py-4 pl-4  flex flex-col items-center gap-10 pt-7">
                  <div className="w-full ">
                    <SelectComponent
                        options={ambientes}
                        name="fi_fk_sitios"
                        placeholder={`${t('ambiente')}`}
                        valueKey="id"
                        textKey="valor"
                        register={register}
                        label={`${t('ambiente')}`}
                    />
                  </div>
                  <div className="w-full ">
                    <SelectComponent 
                      options={[
                        {
                          id: "operacion", 
                          value: `${t('operacion')}`
                        },
                        {
                          id: "fuera_de_servicio", 
                          value: `${t('fueraServicio')}`
                        },
                        {
                          id: "en_reparacion", 
                          value: `${t('reparasion')}`
                        }
                      ]}
                      name = "fi_estado"
                      placeholder={`${t('seleccionar_estado')}`}
                      valueKey="id"
                      textKey="value"
                      register={register}
                      label={`${t('estMaquina')}`}
                    />
                  </div>
                
              </div>

              {/* contenedor para los documentos */}
              <div className="w-full md:w-1/2  flex flex-col pr-4 py-4 items-center gap-7">
                <div className="border-l-8 border-l-green-600 pl-3 w-full">
                  <p className="mb-2 mt-2">{t('actImagen')}</p>
                  <input type="file" onChange={cargarImagen} className="appearance-none  w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500  " />
                </div>

                <div className="border-l-8 border-l-green-600 pl-3 w-full">
                  <p className="mb-2 mt-2" >{t('actFichaTecnica')}</p>
                  <input type="file" onChange={cargarFicha} className="appearance-none  w-full py-2 px-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500  "  />
                </div>
              </div>
            </div>

            <div className="w-full mt-12 px-4">
              <label className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium ">{t('descripEquipo')}</label>
              <div className="mt-3">
                <TextAreaComponent
                  errors={errors}
                  register={register}
                  name={`infoDetalles.${varObligatorias.idVar6.idDetalle}`}
                descripcion={`${t('descripEquipo')}`}
                />
              </div>
            </div>  

            {/* informacion de la garantia  */}

            <div className="w-full mt-12 px-4 pt-6  flex flex-col border-t-1 border-t-green-600">
              <div className="flex flex-row w-full">
                <div className="w-full sm:w-1/2 p-2">
                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar3.idDetalle}`}   
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('fechaInicioGaran')}`}
                        tipo={`${varObligatorias.idVar3.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />   
                    )}
                  />
                </div>
                <div className="w-full sm:w-1/2 p-2">
                  <Controller
                    name={`infoDetalles.${varObligatorias.idVar4.idDetalle}`}   
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label={`${t('fechaFinGarantia')}`}
                        tipo={`${varObligatorias.idVar4.var_tipoDato}`}
                        errors={errors}
                        isUpdating={true}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-full p-2 ">
              <label className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium ">{t('descripGarantia')}</label>
                <TextAreaComponent
                  errors={errors}
                  register={register}
                  name={`infoDetalles.${varObligatorias.idVar5.idDetalle}`}
                  descripcion={`${t('descripGarantia')}`}
                />
              </div>
            </div>

              {/* recorremos todas las variables de especificas */}              {/* especificas(otros) */}
            
              {
                varEspec.length >0? (                
                
                <div>
                  <h3 className="w-full text-2xl pl-7 py-1 mt-12 text-white  mb-8 bg-green-600">{t('carGenerales')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                    {
                      
                      varEspec.map((varEspec) =>(
                        <div key={varEspec.idDetalle}>
                          <Controller
                                name={`infoDetalles.${varEspec.idDetalle}`}
                                control={control}
                                render={({ field }) => (
                                  <InputUpdate
                                    {...field}
                                    label={`${varEspec.var_nombre}`}
                                    tipo={`${varEspec.var_tipoDato}`}
                                    errors={errors}
                                    isUpdating={true}
                                    value={field.value|| ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                  />
                                )}
                          />
                        </div>
                      ))
                    }
                    </div>
                </div>):(<></>)
              }


            {/* Especificaciones tecnicas */}
            {
            varEspTecnicas.length>0 ? (
              <div className="my-14">
                <h3 className="w-full text-2xl pl-7 py-1 mt-12 text-white  mb-8 bg-green-600" >{t('especTecnicas')}</h3>
                <div className="overflow-x-auto px-4">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left font-medium text-gray-700 w-1/4 border-b border-gray-300">{t('nombre')}</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700 border-b border-gray-300">{t('valor')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {varEspTecnicas.map((varEspTecnica ) => (
                        <tr key={varEspTecnica.idVariable} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b border-gray-300 w-1/4">{varEspTecnica.var_nombre}</td>
                          <td className="py-2 px-4 border-b border-gray-300">
                            <Controller
                              name={`infoDetalles.${varEspTecnica.idDetalle}`}
                              control={control}
                              render={({ field }) => (
                                <InputUpdate
                                  {...field}
                                  label={`${varEspTecnica.var_nombre}`}
                                  tipo={`${varEspTecnica.var_tipoDato}`}
                                  errors={errors}
                                  isUpdating={true}
                                  value={field.value|| ""}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              )}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ):(<></>)
            }

            {/* Secciones */}
            
            {
              <div className="border-t-4  border-t-green-600">
              {varSecciones.map((varSeccion)=>(
                <div className="overflow-x-auto my-14 px-4" key={varSeccion.idDetalle}>
                  <table className="min-w-full  ">
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 flex justify-between items-center border border-green-600 rounded-lg">
                          <span className="font-medium text-lg">{varSeccion.var_nombre}</span>
                          <span className="text-sm text-gray-500">{varSeccion.var_descripcion}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 ">
                          <TextAreaComponent
                            errors={errors}
                            register={register}
                            name={`infoDetalles.${varSeccion.idDetalle}`}
                            descripcion={`Descripcion ${varSeccion.var_nombre}`}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
              }
              </div>
            }
            
          </div>
          <ButtonNext text={`${t('actFichaTecnica')}`} type="submit" className={"bg-green-600 text-white w-full mt-8"}/>
        </div>
      </form>


    </>
  )
}
