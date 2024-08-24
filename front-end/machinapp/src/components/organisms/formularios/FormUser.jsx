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
  const { registrarUsuario, loading, error } = useRegistrarUsuario();
  const { refreshDataUser } = useGlobalData();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleSumitData = async (data) => {
    try {
      const res = await registrarUsuario(data);

      if (res) {
        alert("Usuario registrado con exito");
        await refreshDataUser();
        reset();
        return;
      }
    } catch (error) {
      console.log("Error al registrar un usuario", error.response.data);
    }
  };

  return (
    <>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit(handleSumitData)}
      >
        <div className="grid grid-cols-2 gap-3">
          <InputforForm errors={errors} register={register} name={"nombre"} />

          <InputforForm
            errors={errors}
            register={register}
            name={"apellidos"}
          />
          <InputforForm
            tipo={"email"}
            errors={errors}
            register={register}
            name={"correo"}
          />
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

        <InputforForm
          errors={errors}
          register={register}
          name={"numero_documento"}
        />

        <InputforForm
          errors={errors}
          register={register}
          name={"contrasenia"}
        />
        <input type="hidden" {...register("rol")} value={"2"} />

        <ButtonNext text="" color="success" type="submit">
          {loading ? "Registrando..." : "Registrar"}
        </ButtonNext>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
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
