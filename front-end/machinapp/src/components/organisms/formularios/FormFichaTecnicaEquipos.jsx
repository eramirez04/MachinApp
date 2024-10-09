import { useGlobalData, axiosCliente } from "../../../index.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { toast } from "react-toastify";

import { multiFormData } from "../../../utils/formData.js";
// -> multiFormData => para poder enviar archivos como imagenes al sevidor

// componentes
import {
  InputForm,
  TextAreaComponent,
  ButtonNext,
  SelectComponent,
} from "../../../index.js";

export const FormFichaTecnica = ({ tipo_ficha }) => {
  const navigate = useNavigate();

  const { refreshEquipos, ambientes } = useGlobalData();

  //select
  const [ambientesFormacion, setAmbientes] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([]);

  //funcion para mostrar el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  //arrais de las variables
  const [varObligatorias, setVarObligatorias] = useState({});
  const [varEspTecnicas, setVarEspTecnicas] = useState([]);
  const [varSecciones, setVarSecciones] = useState([]);
  const [varEspecificas, setVarEspecificas] = useState([]);

  // abrir el formulario en caso de que sea un formulario para un equipo o maquina
  const [isEquipo, setIsEquipo] = useState(false);

  // previsua// hookslizar una imagen
  const [previewImagen, setPreviewImagen] = useState(null);

  //documentos
  const [imagen, setImagen] = useState(null);
  const [fichaRespaldo, setFicha] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  //const navigate = useNavigate()

  // poder enviar los datos al servidor por metodo POST
  const handleSubmitData = async (data) => {
    //data.variables trae el fk de la variable en el name del input, y el valor es el valor del detalle

    const transformedArray = Object.entries(data.variables).map(
      ([key, value]) => ({
        //asi ordenamos los datos y contruimos un array de objetos
        detFkVariable: key, // Incluye la fk de la variable
        detValor: value, // Incluye el valor
      })
    );

    console.log(transformedArray);

    //objeto para registrar la ficha con los datos fijos del formulario
    const dataFicha = {
      fk_tipo_ficha: data.tipo_equipo,
      fiImagen: imagen,
      fk_sitio: data.ambiente,
      fiEstado: "operacion",
      fiTecnica: fichaRespaldo,
      placaSena: data.placaSena,
    };

    try {
      //registramos la ficha tecnica
      const response = await multiFormData(
        "http://localhost:3000/ficha/registrar",
        dataFicha,
        "POST"
      )

      const idFicha = response.data.id;

      //objeto para registrar todas las variables del formulario
      const dataVariables = {
        idFicha: idFicha,
        detalles: transformedArray,
      };

      //empezamos a registrar las variables
      const responseDet = await axiosCliente.post(
        "detalle/registrarDetalles",
        dataVariables
      );
      await refreshEquipos();
      navigate(`/infoMaquina/${idFicha}`);
    } catch (error) {
      console.log(error.response)
      alert(error.response?.data.mensaje);
    }
  };

  // tomar la imagen del input file, para poder visualizarla y enviarla al back-end
  const handleFileUpload = (event) => {
    const archivo = event.target.files[0];

    if (archivo) {
      const previewUrl = URL.createObjectURL(archivo);
      setPreviewImagen(previewUrl);
      setImagen(archivo);
    } else {
      setPreviewImagen(null);
    }
  };

  //cargar ficha tecnica de respaldo
  const cargardocumento = (event) => {
    setFicha(event.target.files[0]);
  };

  useEffect(() => {
    const fechtData = async () => {
      try {
        const [tipoMaquinaRes] = await Promise.all([
          axiosCliente.get(`tipoFicha/listar/${tipo_ficha}`),
        ]);

        const ambientesArray = ambientes.map((item) => ({
          id: item.idAmbientes,
          valor: item.sit_nombre,
        }));

        const tipoEquipoArray = tipoMaquinaRes.data.map((item) => ({
          id: item.idTipo_ficha,
          valor: item.ti_fi_nombre,
          tipo: item.tipo_ficha,
        }));

        setAmbientes(ambientesArray);
        setTipoEquipo(tipoEquipoArray);
      } catch (error) {
        console.error(error.response);
      }
    };
    fechtData();
  }, [tipo_ficha, ambientes]);

  const tipoFicha = async () => {
    let idTipoFicha = getValues("tipo_equipo"); //traemos solo el valor del input con ese nombre

    // tomamos el tipo de ficha, si es un ambiente o un elemento, esto para solo traer las variables de esa ficha
    let tipo = tipoEquipo.filter((equipo) => equipo.id == idTipoFicha);

    if (idTipoFicha != "") {
      try {
        const response = await axiosCliente.get(
          `variable/listarVars/${idTipoFicha}/${tipo[0].tipo}`
        );

        //traemos todas las variables de ese tipo de ficha
        let variables = response.data.respuesta;

        //Separamos las variables en diferentes arrais dependiendo de la clase.
        setVarEspTecnicas(
          variables?.filter(
            (item) => item.var_clase == "especificacionesTecnicas"
          )
        );
        setVarSecciones(
          variables?.filter((item) => item.var_clase == "seccion")
        );
        console.log(variables?.filter((item) => item.var_clase == "seccion"))
        setVarEspecificas(
          variables?.filter((item) => item.var_clase == "especifica")
        );

        //para las que son obligatorias como se muestran los inpust ya creados, entonces creamos un objeto con estas variables

        let varObligatoriasArr = variables?.filter(
          (item) => item.var_clase == "obligatoria"
        );

        // se muestra el formulario para variables de maquinas y elementos
        if (varObligatoriasArr.length > 0) {
          console.log(varObligatoriasArr);

          const varObligatoriasObj = {};

          //recorre el array y crea objetos destro del objeto definido anteriormente, esto para no tener que recurrir al orden en que se encuentran en el array.

          for (let i = 0; i < varObligatoriasArr.length; i++) {
            const variable = varObligatoriasArr[i];

            varObligatoriasObj[`idVar${variable.idVariable}`] = {
              idVariable: variable.idVariable,
              var_tipoDato: variable.var_tipoDato,
              var_nombre: variable.var_nombre,
            };
          }

          setVarObligatorias(varObligatoriasObj);
          setIsEquipo(true);
          setMostrarFormulario(true);
        }
        // se muestra el formulario, pero solo con las variables para formularios de ambientes
        setMostrarFormulario(true);
      } catch (error) {
        console.error(error.response);
      }
    } else {
      toast.warning("Seleccione un tipo de ficha");
    }
  };

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit(handleSubmitData)}>
        <div className="flex flex-row items-center justify-around mb-20 border-b-2 border-b-green-600 pb-10">
          <label className="flex flex-row items-center gap-4 ">
            {" "}
            Seleccionar un tipo de ficha
            <SelectComponent
              options={tipoEquipo}
              name="tipo_equipo"
              placeholder="Seleccione una opcion"
              valueKey="id"
              textKey="valor"
              register={register}
            />
          </label>

          <Button onClick={tipoFicha} className="bg-green-600 text-white">
            Siguiente <MdNavigateNext />
          </Button>
        </div>
        {mostrarFormulario && (
          <div className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12  mx-auto ">
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

            {/* Contenido */}
            <div>
              <h3 className="w-full  text-2xl pl-7 my-5 bg-green-600 text-white py-1 ">
                Informacion Basica
              </h3>
              <div className=" flex flex-col sm:flex-row mt-5 w-full gap-4 ">
                {" "}
                {/* sm:h-96 */}
                <div className="w-full sm:w-2/4 p-2">
                  <div className="grid grid-cols-2 gap-3 ">
                    {isEquipo && (
                      <>
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={"text"}
                          name={"placaSena"}
                          text={"Placa SENA "}
                        />

                        {/* serial */}
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={`${varObligatorias.idVar2.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                          name={`variables.${varObligatorias.idVar2.idVariable}`}
                          text={`${varObligatorias.idVar2.var_nombre}`}
                        />

                        {/* precio */}
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={`${varObligatorias.idVar9.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                          name={`variables.${varObligatorias.idVar9.idVariable}`}
                          text={`${varObligatorias.idVar9.var_nombre}`}
                        />

                        {/* Marca */}
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={`${varObligatorias.idVar7.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                          name={`variables.${varObligatorias.idVar7.idVariable}`}
                          text={`${varObligatorias.idVar7.var_nombre}`}
                        />

                        {/* Modelo */}
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={`${varObligatorias.idVar8.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                          name={`variables.${varObligatorias.idVar8.idVariable}`}
                          text={`${varObligatorias.idVar8.var_nombre}`}
                        />

                        {/* fecha adquicicion */}
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={`${varObligatorias.idVar1.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                          name={`variables.${varObligatorias.idVar1.idVariable}`} //le ponemos variables para que nos agrupe toda la informacion de los input en ese espacio del formulario
                          text={`${varObligatorias.idVar1.var_nombre}`}
                        />
                      </>
                    )}
                  </div>
                  <div className="w-full mt-[18px]">
                    <SelectComponent
                      options={ambientesFormacion}
                      name="ambiente"
                      placeholder="Ambiente"
                      valueKey="id"
                      textKey="valor"
                      register={register}
                      label="Ambiente"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-2/4 p-2 ">
                  <div className=" border-1 border-gray-300 flex items-center justify-center w-full h-[280px] mt-6 rounded-xl px-3 py-3">
                    {
                      previewImagen == null? (<></>):(
                        <img
                        className="h-full w-full object-contain rounded-md"
                        alt=""
                        src={previewImagen}
                      />
                      )
                    }

                  </div>

                  <div className=" mt-9 ">
                    <p className="text-gray-700 mb-1">Subir imagen (opcional)</p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="appearance-none w-full py-2 px-4  rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {isEquipo && (
                <div className="w-full mt-12">
                  <label className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium "> Descripcion del equipo</label>
                  <div className="mt-3">
                    <TextAreaComponent
                      errors={errors}
                      register={register}
                      name={`variables.${varObligatorias.idVar6.idVariable}`}
                      descripcion={"Descripcion general del equipo"}
                    />
                  </div>
                </div> 
              )}


              {/* GARANTIA NEW */}
              {isEquipo && (
                <div>
                  <div className="w-full mt-12  pt-6  flex flex-col border-t-1 border-t-green-600">
                    <div className="flex flex-row w-full">
                      <div className="w-full sm:w-1/2 p-2">
                          <InputForm
                              errors={errors}
                              register={register}
                              tipo={`${varObligatorias.idVar3.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                              name={`variables.${varObligatorias.idVar3.idVariable}`} //le ponemos variables para que nos agrupe toda la informacion de los input en ese espacio del formulario
                              text={`${varObligatorias.idVar3.var_nombre}`}
                          />
                      </div>
                      <div className="w-full sm:w-1/2 p-2">
                      <InputForm
                              errors={errors}
                              register={register}
                              tipo={`${varObligatorias.idVar4.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                              name={`variables.${varObligatorias.idVar4.idVariable}`} //le ponemos variables para que nos agrupe toda la informacion de los input en ese espacio del formulario
                              text={`${varObligatorias.idVar4.var_nombre}`}
                            />
                      </div>
                    </div>
                    <div className="w-full p-2 ">
                    <label className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium "> Descripcion garantia</label>
                    <TextAreaComponent
                            errors={errors}
                            register={register}
                            name={`variables.${varObligatorias.idVar5.idVariable}`}
                            descripcion={"Descripcion de la garantia"}
                          />
                    </div>
                  </div>

                  <div className="flex items-center justify-center flex-row gap-4 p-4 border-b-1 border-t-1 border-b-green-600  border-t-green-600 rounded-lg  my-14">
                    <label className="text-gray-700 ">
                      Subir ficha técnica de respaldo (opcional):
                    </label>
                    <input
                      type="file"
                      onChange={cargardocumento}
                      className="appearance-none py-1 px-4 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}



              {/* recorremos todas las variables de especificas */}{" "}

              {
                varEspecificas.length > 0 ?(                
                
                <div>
                  <h3 className="w-full text-2xl pl-7 py-1 mt-12 text-white  mb-8 bg-green-600">Caracteristicas Generales.</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                    {varEspecificas.map((varEspec) => (
                      <div key={varEspec.idVariable}>
                        <InputForm
                          errors={errors}
                          register={register}
                          tipo={`${varEspec.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                          name={`variables.${varEspec.idVariable}`} //le ponemos variables para que nos agrupe toda la informacion de los input en ese espacio del formulario
                          text={`${varEspec.var_nombre}`}
                        />
                      </div>
                    ))}
                    </div>
                </div>):(<></>)
              }


              {/* Especificaciones tecnicas */}

              {varEspTecnicas.length > 0 ? (
              <div className="my-14">
              <h3 className="w-full text-2xl pl-7 py-1 mt-12 text-white  mb-8 bg-green-600" >Especificaciones tecnicas</h3>
              <div className="overflow-x-auto px-4">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left font-medium text-gray-700 w-1/4 border-b border-gray-300">Nombre</th>
                      <th className="py-2 px-4 text-left font-medium text-gray-700 border-b border-gray-300">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    varEspTecnicas.map((varEspTecnica) => (
                      <tr
                        key={varEspTecnica.idVariable}
                        className="hover:bg-gray-50"
                      >
                        <td className="py-2 px-4 border-b border-gray-300 w-1/4">
                          {varEspTecnica.var_nombre}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          <InputForm
                            errors={errors}
                            register={register}
                            tipo={`${varEspTecnica.var_tipoDato}`} // aca accedemos al objeto del que queremos traer la informacion
                            name={`variables.${varEspTecnica.idVariable}`} //le ponemos variables para que nos agrupe toda la informacion de los input en ese espacio del formulario
                            text={`${varEspTecnica.var_nombre}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
              ) : (
                <></>
              )}


              {
              <div className="border-t-4  border-t-green-600">
              {varSecciones.map((varSeccion)=>(
                <div className="overflow-x-auto my-14 px-4" key={varSeccion.idVariable}>
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
                              name={`variables.${varSeccion.idVariable}`}
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
            <ButtonNext
              text="Registrar ficha tecnica"
              type="submit"
              className={"bg-green-600 text-white w-full mt-8"}
            />
          </div>
        )}
      </form>
    </>
  );
};
