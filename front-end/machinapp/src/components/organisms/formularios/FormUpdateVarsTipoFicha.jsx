import { useState, useEffect } from "react";
import { useForm,  Controller} from "react-hook-form";
import { toast } from "react-toastify"
import {
    axiosCliente,
    SelectComponent,
    InputUpdate,
    ButtonNext,
    TextAreaComponent
} from "../../../index.js"
import { useTranslation } from "react-i18next"
import { MdNavigateNext } from "react-icons/md"


import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter , Switch, Button } from '@nextui-org/react'

import { useNavigate } from 'react-router-dom'



// eslint-disable-next-line react/prop-types
export const FormUpdateVarsTipoFicha = ({ tipo_ficha })=>{


    /* modal de confirmacion */
    const [isOpen, setIsOpen] = useState(false);
    const [currentVarId, setCurrentVarId] = useState(null);
    const [newStateValue, setNewStateValue] = useState(null);


    const { t } = useTranslation()
    const {
        control,
        register,
        reset,
        getValues,
        setValue,
        formState: { errors },
        handleSubmit
    } = useForm();

    const [tipoEquipo, setTipoEquipo] = useState([]);


    //arrais de las variables
    const [varObligatorias, setVarObligatorias] = useState({})
    const [varEspTecnicas, setVarEspTecnicas] = useState([])
    const [varSecciones, setVarSecciones] = useState([])
    const [varEspecificas, setVarEspecificas] = useState([])


    //funcion para mostrar el formulario
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const fechtData = async () => {
        try {
            const [tipoMaquinaRes] = await Promise.all([
            axiosCliente.get(`tipoFicha/listar/${tipo_ficha}`),
            ])

            const tipoEquipoArray = tipoMaquinaRes.data.map((item) => ({
            id: item.idTipo_ficha,
            valor: item.ti_fi_nombre,
            tipo: item.tipo_ficha,
            }))

            setTipoEquipo(tipoEquipoArray)
        } catch (error) {
            console.error(error.response)
        }
        }

        fechtData()
    }, [tipo_ficha])


    /* Formulario con la info */
    const handleSubmitData = async (data) => {

    
        //convetimos los datos que tenemos en el formulario a un array de objetos

        const infoArray = Object.entries(data).map(([ key,value]) => ({
            id: key,
            ...value, // el resto de los valores del objeto
        }))

        //array que va a contenedr los objetos 
        const varsUpdate = []

        for(let i = 0; i < infoArray.length - 1 ; i++){
            const itemObj = {
                idVariable: infoArray[i]?.idVariable,
                var_nombre:infoArray[i]?.var_nombre,
                var_descripcion: infoArray[i]?.var_descripcion,
                var_estado: infoArray[i]?.var_estado
            }
            varsUpdate.push(itemObj)
        }

        try{
            await axiosCliente.put('variable/actualizarVars', {varsUpdate})
            navigate(`/Maquinas`)

        }catch(error){
            console.log(error)
        }
        

    }

    /* Funcion para traer la informacion*/
    const tipoFicha = async ()=>{
        let idTipoFicha = getValues("tipo_equipo") //traemos solo el valor del input con ese nombre

        // tomamos el tipo de ficha, si es un ambiente o un elemento, esto para solo traer las variables de esa ficha
        let tipo = tipoEquipo.filter((equipo) => equipo.id == idTipoFicha);

        if (idTipoFicha != "") {
            try{
                const response = await axiosCliente.get(
                `variable/listarVariablesAll/${idTipoFicha}/${tipo[0].tipo}`
                )

                let variables = response.data.respuesta

                /* Lo que acemos aca es organizar los datos en un objeto para que el formulario nos aparesca ya con datos por medio del reset */
                
                let objVarForm = {}

                for (let i = 0; i < variables.length; i++) {
                    const item = variables[i]
                    objVarForm[`var_${item.idVariable}`] =  item
                    
                }

                reset(objVarForm)



                //Separamos las variables en diferentes arrais dependiendo de la clase.
                setVarEspTecnicas(
                    variables?.filter((item) => item.var_clase == "especificacionesTecnicas")
                );
                setVarSecciones(
                    variables?.filter((item) => item.var_clase == "seccion")
                );
               
                setVarEspecificas(
                    variables?.filter((item) => item.var_clase == "especifica")
                );
        
                //para las que son obligatorias como se muestran los inpust ya creados, entonces creamos un objeto con estas variables
                let varObligatoriasArr = variables?.filter(
                    (item) => item.var_clase == "obligatoria"
                )

                if (varObligatoriasArr.length >0 ){
                    const varObligatoriasObj = {}

                     //recorre el array y crea objetos destro del objeto definido anteriormente, esto para no tener que recurrir al orden en que se encuentran en el array.

                    for (let i = 0; i < varObligatoriasArr.length; i++) {
                        const variable = varObligatoriasArr[i];

                        varObligatoriasObj[`idVar${variable.idVariable}`] = {
                        idVariable: variable.idVariable,
                        var_tipoDato: variable.var_tipoDato,
                        var_nombre: variable.var_nombre,
                        }
                    }

                    setVarObligatorias(varObligatoriasObj)                    
                    setMostrarFormulario(true)
                }

                setMostrarFormulario(true)

            }catch(error){
                console.error(error.response);
            }
        }else {
            toast.warning("Seleccione un tipo de ficha");
        }

    }


    /* funciones para el modal */

    const handleStateChange = (varId, newValue) => {
        setCurrentVarId(varId);
        setNewStateValue(newValue);
        setIsOpen(true);
    };

    const confirmStateChange = () => {
        if (currentVarId && newStateValue !== null) {
            // Actualizar el estado del formulario
            setValue(`var_${currentVarId}.var_estado`, newStateValue);
        }
        setIsOpen(false);
    };

    return(
        <>
        <form className="mt-10" onSubmit={handleSubmit(handleSubmitData)}>
        <div className="flex flex-row items-center justify-around mb-20 border-b-2 border-b-green-600 pb-10">
          <label className="flex flex-row items-center gap-4 ">
            {" "}
            {t('selectTipoFichaAct')}
            <SelectComponent
              options={tipoEquipo}
              name="tipo_equipo"
              placeholder={t('seleccioneOpcion')}
              valueKey="id"
              textKey="valor"
              register={register}
            />
          </label>

          <Button onClick={tipoFicha} className="bg-green-600 text-white">
            {t('siguiente')} <MdNavigateNext />
          </Button>
        </div>
        {mostrarFormulario && (<>
            <div>
                
            <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                {t('varGenerales')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-9">
                {
                    
                    varEspecificas.map((varEspec) => (
                        <div
                        key={varEspec.idVariable}
                        className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
                      >
                        {/* Nombre variable */}
                        <div className="mb-4">
                          <Controller
                            name={`var_${varEspec.idVariable}.var_nombre`}
                            control={control}
                            render={({ field }) => (
                              <InputUpdate
                                {...field}
                                label={`${t('nombre')}`}
                                tipo={`text`}
                                errors={errors}
                                isUpdating={true}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}
                          />
                        </div>
                    
                        {/* Estado variable */}
                        <div className="flex items-center space-x-2">
                          <Controller
                            name={`var_${varEspec.idVariable}.var_estado`}
                            control={control}
                            render={({ field }) => {
                            
                              return (
                                <>
                                  <label className="font-medium text-gray-700">{t('estado')}:</label>
                                  <Switch
                                    isSelected={field.value === "activo"}
                                    onValueChange={(isSelected) => {
                                      const newValue = isSelected ? "activo" : "inactivo";
                                      handleStateChange(varEspec.idVariable, newValue);
                                    }}
                                  />
                                  <span
                                    className={`ml-2 ${
                                      field.value === "activo"
                                        ? "text-green-600 font-semibold"
                                        : "text-red-600 font-semibold"
                                    }`}
                                  >
                                    {field.value}
                                  </span>
                                </>
                              );
                            }}
                          />
                        </div>
                      </div>

                        
                    ))
                }
            </div>


            <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                {t('especTecnicas')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-9">
            {
                    
                varEspTecnicas.map((varTec) => (
                    <div
                    key={varTec.idVariable}
                    className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
                  >
                    {/* Nombre variable */}
                    <div className="mb-4">
                      <Controller
                        name={`var_${varTec.idVariable}.var_nombre`}
                        control={control}
                        render={({ field }) => (
                          <InputUpdate
                            {...field}
                            label={`${t('nombre')}`}
                            tipo={`text`}
                            errors={errors}
                            isUpdating={true}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        )}
                      />
                    </div>
                
                    {/* Estado variable */}
                    <div className="flex items-center space-x-2">
                      <Controller
                        name={`var_${varTec.idVariable}.var_estado`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <>
                              <label className="font-medium text-gray-700">{t('estado')}:</label>
                              <Switch
                                isSelected={field.value === "activo"}
                                onValueChange={(isSelected) => {
                                  const newValue = isSelected ? "activo" : "inactivo";
                                  handleStateChange(varTec.idVariable, newValue);
                                }}
                              />
                              <span
                                className={`ml-2 ${
                                  field.value === "activo"
                                    ? "text-green-600 font-semibold"
                                    : "text-red-600 font-semibold"
                                }`}
                              >
                                {field.value}
                              </span>
                            </>
                          );
                        }}
                      />
                    </div>
                  </div>
                    
                ))
            }

            </div>


            {/* Para las variables de seccion */}
            <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                {t('secciones')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-9">
                {
                    
                    varSecciones.map((varSeccion) => (
                    <div
                        key={varSeccion.idVariable}
                        className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
                      >
                        {/* Nombre variable */}
                        <div className="mb-4">
                          <Controller
                            name={`var_${varSeccion.idVariable}.var_nombre`}
                            control={control}
                            render={({ field }) => (
                              <InputUpdate
                                {...field}
                                label={`${t('nombre')}`}
                                tipo={`text`}
                                errors={errors}
                                isUpdating={true}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}
                          />
                        </div>
                    
                        {/* Estado variable */}
                        <div className="flex items-center space-x-2">
                          <Controller
                            name={`var_${varSeccion.idVariable}.var_estado`}
                            control={control}
                            render={({ field }) => {
                              
                              return (
                                <>
                                  <label className="font-medium text-gray-700">{t('estado')}:</label>
                                  <Switch
                                    isSelected={field.value === "activo"}
                                    onValueChange={(isSelected) => {
                                      const newValue = isSelected ? "activo" : "inactivo";
                                      handleStateChange(varSeccion.idVariable, newValue);
                                    }}
                                  />
                                  <span
                                    className={`ml-2 ${
                                      field.value === "activo"
                                        ? "text-green-600 font-semibold"
                                        : "text-red-600 font-semibold"
                                    }`}
                                  >
                                    {field.value}
                                  </span>
                                </>
                              );
                            }}
                          />
                        </div>

                        <div className="mt-5">

                            <label className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium "> {t('descripcion')}</label>
                            <div className="mt-3">
                                <TextAreaComponent
                                errors={errors}
                                register={register}
                                name={`var_${varSeccion.idVariable}.var_descripcion`}
                                descripcion={``}
                                max={1000}
                                />
                            </div>
                        </div>

                    </div>   
                ))
                }
            </div>

            
                <ButtonNext text={`${t('actFichaTecnica')}`}  type="submit" className={"bg-green-600 text-white w-full mt-8"}/>
            </div>
        </>)}
        </form>

        {/* Modal para la confirmacion de actualizacion del estado */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    <ModalHeader>{t('confirmCamEstado')}</ModalHeader>
                    <ModalBody>
                        {t('mensajeConfirm')}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                            {t('cerrar')}
                        </Button>
                        <Button color="primary" onPress={confirmStateChange}>
                            {t('aceptar')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

