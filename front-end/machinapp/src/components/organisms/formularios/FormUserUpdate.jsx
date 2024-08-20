import {
  useAuth,
  useFetchRoles,
  useUpdateUser,
  SelectComponent,
  InputUpdate,
  V,
} from "../../../index";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormUserUpdate = ({ userData }) => {
  const { rol, refreshUserLoged } = useAuth();
  const { updateUser, error: updateError } = useUpdateUser();
  const { roles } = useFetchRoles();
  const navigate = useNavigate();
  const user = userData;

  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Inicialmente true

  const [localUser, setLocalUser] = useState({
    id: "",
    correo: "",
    nombre: "",
    apellidos: "",
    numero_documento: "",
    tipo_documento: "",
    imagen: "",
    empresa: "",
    especialidad: "",
    rol: "",
    id_rol: "",
  });

  // validaciones de los campos de los formularios
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (userData) {
      setLocalUser(userData);
      reset({
        nombre: user.nombre,
        correo: user.correo,
        numero_documento: user.numero_documento,
        apellidos: user.apellidos,
        empresa: user.empresa,
        especialidad: user.especialidad,
        imagen: user.imagen,
      });
      setIsLoading(false); // Datos cargados, termina la carga
    }
  }, [userData, user, reset]);

  const onSubmit = async (data) => {
    data.rol =
      data.rol === "undefined" || !data.rol
        ? String(localUser.id_rol)
        : String(data.rol);
    data.tipo_documento = data.tipo_documento || localUser.tipo_documento;

    try {
      const res = await updateUser(data, localUser.id);

      if (res) {
        if (res.data && rol === "Administrador") {
          navigate("/Panelcontrol");
        } else {
          navigate("/perfil");
          await refreshUserLoged();
        }
      }
    } catch (error) {
      console.error(updateError || "An error occurred during the update");
    }
  };

  useEffect(() => {
    const comprobarAdmin = () => {
      if (rol === "Administrador") {
        setAdmin(true);
        return;
      }
      setAdmin(false);
    };
    comprobarAdmin();
  }, [rol, admin]);

  if (isLoading) {
    return <div>Cargando datos del usuario...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        {/* aqui va algo, no se que es pero va */}
        <div className="col-span-5 xl:col-span-3 border">
          <div
            className={`border-b border-stroke py-4 px-7  ${V.bg_sena_verde}`}
          >
            <h3 className="font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <div className="p-7">
            {userData ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5.5 flex flex-col gap-10 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <Controller
                      name="nombre"
                      control={control}
                      rules={{ required: "Correo es obligatorio" }}
                      render={({ field }) => (
                        <InputUpdate
                          {...field}
                          errors={errors}
                          label="Nombre"
                          tipo="text"
                          isUpdating={true}
                        />
                      )}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    {" "}
                    <Controller
                      name="apellidos"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <InputUpdate
                          {...field}
                          errors={errors}
                          label="Apellidos"
                          tipo="text"
                          isUpdating={true}
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                  name="correo"
                  control={control}
                  rules={{ required: "Correo es obligatorio" }}
                  render={({ field }) => (
                    <InputUpdate
                      {...field}
                      label="Correo Electronico"
                      errors={errors}
                      tipo="email"
                      isUpdating={true}
                    />
                  )}
                />

                <div className="mb-5.5  flex flex-col gap-10 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <Controller
                      name="numero_documento"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <InputUpdate
                          {...field}
                          errors={errors}
                          label="Número de documento"
                          tipo="text"
                          isUpdating={true}
                        />
                      )}
                    />
                  </div>
                  {admin && (
                    <>
                      <div className="w-full sm:w-1/2 flex justify-center items-center">
                        <SelectComponent
                          options={[
                            {
                              value: "cedula de ciudadania",
                            },
                            {
                              value: "tarjeta identidad",
                            },
                            {
                              value: "cedula extranjeria",
                            },
                          ]}
                          name="tipo_documento"
                          isDi
                          placeholder="Documento"
                          valueKey="idRoles"
                          value={false}
                          textKey="value"
                          register={register}
                          label="Tipo de documento de identidad"
                        />
                      </div>{" "}
                    </>
                  )}
                </div>

                <div className="mb-5.5 flex flex-col gap-10 sm:flex-row">
                  <div className="w-full sm:w-1/2"> {localUser.rol}</div>
                  {admin && (
                    <>
                      <div className="w-full sm:w-1/2 flex justify-center items-center">
                        <SelectComponent
                          options={roles}
                          name="rol"
                          placeholder="Rol sistema"
                          valueKey="idRoles"
                          value={false}
                          textKey="rol_nombre"
                          register={register}
                          label="Rol"
                        />
                      </div>
                    </>
                  )}
                </div>

                {admin && (
                  <>
                    <div className="mb-5.5 flex flex-col gap-10 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <Controller
                          name="empresa"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <InputUpdate
                              {...field}
                              errors={errors}
                              /*    isDisabled={admin} */
                              label="Empresa"
                              tipo="text"
                              isUpdating={true}
                            />
                          )}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        {" "}
                        <Controller
                          name="especialidad"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <InputUpdate
                              {...field}
                              errors={errors}
                              label="Especialidad"
                              tipo="text"
                              isUpdating={true}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>Cargando datos</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
