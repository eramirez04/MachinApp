import {
  ButtonNext,
  InputforForm,
  SelectComponent,
  multiFormData,
  axiosCliente,
  useGlobalData,
} from "../../../index.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

export const FormAmbientes = () => {
  const [areas, setAreas] = useState([]);
  const [tipositios, setTipositios] = useState([]);
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagen, setImagen] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /*  const navigate = useNavigate(); */

  // Obtener datos globales de los ambientes
  const { dataUser, refress } = useGlobalData(); // Obtener usuarios desde useGlobalData

  const handleSubmitData = async (data) => {
    const dataSitio = {
      sit_nombre: data.Nombre_del_ambiente,
      sit_fk_areas: data.area,
      sit_fk_tipo_sitio: data.tipo_sitio,
      sit_fk_usuarios: data.instructor,
      img: imagen,
    };

    try {
      await multiFormData(
        "http://localhost:3000/sitio/registrarsitio",
        dataSitio,
        "POST"
      );

      toast.success("Se registró con éxito");

      await refress();

      /*  navigate("/Ambientes"); */
    } catch (error) {
      alert("Error al registrar nuevo ambiente");
      console.log(error.response);
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areaResponse, tipoSitioResponse] = await Promise.all([
          axiosCliente.get("area/listararea"),
          axiosCliente.get("tipositio/listartipositio"),
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
      } catch (error) {
        console.error(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="bg-white shadow-lg border rounded-lg w-full mx-auto"
      >
        <header className="bg-gradient-to-r from-green-400 to-green-600 h-20 flex justify-center items-center rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">
            Registrar nuevo Ambiente
          </h1>
        </header>

        <div className="flex flex-col w-full mt-8 items-center justify-center">
          <div className="flex items-center justify-center h-64 rounded bg-gray-100 w-3/5 shadow-inner">
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
          <label className="mt-2 flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md tracking-wide uppercase border border-green-600 cursor-pointer hover:bg-green-600">
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
                options={dataUser
                  .filter((item) => item.rol_nombre === "instructor")
                  .map((item) => ({
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
            <ButtonNext
              color="success"
              text="Registrar Ambiente"
              className={"text-white"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};
