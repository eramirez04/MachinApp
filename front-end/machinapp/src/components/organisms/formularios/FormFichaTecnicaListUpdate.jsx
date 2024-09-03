import { Image } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { axiosCliente } from "../../../service/api/axios"

import {InputUpdate} from "../../../index.js"
import { useForm , Controller } from "react-hook-form"



import { useTranslation } from "react-i18next";

export const  FormFichaTecnicaListUpdate = ({idMaquina})=> {

  const idFicha= idMaquina
  
  const { t } = useTranslation();
  const {
    control,
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm({ }) 


  //esto  para manejar cuando se hallan cargado los datos
  const [isLoading, setIsLoading] = useState(true)


  const[infoVarObli, setInfoVarOblig] = useState([])



  const handleSubmitData = async (data) => {
    console.log(data)
  }

  useEffect (()=>{
      const infoFichaTecnica = async ()=>{
          
          try{
              const  response = await axiosCliente.get(`ficha/listarUnica/${idFicha}`)
              
            //Informacion de la ficha 
              const ficha = response.data.infoFicha[0]
              setValue("placaSena", ficha.fi_placa_sena || "" )
              

            //informacion de las variables
              let variablesFicha = response.data.infoVar

              console.log(variablesFicha)

              //primero clasificamos las variables

              //las variables obligatorias es necesario acomodarlas, por lo que se acomodan en un Objeto
              let varObligatoriasArr = variablesFicha?.filter(item => item.var_clase == "obligatoria")

              const varObligatoriasObj = {}

              //recorre el array y crea objetos destro del objeto definido anteriormente, esto para no tener que recurrir al orden en que se encuentran en el array.

              for(let i =0; i<varObligatoriasArr.length; i++){

                const variableDet = varObligatoriasArr[i]   

                varObligatoriasObj[ `idDet${variableDet.idDetalle}`] = {
                  idVariable: variable.idVariable,
                  var_tipoDato: variable.var_tipoDato,
                  var_nombre: variable.var_nombre
                }
              }

              //actualizamos los valores de los inputs


              setIsLoading(false)
          
            } catch(error){
              console.error(error.response)
          }   
      }
      
      infoFichaTecnica()

                    
      //rellenar datos del formulario
     
      

  }, [idMaquina, reset])

  if (isLoading) {
    return <div>Cargando datos de la ficha tecnica...</div>;
  }
  return (
    <>
    <form className="mt-10"
    onSubmit={handleSubmit(handleSubmitData)} >
        <div  className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12  mx-auto ">
            
            {/* cabezera */}
            <div className="flex flex-row h-auto items-center">
              <figure className="flex-shrink-0 h-16 w-1/3 border flex justify-center items-center">
                <Image
                  src="logoSenaNaranja.png"
                  className="h-16 w-full object-contain"
                  alt="logo-sena"
                />
              </figure>
              <div className="flex-grow text-center border px-4 h-16 w-1/3 flex items-center justify-center">
                Ficha Tecnica
              </div>
              <div className="flex-shrink-0 w-1/3 h-16 border flex items-center">
                <p className="overflow-hidden overflow-ellipsis text-center">
                  Centro de gestion y desarrollo sostenible surColombiano
                </p>
              </div>
            </div>

            <div>
              <div className=" flex flex-col sm:flex-row mt-5 w-full "> {/* sm:h-96 */}

                <div className="w-full sm:w-2/4 p-2">
                  <h3 className="w-full text-gray-900 text-2xl pl-7 my-5" >Informacion Basica</h3>
                  <div className="grid grid-cols-2 gap-3 ">
                    
                  <Controller
                      name="placaSena"
                      control={control}
                      rules={{ required: "Correo es obligatorio" }}
                      render={({ field }) => (
                        <InputUpdate
                          {...field}
                          errors={errors}
                          label={t("Placa Sena")}
                          tipo="text"
                          isDisabled={false}
                          isUpdating={true}
                        />
                      )}
                  />

                  </div>
                </div>
              </div>
            </div>
        </div>
    </form>
    </>
  )
}
