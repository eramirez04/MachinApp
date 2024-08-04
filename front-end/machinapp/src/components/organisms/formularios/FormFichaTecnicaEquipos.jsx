import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosCliente } from "../../../service/api/axios.js";
//
/* import { multiFormData } from "../../../utils/formData.js"; */
// -> multiFormData => para poder enviar archivos como imagenes al sevidor

// componentes
import InputforForm from "../../molecules/InputForForm";
import ButtonNext from "../../atoms/buttons/ButtonNext.jsx";
import { InputDate } from "../../atoms/Inputs/InputDate.jsx";
import { CardStyle } from "../../molecules/CardStyle.jsx";
import { SelectComponent } from "../../molecules/SelectComponent.jsx";
import { Image } from "@nextui-org/react";

export const FormFichaTecnica = () => {
  //variables de estado
  const [ambientes, setAmbientes] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  // previsua// hookslizar una imagen
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagen, setImagen] = useState(null);
  // asignacion de componentes a una maquinaria, seguna la base de datos
  const [variables, setVariables] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // poder enviar los datos al servidor por metodo POST
  const handleSubmitData = async (data) => {
    console.log(data);
  };

  // opciones de estado de una maquina
  const opciones = [
    { id: 2, valor: "operacion" },
    { valor: "fuera_servicio" },
    { valor: "reparacion" },
  ];

  // poder obtener la fecha del input DATE fecha
  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
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

  useEffect(() => {
    const fechtData = async () => {
      try {
        const [ambientesRes, tipoMaquinaRes, variablesRes] = await Promise.all([
          axiosCliente.get("sitio/listarsitio"),
          axiosCliente.get("tipoFicha/listar"),
          axiosCliente.get("variable/listar"),
        ]);

        const ambientesArray = ambientesRes.data.resultadoSitio.map((item) => ({
          id: item.id,
          valor: item.area_nombre,
        }));

        const tipoEquipoArray = tipoMaquinaRes.data.map((item) => ({
          id: item.idTipo_ficha,
          valor: item.ti_fi_nombre,
        }));

        setAmbientes(ambientesArray);
        setTipoEquipo(tipoEquipoArray);
        setVariables(variablesRes.data);
        setFilteredData(variablesRes.data);
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
            Ficha de equipos
          </div>
          <div className="flex-shrink-0 w-1/3 h-16 border flex items-center">
            <p className="overflow-hidden overflow-ellipsis text-center">
              Centro de gestion y desarrollo sostenible surColombiano
            </p>
          </div>
        </div>
        <div className="border flex flex-col sm:flex-row mt-5 w-full h-auto sm:h-96">
          <div className="w-full sm:w-2/4 p-4">
            <CardStyle subtitle={"descripcion"} titleCard={"Descripcion"}>
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"placa"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"serial"}
              />
            </CardStyle>
          </div>
          <div className="w-full sm:w-2/4 p-4">
            <div className="flex items-center justify-center w-full h-80 bg-gray-300 rounded sm:w-full dark:bg-gray-700">
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
              className="appearance-none w-full py-2 px-4 mt-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid border grid-cols-1 gap-6 mt-12 sm:grid-cols-2 p-5">
          <CardStyle titleCard={"Estado de maquina"}>
            {/* componente para mostrar la lista de los ambientes */}
            <SelectComponent
              options={ambientes}
              name="ambiente"
              placeholder="Ambiente"
              valueKey="id"
              textKey="valor"
              register={register}
              label="Ambiente"
            />
            {/* Componente para seleccionar el tipo de equipo que es  */}
            <SelectComponent
              options={tipoEquipo}
              name="tipo_equipo"
              placeholder="Seleccione una opcion"
              valueKey="id"
              textKey="valor"
              label="Tipo de Equipo o Maquinaria"
              register={register}
            />
            {/* Componente para seleccionar el estado en el que se encuentra la maquina o equipo */}
            <SelectComponent
              options={opciones}
              name="options"
              placeholder="Estado"
              valueKey="valor"
              textKey="valor"
              label="Estado"
              register={register}
            />
          </CardStyle>
          <CardStyle>
            {/* Para seleccionar las fechas del equipo */}
            <InputDate
              value={selectedDate}
              onChange={handleDateChange}
              className="mt-4"
            />
          </CardStyle>
        </div>
        <ButtonNext color="primary" text="generar" type="submit" />
      </form>
    </>
  );
};
