import {
  useAuth,
  useFetchRoles,
  useUpdateUser,
  SelectComponent,
  InputUpdate,
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

  const [localUser, setLocalUser] = useState({
    id: user.id,
    correo: user.correo,
    nombre: user.nombre,
    apellidos: user.apellidos,
    numero_documento: user.numero_documento,
    tipo_documento: user.tipo_documento,
    imagen: user.imagen,
    empresa: user.empresa,
    especialidad: user.especialidad,
    rol: user.rol,
    id_rol: user.id_rol,
  });

  // validaciones de los campos de los formularios
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: localUser.nombre,
      correo: localUser.correo,
      numero_documento: localUser.numero_documento,
      apellidos: localUser.apellidos,
      empresa: localUser.empresa,
      especialidad: localUser.especialidad,
      imagen: localUser.imagen,
    },
  });

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

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        {/* aqui va algo, no se que es pero va */}
        <div className="col-span-5 xl:col-span-3 border">
          <div className="border-b border-stroke bg-custom-green py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <div className="p-7">
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
          </div>
        </div>
      </div>
    </>
  );
};

/*  <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 bg-custom-green px-7 dark:border-strokedark">
                <span className="font-medium text-black  dark:text-white">
                  Your Photo
                </span>
              </div>
              <div className="p-7">
                <form action="#">
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div> */
