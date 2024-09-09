import { ButtonNext, InputforForm } from "../../../index.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { multiFormData } from "../../../utils/formData.js";
import { TextAreaComponent } from "../../atoms/Inputs/TextArea.jsx";
import { FaUpload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const FormSedes = () => {
  const { t } = useTranslation();
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagen, setImagen] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const handleSubmitData = async (data) => {
    const dataSede = {
      sede_nombre_centro: data.Nombre_del_centro,
      sede_nombre: data.Nombre_de_la_sede,
      sede_descripcion: data.Descripcion,
      sede_regional: data.Regional,
      sede_municipio: data.Municipio,
      sede_subdirector: data.Subdirector,
      sede_direccion: data.Direccion,
      img: imagen,
    };

    try {
      const response = await multiFormData(
        "http://localhost:3000/sede/registrarsede",
        dataSede,
        "POST"
      );

      alert(t("registro_exitoso"))

      navigate("/Sedes")
    } catch (error) {
      alert(t("error_registro_sede"));
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
          <h1 className="text-3xl font-bold text-white">{t("registro_nuevo_sede")}</h1>
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

          <h2 className="mt-5 text-xl font-semibold">{t("imagen_sede")}</h2>
          <label className="mt-2 w-64 flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md tracking-wide uppercase border border-green-600 cursor-pointer hover:bg-green-600">
            <FaUpload className="text-xl" />
            <span className="mt-2 text-base leading-normal">{t("seleccionar_archivo")}</span>
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
              {t("informacion_sede")}
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Nombre_del_centro"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Nombre_de_la_sede"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Regional"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Municipio"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Direccion"}
              />
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Subdirector"}
              />
            </div>
          </div>

          <div className="w-3/4 p-2 mt-8">
            <h2 className="text-xl font-semibold">{t("descripcion_sede")}</h2>
            <TextAreaComponent
              errors={errors}
              register={register}
              name={"Descripcion"}
              descripcion={t("descripcion_sede")}
              className="mt-4 p-3 h-32 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="pb-5">
            <ButtonNext
              color="success"
              text={t("registrar_sede")}
              type="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};