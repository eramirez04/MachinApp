import { ButtonNext, InputforForm, SelectComponent } from "../../../index.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { multiFormData } from "../../../utils/formData.js";
import { FaUpload } from "react-icons/fa";
import { axiosCliente } from "../../../service/api/axios.js";
import { useTranslation } from "react-i18next";

export const FormAreasUpdate = () => {
  const { t } = useTranslation();
  const [sedes, setSedes] = useState([]);
  const [previewImagen, setPreviewImagen] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [areaData, setAreaData] = useState(null);
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const handleSubmitData = async (data) => {
    const dataArea = {
      area_nombre: data.Nombre_del_area,
      area_fk_sedes: data.sede,
      img: imagen,
    };

    try {
      await multiFormData(
        `http://localhost:3000/area/editararea/${id}`,
        dataArea,
        "PUT"
      );

      alert(t("update_sede_success"));
      navigate("/Areas");
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

  useEffect(() => {
    const fetchSedesAndArea = async () => {
      try {
        const [sedeResponse, areaResponse] = await Promise.all([
          axiosCliente.get("sede/listarsede"),
          axiosCliente.get(`area/listararea/${id}`),
        ]);

        const sedeArray = sedeResponse.data.resultadoSede.map((sede) => ({
          id: sede.idSede,
          nombre: sede.sede_nombre,
        }));

        setSedes(sedeArray);
        setAreaData(areaResponse.data);
        reset({
          Nombre_del_area: areaResponse.data.area_nombre,
          sede: areaResponse.data.area_fk_sedes,
        });

        if (areaResponse.data.img) {
          setPreviewImagen(
            `http://localhost:3000/imagenes/${areaResponse.data.img}`
          );
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchSedesAndArea();
  }, [id, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="bg-white shadow-lg border rounded-lg w-full mx-auto"
      >
        <header className="bg-gradient-to-r from-green-400 to-green-600 h-24 flex justify-center items-center rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">
            {t("update_area")}
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

          <h2 className="mt-5 text-xl font-semibold">
            {t("area_image")}
          </h2>
          <label className="mt-2 w-64 flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md tracking-wide uppercase border border-green-600 cursor-pointer hover:bg-green-600">
            <FaUpload className="text-xl" />
            <span className="mt-2 text-base leading-normal">
              {t("select_file")}
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
              {t("area_info")}
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <InputforForm
                errors={errors}
                register={register}
                tipo={"text"}
                name={"Nombre_del_area"}
                label={t("area_name")}
              />
              <SelectComponent
                options={sedes}
                name="sede"
                placeholder={t("select_sede")}
                valueKey="id"
                textKey="nombre"
                register={register}
                label={t("sede_area")}
              />
            </div>
          </div>
          <div className="pb-8">
            <ButtonNext
              color="success"
              text={t("update_area")}
              type="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};