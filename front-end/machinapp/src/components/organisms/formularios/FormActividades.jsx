import {
    InputforForm,
    useRegistrarRol,
    useGlobalData,
    V,
  } from "../../../index";
  import { useTranslation } from "react-i18next";
  import { useForm } from "react-hook-form";
  import { toast } from "react-toastify";
  
  export const FormActividades = () => {
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
      toast.warning("Registro exitoso")
      await refreshRol();
      reset();
    };
  
    /* nombre, descripcion  */
    return (
      <>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputforForm
              errors={errors}
              register={register}
              tipo={"text"}
              name={"nombre"}

            />
            <InputforForm
              errors={errors}
              register={register}
              tipo={"text"}
              name={"descripcion"}

            />

          </form>
      </>
    );
  };
  