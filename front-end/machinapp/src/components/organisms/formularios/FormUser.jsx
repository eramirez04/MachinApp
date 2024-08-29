import { useState } from "react";
import {
  useGlobalData,
  useRegistrarUsuario,
  ButtonNext,
  InputforForm,
  SelectComponent,
  V,
} from "../../../index";
import { useForm } from "react-hook-form";

export const FormUser = () => {
  const { registrarUsuario, loading } = useRegistrarUsuario();
  const { refreshDataUser, roles } = useGlobalData();
  const [errorUser, setError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleSumitData = async (data) => {
    try {
      const res = await registrarUsuario(data);

      if (res && res.Mensaje) {
        alert("Usuario registrado con éxito");
        await refreshDataUser();
        reset();
        setError("");
        return;
      }
    } catch (error) {
      let newErrors = {};

      if (error.response?.data.error) {
        error.response.data.error.forEach((element) => {
          newErrors[element.path[0]] = element.message;
        });
      }

      if (error.response?.data.mensaje) {
        newErrors.correo = error.response.data.mensaje;
      }

      if (error.response?.data.mensajeDoc) {
        newErrors.numeroDocumento = error.response.data.mensajeDoc;
      }

      setError(newErrors);
    }
  };

  return (
    <>
      <form
        action=""
        className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit(handleSumitData)}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col">
            <InputforForm errors={errors} register={register} name={"nombre"} />
          </div>

          <div className="flex flex-col">
            <InputforForm
              errors={errors}
              register={register}
              name={"apellidos"}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <InputforForm
            tipo={"email"}
            errors={errors}
            register={register}
            name={"correo"}
          />
          {errorUser.correo}
        </div>

        <div className="flex flex-col">
          <SelectComponent
            options={[
              { name: "cedula de ciudadania" },
              { name: "tarjeta identidad" },
              { name: "cedula extranjeria" },
            ]}
            name="tipo_documento"
            placeholder="Tipo de documento"
            valueKey="name"
            textKey="name"
            register={register}
            label="Tipo de documento"
          />
        </div>

        <div className="flex flex-col">
          <InputforForm
            errors={errors}
            register={register}
            name={"numero_documento"}
          />
          {errorUser.numeroDocumento && (
            <span className="text-red-500 text-sm mt-1">
              {errorUser.numeroDocumento}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col">
            <InputforForm
              errors={errors}
              register={register}
              name={"contrasenia"}
            />
            {errorUser.contrasenia && (
              <span className="text-red-500 text-sm mt-1">
                {errorUser.contrasenia}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <SelectComponent
              options={roles}
              name="rol"
              placeholder="Tipo de rol"
              valueKey="idRoles"
              textKey="rol_nombre"
              register={register}
              label="Rol"
            />
          </div>
        </div>

        <ButtonNext
          color="s"
          type="submit"
          className={`${V.btnSecundary} ${V.text_white}`}
        >
          {loading ? "Registrando..." : "Registrar"}
        </ButtonNext>
      </form>
    </>
  );
};

/* {
    nombre: "",
    apellidos: "",
    correo: "",
    numero_documento: "",
    tipo_documento: "",
    contrasenia: "",
    especialidad: "",
    empresa: "",
    rol: 4,
  } */
