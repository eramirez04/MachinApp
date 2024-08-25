import { InputforForm, useRegistrarRol, useGlobalData } from "../../../index";
import { Button } from "@nextui-org/react";

import { useForm } from "react-hook-form";

export const FormRol = () => {
  const { registrarRol } = useRegistrarRol();
  const { refreshRol } = useGlobalData();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await registrarRol(data);
    await refreshRol();
    reset();
  };

  /* nombre, descripcion  */
  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputforForm
            errors={errors}
            register={register}
            tipo={"text"}
            name={"nombre"}
            label={"Nombre"}
          />
          <InputforForm
            errors={errors}
            register={register}
            tipo={"text"}
            name={"descripcion"}
            label={"Descripción"}
          />

          <div className="flex justify-end">
            <Button type="submit" color="success" className="px-4 py-2">
              Añadir
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
