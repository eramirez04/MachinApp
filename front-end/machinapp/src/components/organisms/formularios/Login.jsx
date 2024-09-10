import { InputforForm, useAuth, Alert } from "../../../index.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// importacion de componentes
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export const Login = () => {
  //error captura de errores
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { t } = useTranslation();

  const { login, loading } = useAuth();

  const handleLogin = async (data) => {
    const res = await login(data);
    if (res && res.data) {
      if (res.data.mensaje) {
        setError((prevErros) => ({
          ...prevErros,
          invalido: res.data.mensaje,
        }));
      }
      if (res.data.error) {
        let errores = res.data.error;

        errores.forEach((element) => {
          switch (element.path[0]) {
            case "contrasenia":
              setError((prevErros) => ({
                ...prevErros,
                contrasenia: element.message,
              }));
              break;

            default:
              console.log("error");
              break;
          }
        });
      } else {
        setError((prevErros) => ({
          ...prevErros,
          contrasenia: "",
        }));
      }
    }
  };

  return (
    <>
      <div className="pt-3">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleLogin)}
        >
          <InputforForm
            errors={errors}
            register={register}
            tipo={"email"}
            name={"Correo"}
            label={t("correo")}
          />
          <InputforForm
            errors={errors}
            register={register}
            tipo={"password"}
            name={"Contraseña"}
            label={t("contrasena")}
          />
          {error.contrasenia && <Alert descripcion={error.contrasenia} />}
          <Button
            type="submit"
            isLoading={loading}
            className="text-white bg-custom-green"
            /* color="success" */
          >
            {loading ? "Cargando" : t("iniciar_sesion")}
          </Button>
          <Link to="/recuperar">{t("olvidaste_contrasena")}</Link>
        </form>
        {error && (
          <div>
            <Alert descripcion={error.invalido && error.invalido} />
          </div>
        )}
      </div>
    </>
  );
};
