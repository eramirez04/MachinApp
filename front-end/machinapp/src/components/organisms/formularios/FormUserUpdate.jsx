import { useForm, Controller } from "react-hook-form";
import { InputUpdate } from "../../atoms/Inputs/InputUpdate";
import { useState } from "react";
import { useUpdateUser } from "../../../hooks/useUpdateUser";

export const FormUserUpdate = ({ userData }) => {
  const { updateUser } = useUpdateUser();
  const user = userData;

  const [localUser, setLocalUser] = useState({
    correo: user.correo,
    nombre: user.nombre,
    apellidos: user.apellidos,
    numero_documento: user.numero_documento,
  });
  // validaciones de los campos de los formularios
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: localUser.nombre,
      correo: localUser.correo,
      "Numero de documento": localUser.numero_documento,
      Apellidos: localUser.apellidos,

      // Añade aquí los otros campos si es necesario
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateUser(data, user.idUsuarios);
    } catch (error) {
      // Manejar el error de la actualización
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        {/*  <Breadcrumb pageName="Settings" /> */}

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-2">
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
          </div>
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                        name="Nombre"
                        control={control}
                        rules={{ required: "Correo es obligatorio" }}
                        render={({ field }) => (
                          <InputUpdate
                            {...field}
                            errors={errors}
                            name="Nombre"
                            tipo="text"
                            isUpdating={true}
                          />
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      {" "}
                      <Controller
                        name="Apellidos"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <InputUpdate
                            {...field}
                            errors={errors}
                            name="Apellidos"
                            tipo="text"
                            isUpdating={true}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <Controller
                      name="correo"
                      control={control}
                      rules={{ required: "Correo es obligatorio" }}
                      render={({ field }) => (
                        <InputUpdate
                          {...field}
                          errors={errors}
                          name="correo"
                          tipo="email"
                          isUpdating={true}
                        />
                      )}
                    />
                  </div>

                  <div className="mb-5.5">
                    <Controller
                      name="Numero de documento"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <InputUpdate
                          {...field}
                          errors={errors}
                          name="Numero de documento"
                          tipo="text"
                          isUpdating={true}
                        />
                      )}
                    />
                    input aqui
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">text</div>
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
          </div>
        </div>
      </div>
    </>
  );
};
