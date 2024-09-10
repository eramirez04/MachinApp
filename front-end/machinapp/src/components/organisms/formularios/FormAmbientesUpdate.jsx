import { ButtonNext, InputforForm, SelectComponent, InputDate } from "../../../index.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { multiFormData } from "../../../utils/formData.js";
import { FaUpload } from "react-icons/fa";
import { axiosCliente } from "../../../service/api/axios.js";
import { useGlobalData } from "../../../index.js";

export const FormAmbientesUpdate = () => {
  const [areas, setAreas] = useState([]);
  const [tipositios, setTipositios] = useState([]);
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [dataSitio, setDataSitio] = useState(null);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del ambiente desde los parámetros de la URL

  // Obtener datos globales
  const { dataUser } = useGlobalData(); // Obtener usuarios desde useGlobalData

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areaResponse, tipoSitioResponse, sitioResponse] = await Promise.all([
          axiosCliente.get("area/listararea"),
          axiosCliente.get("tipositio/listartipositio"),
          axiosCliente.get(`/sitio/listarsitioporid/${id}`) // Obtener datos del ambiente específico
        ]);

        const areaArray = areaResponse.data.resultadoArea.map((item) => ({
          id: item.idArea,
          valor: item.area_nombre,
        }));
        
        const tipositioArray = tipoSitioResponse.data.map((item) => ({
          id: item.idTipo_sitio,
          valor: item.tipo_sitio,
        }));

        setAreas(areaArray);
        setTipositios(tipositioArray);

        // Configurar datos del ambiente en el formulario
        const sitioData = sitioResponse.data;
        setDataSitio(sitioData);
        setValue("Nombre_del_ambiente", sitioData.sit_nombre);
        setValue("area", sitioData.sit_fk_areas);
        setValue("tipo_sitio", sitioData.sit_fk_tipo_sitio);
        setValue("instructor", sitioData.sit_fk_usuarios);
        setFechaRegistro(sitioData.sit_fecha_registro);
        // Configurar la imagen si existe
        if (sitioData.img) {
          const previewUrl = `http://localhost:3000/imagenes/${sitioData.img}`; // Ajusta la URL según sea necesario
          setPreviewImagen(previewUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitData = async (data) => {
    const dataSitio = {
      sit_nombre: data.Nombre_del_ambiente,
      sit_fecha_registro: fechaRegistro,
      sit_fk_areas: data.area,
      sit_fk_tipo_sitio: data.tipo_sitio,
      sit_fk_usuarios: data.instructor,
      img: imagen,
    };

    try {
      await multiFormData(
        `http://localhost:3000/sitio/editarsitio/${id}`, // Endpoint para actualizar
        dataSitio,
        "PUT"
      );

      alert("Se actualizó con éxito");

      navigate("/Ambientes");
    } catch (error) {
      alert("Error al actualizar el ambiente");
      console.log(error);
    }
  };

  const dateRegistro = (date) => {
    setFechaRegistro(date.target.value);
  };

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

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="bg-white shadow-lg border rounded-lg w-full mx-auto"
      >
        <header className="bg-gradient-to-r from-green-400 to-green-600 h-24 flex justify-center items-center rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">
            Actualizar Ambiente
          </h1>
        </header>

        <div className="flex flex-col w-full mt-8 items-center justify-center">
          <div className="flex items-center justify-center h-80 rounded bg-gray-100 w-[800px] shadow-inner">
            {previewImagen ? (
              <img
                className="h-full w-full object-cover rounded"
                alt="Preview"
                src={previewImagen}
              />
            ) : (
              <FaUpload className="text-gray-400 text-6xl" />
            )}
          </div>

          <h2 className="mt-5 text-xl font-semibold">Imagen del ambiente</h2>
          <label className="mt-2 w-64 flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md tracking-wide uppercase border border-green-600 cursor-pointer hover:bg-green-600">
            <FaUpload className="text-xl" />
            <span className="mt-2 text-base leading-normal">
              Seleccionar archivo
            </span>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </label>
          {errors.img_sede && (
            <p className="text-red-500 text-xs mt-2">
              {errors.img_sede.message}
            </p>
          )}

          <div className="w-3/4 my-8 p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="mt-5 text-2xl font-semibold text-center text-gray-700">
              Información del ambiente
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Nombre_del_ambiente"}
                label={"Nombre del ambiente"}
              />
              <InputDate
                label="Fecha de Registro: "
                value={fechaRegistro}
                onChange={dateRegistro}
              />
              <SelectComponent
                options={areas}
                name="area"
                placeholder="Area"
                valueKey="id"
                textKey="valor"
                register={register}
                label="Area"
              />
              <SelectComponent
                options={tipositios}
                name="tipo_sitio"
                placeholder="Tipo de Sitio"
                valueKey="id"
                textKey="valor"
                register={register}
                label="Tipo de sitio"
              />
              <SelectComponent
                options={dataUser.filter(item => item.rol_nombre === "instructor").map(item => ({
                  id: item.idUsuarios,
                  valor: item.us_nombre + " " + item.us_apellidos,
                }))}
                name="instructor"
                placeholder="Instructor encargado"
                valueKey="id"
                textKey="valor"
                register={register}
                label="Instructor encargado"
              />
            </div>
          </div>
          <div className="pb-8">
            <ButtonNext color="success" text="Actualizar Ambiente" type="submit" />
          </div>
        </div>
      </form>
    </>
  );
};