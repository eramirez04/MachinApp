
import { ButtonNext, InputforForm } from "../../../index.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { multiFormData } from "../../../utils/formData.js";
import { TextAreaComponent } from "../../atoms/Inputs/TextArea.jsx";
import { FaUpload } from "react-icons/fa";
import { axiosCliente } from "../../../service/api/axios.js";
import { useTranslation } from "react-i18next"; // Importar el hook de traducción

export const FormSedesUpdate = () => {
  const { t } = useTranslation(); // Usar el hook de traducción
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagen, setImagen] = useState(null);
  const { id } = useParams(); // Obtener el ID de la sede desde los params
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSedeData = async () => {
      try {
        const response = await axiosCliente.get(`sede/listarsede/${id}`);
        const sedeData = response.data.resultadoSede;
        
        // Asignar los valores actuales al formulario
        setValue("Nombre_del_centro", sedeData.sede_nombre_centro);
        setValue("Nombre_de_la_sede", sedeData.sede_nombre);
        setValue("Regional", sedeData.sede_regional);
        setValue("Municipio", sedeData.sede_municipio);
        setValue("Direccion", sedeData.sede_direccion);
        setValue("Subdirector", sedeData.sede_subdirector);
        setValue("Contacto", sedeData.contacto);
        setValue("Descripcion", sedeData.sede_descripcion);

        if (sedeData.img) {
          setPreviewImagen(`http://localhost:3000/imagenes/${sedeData.img}`);
        }
      } catch (error) {
        console.error(t("error.fetch_data"), error);
      }
    };

    fetchSedeData();
  }, [id, setValue, t]);

  const handleSubmitData = async (data) => {
    const dataSede = {
      sede_nombre_centro: data.Nombre_del_centro,
      sede_nombre: data.Nombre_de_la_sede,
      sede_descripcion: data.Descripcion,
      sede_regional: data.Regional,
      sede_municipio: data.Municipio,
      sede_subdirector: data.Subdirector,
      sede_direccion: data.Direccion,
      contacto: data.Contacto,
      img: imagen,
    };

    try {
      const response = await multiFormData(
        `sede/editarsede/${id}`,
        dataSede,
        "PUT"
      );

      alert(t("update_sede_success"));
      navigate("/Sedes");
    } catch (error) {
      alert(t("update_sede_error"));
      console.log(error);
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

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="bg-white shadow-lg border rounded-lg w-full mx-auto"
      >
        <header className="bg-gradient-to-r from-green-400 to-green-600 h-24 flex justify-center items-center rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">{t('update_sede')}</h1>
        </header>

        <div className="flex flex-col w-full mt-8 items-center justify-center">
          <div className="flex items-center justify-center h-80 rounded bg-gray-100 w-3/5 shadow-inner">
            {previewImagen ? (
              <img
                className="h-full rounded"
                alt="Preview"
                src={previewImagen}
              />
            ) : (
              <FaUpload className="text-gray-400 text-6xl" />
            )}
          </div>

          <h2 className="mt-5 text-xl font-semibold">{t('sede_image')}</h2>
          <label className="mt-2 w-64 flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md tracking-wide uppercase border border-green-600 cursor-pointer hover:bg-green-600">
            <FaUpload className="text-xl" />
            <span className="mt-2 text-base leading-normal">{t('select_file')}</span>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </label>
          {errors.img_sede && (
            <p className="text-red-500 text-xs mt-2">{errors.img_sede.message}</p>
          )}

          <div className="w-3/4 mt-8 p-2 bg-gray-50 rounded-lg shadow-md">
            <h2 className="mt-5 text-2xl font-semibold text-center text-gray-700">
              {t('sede_info')}
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Nombre_del_centro"}
                label={t('center_name')}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Nombre_de_la_sede"}
                label={t('sede_name')}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Regional"}
                label={"Regional"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Municipio"}
                label={t('municipality')}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Direccion"}
                label={t('address')}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Subdirector"}
                label={t('subdirector')}
              />   
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Contacto"}
                label={t('contact')}
              />     
            </div>
          </div>

          <div className="w-3/4 p-2 mt-8">
            <h2 className="text-xl font-semibold">{t('description')}</h2>
            <TextAreaComponent
              errors={errors}
              register={register}
              name={"Descripcion"}
              className="mt-4 p-3 h-32 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="pb-5">
            <ButtonNext color="success" text={t('update_sede')} type="submit" />
          </div>
        </div>
      </form>
    </>
  );
};