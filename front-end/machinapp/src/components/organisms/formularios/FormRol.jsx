import {
  InputforForm,
  useRegistrarRol,
  useGlobalData,
  V,
} from "../../../index";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

export const FormRol = () => {
  const { registrarRol } = useRegistrarRol();
  const { refreshRol } = useGlobalData();
  const { t } = useTranslation();

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
            label={t("nombre_rol")}
          />
          <InputforForm
            errors={errors}
            register={register}
            tipo={"text"}
            name={"descripcion"}
            label={t("descripcion")}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className={`px-4 py-2 ${V.bg_sena_verde} ${V.text_white}`}
            >
              {t("registrar")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
