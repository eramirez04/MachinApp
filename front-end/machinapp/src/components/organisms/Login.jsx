import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// importacion de componentes

import Alert from "../atoms/feedback/Alert.jsx";
const InputforForm = lazy(() => import("../molecules/InputForForm.jsx"));
import { Button } from "@nextui-org/react";
import { useAuth } from "../../hooks/useAuth.jsx";

const Login = () => {
  //error captura de errores
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
      }
    }
  };

  // funcion para validar las credenciales del usuario
  /* const makeLogin = async (data) => {
    try {
      // peticion http post a api para poder obtener un token
      const response = await axiosCliente.post("/login", {
        correo: data.Correo,
        contrasenia: data.Contraseña,
      });

      // si la respuesta es exitosa, redirecciona a la pantalla home, y guarda token en localstorage
      if (response) {
        navegacion("/home");
        setLocalStorage(response.data.token);
      }
    } catch (error) {
      // captura de errores

      if (error.response.data.mensaje) {
        setError((prevErros) => ({
          ...prevErros,
          invalido: error.response.data.mensaje,
        }));
      }

      if (error.response.data.error) {
        let errores = error.response.data.error;

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
      }
    }
  };
 */
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
          />
          <InputforForm
            errors={errors}
            register={register}
            tipo={"password"}
            name={"Contraseña"}
          />
          {error.contrasenia && <Alert descripcion={error.contrasenia} />}
          <Button
            type="submit"
            isLoading={loading}
            className="text-white bg-custom-green"
            /* color="success" */
          >
            {loading ? "Cargando" : "Iniciar Sesion"}
          </Button>
          <Link to="/recuperar"> ¿Olvidades tu contraseña?</Link>
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

export default Login;
