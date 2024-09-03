//import InputForm from "../../atoms/Inputs/InputForm"
//import {TextAreaComponent} from "../../atoms/Inputs/TextArea"
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
//import { Icons } from "../../atoms/icons/Icons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react"
import { MdDelete } from "react-icons/md";
import { axiosCliente } from "../../../service/api/axios"
//import ButtonNext from "../../atoms/buttons/ButtonNext"
import { useNavigate } from 'react-router-dom'

import {
  InputForm,
  TextAreaComponent,
  Icons, 
  ButtonNext
} from "../../../index"


export const FormTipoFichaTecnica = () => {

  const { register, unregister, formState: { errors }, handleSubmit } = useForm()

  const navigate = useNavigate()


  //contenedores
  const [containersEsp, setContainers] = useState([])
  const [containersTecn, setContainersTecn] = useState([])
  const [containersSecc, setContainersSecc] = useState([])


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
        tipoFicha: data.nombreTipoFicha
      })

      //capturamos el id del tipo de ficha registrado

      let idTipoFicha = response.data.idTipoFicha

      //registramos las variables para ese tipo de ficha.
      //creamos el objeto para enviar al back end

      let contenidoVar = {
        variablesFicha:variablesFicha,
        tipoFicha:idTipoFicha
      }

      const responseVar = await axiosCliente.post("variable/registrarVars/", contenidoVar)

      navigate('/maquinas')

    } catch(error){
      console.error(error.response)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitData)} className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12 mx-auto p-5 mt-10">
        
        <InputForm
          errors={errors}
          register={register}
          tipo={"text"}
          name={"nombreTipoFicha"}
          text={"Nombre del tipo de ficha"}
        />

        {/* Variables de clase especifica */}
        <div className="bg-gray-50 p-5 rounded-xl mt-10 ">

          <h3 className="text-xl text-gray-800 mb-10 ">Agregar caracteristicas generales</h3>
            
          {containersEsp.map((container)  => (

            <div key={container.id} className="border p-4 mb-4 rounded-md flex flex-row items-center justify-around">

              <InputForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={`varEspecificas[${container.id}].var_nombre`} // se guarda de esta forma para que nos guarde cada informacion del contenedor en un objeto diferente y en una clave diferente 
                text={"Nombre"}
              />

              <input type="hidden" name={`varEspecificas[${container.id}].var_clase`} value="especifica" {...register(`varEspecificas[${container.id}].var_clase`)} />

              <input type="hidden" name={`varEspecificas[${container.id}].var_descripcion`} value="" {...register(`varEspecificas[${container.id}].var_descripcion`)} />
              

              <div className="flex flex-col">
                <label htmlFor="">Tipo de dato: </label>
                <div><input type="radio" name={`varEspecificas[${container.id}].var_tipoDato`} value="text"  {...register(`varEspecificas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> Texto</div>
                <div><input type="radio" name={`varEspecificas[${container.id}].var_tipoDato`} value="number"  {...register(`varEspecificas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> Numero</div>
                <div><input type="radio" name={`varEspecificas[${container.id}].var_tipoDato`} value="date"  {...register(`varEspecificas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> Fecha</div>
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

          <h3 className="text-xl text-gray-800 mb-10 ">Agregar especificaciones tecnicas</h3>
            
          {containersTecn.map((container)  => (
            <div key={container.id} className="border p-4 mb-4 rounded-md flex flex-row items-center justify-around">

              <InputForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={`varEspTecnicas[${container.id}].var_nombre`} // se guarda de esta forma para que nos guarde cada informacion del contenedor en un objeto diferente y en una clave diferente 
                text={"Nombre"}
              />
               
              <input type="hidden" name={`varEspTecnicas[${container.id}].var_clase`} value="especificacionesTecnicas" {...register(`varEspTecnicas[${container.id}].var_clase`)} />
              <input type="hidden" name={`varEspTecnicas[${container.id}].var_descripcion`} value="" {...register(`varEspTecnicas[${container.id}].var_descripcion`)} />
              
              <div className="flex flex-col">
                <label htmlFor="">Tipo de dato: </label>
                <div><input type="radio" name={`varEspTecnicas[${container.id}].var_tipoDato`} value="text"  {...register(`varEspTecnicas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> Texto</div>
                <div><input type="radio" name={`varEspTecnicas[${container.id}].var_tipoDato`} value="number"  {...register(`varEspTecnicas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> Numero</div>
                <div><input type="radio" name={`varEspTecnicas[${container.id}].var_tipoDato`} value="date"  {...register(`varEspTecnicas[${container.id}].var_tipoDato`, { required: "Seleccione un tipo de dato" })}  /> Fecha</div>
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

          <h3 className="text-xl text-gray-800 mb-10 ">Agregar secciones</h3>
            
          {containersSecc.map((container)  => (
            <div key={container.id} className="border p-4 mb-4 rounded-md flex flex-row items-center gap-4 justify-around">

              <InputForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={`varSeccion[${container.id}].var_nombre`} // se guarda de esta forma para que nos guarde cada informacion del contenedor en un objeto diferente y en una clave diferente 
                text={"Nombre"}
              />

              <input type="hidden" name={`varSeccion[${container.id}].var_clase`} value="seccion" {...register(`varSeccion[${container.id}].var_clase`)} />
              <input type="hidden" name={`varSeccion[${container.id}].var_tipoDato`} value="text" {...register(`varSeccion[${container.id}].var_tipoDato`)} />
              
              <div className="flex flex-col w-full">
                <label htmlFor="">Descipcion breve de la seccion:   </label>
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


        <ButtonNext text={"Registrar"}  type="submit" className={"bg-green-600 text-white w-full"}> </ButtonNext>

      </form>
    </>
  )
}
