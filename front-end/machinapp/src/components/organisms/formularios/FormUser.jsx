import { useState } from "react";
import {
  useGlobalData,
  useRegistrarUsuario,
  ButtonNext,
  InputforForm,
  SelectComponent,
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
      if (error.response?.data.mensaje) {
        setError((prevErrors) => ({
          ...prevErrors,
          correo: error.response?.data.mensaje,
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          correo: "",
          contrasenia: "",
        }));
      }

      if (error.response && error.response.data.error) {
        let errores = error.response.data.error;

        errores.forEach((element) => {
          switch (element.path[0]) {
            case "contrasenia":
              setError((prevErrors) => ({
                ...prevErrors,
                contrasenia: element.message,
              }));
              break;

            default:
              console.log("Mensaje de error desconocido:", element.message);
              setError((prevErrors) => ({
                ...prevErrors,
                [element.path[0]]: element.message,
              }));
              break;
          }
        });
      }
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
            {errors.nombre && (
              <span className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <InputforForm
              errors={errors}
              register={register}
              name={"apellidos"}
            />
            {errors.apellidos && (
              <span className="text-red-500 text-sm mt-1">
                {errors.apellidos.message}
              </span>
            )}
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
          {errors.numero_documento && (
            <span className="text-red-500 text-sm mt-1">
              {errors.numero_documento.message}
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
            {errors.contrasenia && (
              <span className="text-red-500 text-sm mt-1">
                {errors.contrasenia.message}
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

        <ButtonNext text="" color="success" type="submit" className="mt-4">
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
