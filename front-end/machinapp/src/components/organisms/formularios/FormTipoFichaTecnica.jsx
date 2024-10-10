//import InputForm from "../../atoms/Inputs/InputForm"
//import {TextAreaComponent} from "../../atoms/Inputs/TextArea"
import { useForm } from "react-hook-form";
import { Button, Select, SelectItem } from "@nextui-org/react";
//import { Icons } from "../../atoms/icons/Icons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react"
import { MdDelete } from "react-icons/md";
import { axiosCliente } from "../../../service/api/axios"
//import ButtonNext from "../../atoms/buttons/ButtonNext"
import { useNavigate } from 'react-router-dom'

import { useTranslation } from "react-i18next"

import {
  InputForm,
  TextAreaComponent,
  Icons, 
  ButtonNext
} from "../../../index"


export const FormTipoFichaTecnica = () => {

  const { t } = useTranslation()

  const { register, unregister, formState: { errors }, handleSubmit, reset } = useForm()

  const navigate = useNavigate()


  //contenedores
  const [containersEsp, setContainers] = useState([])
  const [containersTecn, setContainersTecn] = useState([])
  const [containersSecc, setContainersSecc] = useState([])

  // tomar el tipo de ficha, equipo o ambiente
  const [tipoFicha, settipoFicha] = useState("")


  // para los ids de los contenedores
  const [varAuxiliarEsp, setAuxiliarEsp] = useState(0) 
  const [varAuxiliarTecn, setAuxiliarTecn] = useState(0)
  const [varAuxiliarSecc, setAuxiliarEspSecc] = useState(0)

  //para contenedores de las variables tipo especificas
  const addContainerEsp = () => {
    setContainers([...containersEsp, { id: varAuxiliarEsp+1 }])
    setAuxiliarEsp(varAuxiliarEsp+1)
    
  }
  const removeContainerEsp = (id) => {
    unregister(`varEspecificas[${id}].var_nombre`)  // asi quitamos registro del input en el formulario a la ora de eliminar un contenedor
    unregister(`varEspecificas[${id}].var_tipoDato`)
    setContainers(containersEsp.filter(container => container.id !== id))
  }

  //para contenedores de las variables de especificaciones tecnicas
  const addContainerTecn = () => {
    setContainersTecn([...containersTecn, { id: varAuxiliarTecn + 1 }])
    setAuxiliarTecn(varAuxiliarTecn + 1 )
  }
  const removeContainerTecn = (id) => {
    unregister(`varEspTecnicas[${id}].var_nombre`)  // asi quitamos registro del input en el formulario a la ora de eliminar un contenedor
    unregister(`varEspTecnicas[${id}].var_tipoDato`)
    setContainersTecn(containersTecn.filter(container => container.id !== id))
  }

  //para contenedores de las variables de seccion
  const addContainerSecc = () => {
    setContainersSecc([...containersSecc, { id: varAuxiliarSecc + 1 }])
    setAuxiliarEspSecc(varAuxiliarSecc + 1 )
  }
  const removeContainerSecc = (id) => {
    unregister(`varSeccion[${id}].var_nombre`)  // asi quitamos registro del input en el formulario a la ora de eliminar un contenedor
    unregister(`varSeccion[${id}].var_tipoDato`)
    setContainersSecc(containersSecc.filter(container => container.id !== id))
  }




  //recuperar datos del formulario
  const handleSubmitData = async (data) => {

    /* console.table(data) */
    data.tipo_ficha = tipoFicha;
    console.log(data.tipo_ficha);
    console.log(data)


    // Filtrar las variables específicas, esto se hace par aque no me traiga arrais basios si hay, como nimino tiene que contener el nombre y el tipo de dato
    const varEspecificasFiltradas = data.varEspecificas?.filter(item => item.var_nombre && item.var_tipoDato)
    
    // Filtrar las variables de especificaciones técnicas
    const varEspTecnicasFiltradas = data.varEspTecnicas?.filter(item => item.var_nombre && item.var_tipoDato)
    
    // Filtrar las variables de secciones
    const varSeccionFiltradas = data.varSeccion?.filter(item => item.var_nombre && item.var_tipoDato)

      

    //creamos un array que contenga la info de todas las variables. 
    let variablesFicha = []

    if(varEspecificasFiltradas !== undefined){
      variablesFicha = [ ...variablesFicha, ...varEspecificasFiltradas]
    }
    if(varEspTecnicasFiltradas !== undefined ){
      variablesFicha = [...variablesFicha, ...varEspTecnicasFiltradas]
    }
    if(varSeccionFiltradas !== undefined){
      variablesFicha = [...variablesFicha, ...varSeccionFiltradas]
    }
    

    //registramos el tipo de equipo primero. 

    try{

      //registramos el tipo de ficha
      const response = await axiosCliente.post("tipoFicha/registrar",{
        tipoFicha: data.nombreTipoFicha,
        tipo_ficha: data.tipo_ficha
      })

      //capturamos el id del tipo de ficha registrado

      let idTipoFicha = response.data.idTipoFicha

      //registramos las variables para ese tipo de ficha.
      //creamos el objeto para enviar al back end

      let contenidoVar = {
        variablesFicha:variablesFicha,
        tipoFicha:idTipoFicha,
        ficha: data.tipo_ficha
      }

      const responseVar = await axiosCliente.post("variable/registrarVars/", contenidoVar)

      navigate('/maquinas')

    } catch(error){
      console.error(error.response)
    }
  }


  
  const handleSelectionChange = (value) => {
    
   settipoFicha(value.target.value);
   console.log( value.target.value)
   reset(register())
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitData)} className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12 mx-auto p-5 mt-10">
        
       <div className="flex flex-row justify-between items-center"> 
        <InputForm
          errors={errors}
          register={register}
          tipo={"text"}
          name={"nombreTipoFicha"}
          text={t("nombreTipoFicha")}
        />
        <div className="w-52">
        <Select
          value={tipoFicha}
          aria-label="Seleccionar idioma"
          label={t('registElemento')}
          onChange={handleSelectionChange}
          variant="bordered"
          color="primary"
          size="md"
         
        >
          <SelectItem key="equipo" value="equipo">
            {t('equipoMa')}
          </SelectItem>
          <SelectItem key="ambiente" value="ambiente">
            {t('ambienteFor')}
          </SelectItem>
        </Select>

        </div>
        </div>

        {/* Variables de clase especifica */}
     {tipoFicha && (<>
     
         <div className="bg-gray-50 p-5 rounded-xl mt-10 ">

          <h3 className="text-xl text-gray-800 mb-10 ">
            { tipoFicha === "equipo" ?t('agregarCaractGene') : "Dimensiones y Características Físicas" }
          </h3>
            
          {containersEsp.map((container)  => (

            <div key={container.id} className="border p-4 mb-4 rounded-md flex flex-row items-center justify-around">

              <InputForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={`varEspecificas[${container.id}].var_nombre`} // se guarda de esta forma para que nos guarde cada informacion del contenedor en un objeto diferente y en una clave diferente 
                text={t("nombreMa")}
              />

              <input type="hidden" name={`varEspecificas[${container.id}].var_clase`} value="especifica" {...register(`varEspecificas[${container.id}].var_clase`)} />

              <input type="hidden" name={`varEspecificas[${container.id}].var_descripcion`} value="" {...register(`varEspecificas[${container.id}].var_descripcion`)} />
              

              <div className="flex flex-col">
                <label htmlFor="">{t("tipoDato")} : </label>
                <div><input type="radio" name={`varEspecificas[${container.id}].var_tipoDato`} value="text"  {...register(`varEspecificas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> {t('texto')}</div>
                <div><input type="radio" name={`varEspecificas[${container.id}].var_tipoDato`} value="number"  {...register(`varEspecificas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> {t('numero')}</div>
                <div><input type="radio" name={`varEspecificas[${container.id}].var_tipoDato`} value="date"  {...register(`varEspecificas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  />{t('fecha')} </div>
                {errors.varEspecificas && errors.varEspecificas[container.id]?.var_tipoDato && (
                    <p className="text-red-600 text-sm mt-2">{errors.varEspecificas[container.id].var_tipoDato.message}</p>
                )}
              </div>

              <Button
                onClick={() => removeContainerEsp(container.id)}
                type="button"
                variant="solid"
                className="bg-red-600 text-white w-10 "
              >
                <Icons icon={MdDelete} />
              </Button>
            </div>
          ))}
          <Button 
            onClick={addContainerEsp}                 
            type="button"
            color="success"
            variant="ghost"
          >
            <Icons  icon={PlusIcon} />
          </Button>
        </div> 

        {/* variables de de clase Especificaiones tecnicas */}

        <div className="bg-gray-50 p-5 rounded-xl my-10 ">

          <h3 className="text-xl text-gray-800 mb-10 "> 
          { tipoFicha === "equipo" ?t('agregarEspeTec') : "ACABADOS DEL AMBIENTE DE FORMACIÓN" }
          </h3>
            
          {containersTecn.map((container)  => (
            <div key={container.id} className="border p-4 mb-4 rounded-md flex flex-row items-center justify-around">

              <InputForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={`varEspTecnicas[${container.id}].var_nombre`} // se guarda de esta forma para que nos guarde cada informacion del contenedor en un objeto diferente y en una clave diferente 
                text={t('nombreMa')}
              />
               
              <input type="hidden" name={`varEspTecnicas[${container.id}].var_clase`} value="especificacionesTecnicas" {...register(`varEspTecnicas[${container.id}].var_clase`)} />
              <input type="hidden" name={`varEspTecnicas[${container.id}].var_descripcion`} value="" {...register(`varEspTecnicas[${container.id}].var_descripcion`)} />
              
              <div className="flex flex-col">
                <label htmlFor=""> {t('tipoDato')}</label>
                <div><input type="radio" name={`varEspTecnicas[${container.id}].var_tipoDato`} value="text"  {...register(`varEspTecnicas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> {t('texto')}</div>
                <div><input type="radio" name={`varEspTecnicas[${container.id}].var_tipoDato`} value="number"  {...register(`varEspTecnicas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> {t('numero')}</div>
                <div><input type="radio" name={`varEspTecnicas[${container.id}].var_tipoDato`} value="date"  {...register(`varEspTecnicas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> {t('fecha')}</div>
                {errors.varEspTecnicas && errors.varEspTecnicas[container.id]?.var_tipoDato && (
                    <p className="text-red-600 text-sm mt-2">{errors.varEspTecnicas[container.id].var_tipoDato.message}</p>
                )}

              </div>

              <Button
                onClick={() => removeContainerTecn(container.id)}
                type="button"
                variant="solid"
                className="bg-red-600 text-white w-10 "
              >
                <Icons icon={MdDelete} />
              </Button>
            </div>
          ))}
          <Button 
            onClick={addContainerTecn}                 
            type="button"
            color="success"
            variant="ghost"
          >
            <Icons  icon={PlusIcon} />
          </Button>
        </div> 




        {/* variables de de clase seccion*/}

        <div className="bg-gray-50 p-5 rounded-xl my-10 ">

          <h3 className="text-xl text-gray-800 mb-10 ">{t('agregarSeccion')}</h3>
            
          {containersSecc.map((container)  => (
            <div key={container.id} className="border p-4 mb-4 rounded-md flex flex-row items-center gap-4 justify-around">

              <InputForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={`varSeccion[${container.id}].var_nombre`} // se guarda de esta forma para que nos guarde cada informacion del contenedor en un objeto diferente y en una clave diferente 
                text={`${t('nombreMa')}`}
              />

              <input type="hidden" name={`varSeccion[${container.id}].var_clase`} value="seccion" {...register(`varSeccion[${container.id}].var_clase`)} />
              <input type="hidden" name={`varSeccion[${container.id}].var_tipoDato`} value="text" {...register(`varSeccion[${container.id}].var_tipoDato`)} />
              
              <div className="flex flex-col w-full">
                <label htmlFor="">{t('descripcionSeccion')}  </label>
                <TextAreaComponent
                  errors={errors}
                  register={register}
                  name={`varSeccion[${container.id}].var_descripcion`}
                />
              </div>
            
              <Button
                onClick={() => removeContainerSecc(container.id)}
                type="button"
                variant="solid"
                className="bg-red-600 text-white w-10 "
              >
                <Icons icon={MdDelete} />
              </Button>
            </div>
          ))}
          <Button 
            onClick={ addContainerSecc}                 
            type="button"
            color="success"
            variant="ghost"
          >
            <Icons  icon={PlusIcon} />
          </Button>
        </div> 

     </>)}

        <ButtonNext text={t('registrar')}  type="submit" className={"bg-green-600 text-white w-full"}> </ButtonNext>

      </form>
    </>
  )
}
