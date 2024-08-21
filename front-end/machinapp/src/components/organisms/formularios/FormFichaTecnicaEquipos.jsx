import { ButtonNext, InputforForm } from "../../../index.js"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosCliente } from "../../../service/api/axios.js"

import { useNavigate } from 'react-router-dom'

//
import { multiFormData } from "../../../utils/formData.js";
// -> multiFormData => para poder enviar archivos como imagenes al sevidor

// componentes

import {TextAreaComponent} from "../../atoms/Inputs/TextArea.jsx"
import { InputDate } from "../../atoms/Inputs/InputDate.jsx";
import { SelectComponent } from "../../molecules/form/SelectComponent.jsx";
import { Image } from "@nextui-org/react";

export const FormFichaTecnica = () => {
  //variables de estado
  const [ambientes, setAmbientes] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([])

  //fechas 
  const [fechaAdquisicion, setDateAduisicion] = useState("")
  const [fechaInicioGarantia, setInicioGarantia] = useState("")
  const [fechaFinGarantia, setFinGarantia] = useState("")
  
  // previsua// hookslizar una imagen
  const [previewImagen, setPreviewImagen] = useState(null)

  //documentos
  const [imagen, setImagen] = useState(null)
  const [fichaRespaldo, setFicha] = useState(null)


  // asignacion de componentes a una maquinaria, seguna la base de datos
  //const [variables, setVariables] = useState([]);
  //const [filteredData, setFilteredData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate()


  // poder enviar los datos al servidor por metodo POST
  const handleSubmitData = async (data) => {
    console.log(data)

    //creamos un objeto y organizamos con la informacion que traemos en el data.-- esto por q las claves del formulario y lo que acepta la api son diferentes

    const dataFicha = {
      placaSena: data.Placa,
      serial: data.Serial,
      fechaAdquisicion: fechaAdquisicion, 
      fechaInicioGarantia: fechaInicioGarantia, 
      fechaFinGarantia: fechaFinGarantia, 
      descipcionGarantia: data.descripcionGarantia,
      descripcion: data.DescripcionEquipo,
      fiEstado: "operacion",
      fk_sitio: data.ambiente, 
      fk_tipo_ficha: data.tipo_equipo,
      marca: data.Marca, 
      modelo: data.Modelo,
      fiImagen: imagen,
      fiTecnica:fichaRespaldo,
      precio: data.Precio
    }

    console.log(dataFicha)

    try{
      const response = await  multiFormData("http://localhost:3000/ficha/registrar",dataFicha, "POST" )
    
      const id = response.data.id

      navigate(`/infoMaquina/${id}`)
    }
    catch(e){
      alert("Error al registrar ficha tecnica")
      console.log(e)
    }


  }

  // opciones de estado de una maquina
/*   const opciones = [
    { id: 2, valor: "operacion" },
    { valor: "fuera_servicio" },
    { valor: "reparacion" },
  ]; */

  // poder obtener la fecha del input DATE fecha
  const dateAdquisicion = (date) => {
    setDateAduisicion(date.target.value);
  }

  const dateInicioGarantia = (date) => {
    setInicioGarantia(date.target.value);
  }

  const dateFinGarantia = (date) => {
    setFinGarantia(date.target.value);
  }

  // tomar la imagen del input file, para poder visualizarla y enviarla al back-end
  const handleFileUpload = (event) => {
    const archivo = event.target.files[0]

    if (archivo) {
      const previewUrl = URL.createObjectURL(archivo);
      setPreviewImagen(previewUrl)
      setImagen(archivo)
    } else {
      setPreviewImagen(null)
    }

  }

  //cargar ficha tecnica de respaldo
  const cargardocumento = (event) =>{
    setFicha(event.target.files[0])
  }

  useEffect(() => {
    const fechtData = async () => {
      try {
        const [ambientesRes, tipoMaquinaRes /* , variablesRes */] = await Promise.all([
          axiosCliente.get("sitio/listarsitio"),
          axiosCliente.get("tipoFicha/listar")
          //axiosCliente.get("variable/listar"),
        ]);

        const ambientesArray = ambientesRes.data.resultadoSitio.map((item) => ({
          id: item.idAmbientes,
          valor: item.area_nombre,
        }));

        const tipoEquipoArray = tipoMaquinaRes.data.map((item) => ({
          id: item.idTipo_ficha,
          valor: item.ti_fi_nombre,
        }));

        setAmbientes(ambientesArray);
        setTipoEquipo(tipoEquipoArray);
        //setVariables(variablesRes.data);
        //setFilteredData(variablesRes.data);
      } catch (error) {
        console.error(error.response);
      }
    };
    fechtData();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12  mx-auto "
      >
        {" "}
        <div className="flex flex-row h-auto items-center">
          <figure className="flex-shrink-0 h-16 w-1/3 border flex justify-center items-center">
            <Image
              src="logoSenaNaranja.png"
              className="h-16 w-full object-contain"
              alt="logo-sena"
            />
          </figure>
          <div className="flex-grow text-center border px-4 h-16 w-1/3 flex items-center justify-center">
            Ficha Técnica
          </div>
          <div className="flex-shrink-0 w-1/3 h-16 border flex items-center">
            <p className="overflow-hidden overflow-ellipsis text-center">
              Centro de Gestión y Desarrollo Sostenible Surcolombiano
            </p>
          </div>
        </div>
        <div className=" flex flex-col sm:flex-row mt-5 w-full "> {/* sm:h-96 */}

          <div className="w-full sm:w-2/4 p-2">
            <h3 className="w-full text-gray-900 text-2xl pl-7 my-5" >Información Básica</h3>

            <div className="grid grid-cols-2 gap-3 ">

              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Placa"}
              />

              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Marca"}
              />

              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Serial"}
              />
              
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Modelo"}
              />
            </div>

            <div className="border-b-1 border-b-green-400 p-3 pb-3 mb-8">     
              <InputDate
                label="Fecha de adquisición: "
                value={fechaAdquisicion}
                onChange={dateAdquisicion}
                className="mt-4"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 ">
              <InputforForm
                errors={errors}
                register={register}
                tipo={"number"}
                name={"Precio"}
              />
              <SelectComponent
                options={ambientes}
                name="ambiente"
                placeholder="Ambiente"
                valueKey="id"
                textKey="valor"
                register={register}
                label="Ambiente"
              />
            </div>
          </div>


          <div className="w-full sm:w-2/4 p-2 ml-11">
            <div className="flex items-center justify-center w-full h-[284px] bg-gray-300 rounded sm:w-full dark:bg-gray-700 mt-24">
              <img
                className="h-full w-full object-contain rounded"
                alt=""
                src={previewImagen}
              />
            </div>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
              className="appearance-none  w-full py-2 px-4 mt-5 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border-b-1 border-t-1 border-t-green-600 border-b-green-600 my-14 py-6  px-3 flex  items-center ">
          <p className="mr-3 text-gray-900">Seleccionar el tipo de ficha técnica: </p>
          <div>
            <SelectComponent
                options={tipoEquipo}
                name="tipo_equipo"
                placeholder="Seleccione una opcion"
                valueKey="id"
                textKey="valor"
                register={register}
            />
          </div>

          <a href="" className="text-green-600/55 ml-28 hover:text-green-600">¡Si no existe, <br /> regístrelo aqui!</a>  {/* hacer modal para registra tipos de equipo */}
        </div>

        <div className="border-b-1 border-b-green-600 pb-7 mb-12">
          <h3 className="w-full text-gray-900 text-2xl pl-7 my-5" >Descripción del equipo</h3>
          <div className="w-full  p-2">
            <TextAreaComponent
            errors = {errors}
            register={register}
            name={'DescripcionEquipo'}
            descripcion={'Descripción del equipo'}
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-5 w-full gap-10 ">
            <div className="flex items-center justify-center">
              <p >Añadir ficha técnica de respaldo (opcional) :</p>
            </div>
            
            
            <div className="flex items-center justify-center">
              <input
                type="file"
                onChange={cargardocumento}
                className="appearance-none  py-2 px-4 mt-5 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

          </div>
        </div>

        <h3 className="w-full text-gray-900 text-2xl pl-7 my-5" >Información de la Garantía</h3>
        <div className=" flex flex-col sm:flex-row mt-5 w-full ">

          <div className="w-full sm:w-2/4 p-2">

            <div className="my-3">
              <InputDate
                label="Fecha de inicio de la garantía : "
                value={fechaInicioGarantia}
                onChange={dateInicioGarantia}
                className="mt-4"
              />
            </div>
            <div className="my-3">
              <InputDate
                label="Fecha de fin de la garantía: "
                value={fechaFinGarantia}
                onChange={dateFinGarantia}
                className="mt-4"
              />
            </div>
          </div>

          <div className="w-full sm:w-2/4 p-2">
            <TextAreaComponent
            errors = {errors}
            register={register}
            name={'descripcionGarantia'}
            descripcion={'Descripción de la garantía'}
            />
          </div>
        </div>
        
        <ButtonNext color="primary" text="Registrar ficha técnica" type="submit" />
      </form>
    </>
  )
}