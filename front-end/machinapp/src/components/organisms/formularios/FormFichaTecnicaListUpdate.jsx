import { Image } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { axiosCliente } from "../../../service/api/axios";
import { InputUpdate } from "../../../index.js";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const FormFichaTecnicaListUpdate = ({ idMaquina }) => {
  const idFicha = idMaquina;
  const { t } = useTranslation();

  const {
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm();

  const [isLoading, setIsLoading] = useState(true);
  const [infoFicha, setInfoFicha] = useState({});

  const handleSubmitData = async (data) => {
    console.log(data);
    // Aquí se puede enviar la actualización al backend
  };

  useEffect(() => {
    const infoFichaTecnica = async () => {
      try {
        const response = await axiosCliente.get(`ficha/listarUnica/${idFicha}`);

        const ficha = response.data.infoFicha[0];
        setInfoFicha(ficha);
        reset(ficha); // Rellena el formulario con los datos desde la base de datos
        setIsLoading(false);
      } catch (error) {
        console.error(error.response);
      }
    };

    infoFichaTecnica();
  }, [idMaquina, reset]);

  if (isLoading) {
    return <div>Cargando datos de la ficha técnica...</div>;
  }

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit(handleSubmitData)}>
        <div className="bg-white border rounded-lg md:p-14 w-full sm:w-11/12 mx-auto">
          {/* Cabecera */}
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
                Centro de gestión y desarrollo sostenible surColombiano
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row mt-5 w-full">
              <div className="w-full sm:w-2/4 p-2">
                <h3 className="w-full text-gray-900 text-2xl pl-7 my-5">
                  Información Básica
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Input individual para cada campo */}
                  <Controller
                    name="fi_placa_sena"
                    control={control}
                    render={({ field }) => (
                      <InputUpdate
                        {...field}
                        label="Placa SENA"
                        tipo="text"
                        errors={errors}
                        isUpdating={true}
                        value={field.value|| ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />

                 

                  {/* Puedes continuar agregando más campos manualmente */}
                </div>
              </div>
            </div>
          </div>


          <button type="sudmit">
            enviar
          </button>
        </div>
      </form>
    </>
  );
};
