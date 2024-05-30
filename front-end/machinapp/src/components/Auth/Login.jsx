import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

// importacion de componentes
const InputSubmit = lazy(() => import("../InputSubmit"));
const Alert = lazy(() => import("../Alert"));

const Login = () => {
  // iniciando variables de estado
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  //error captura de errores
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // uso de navegacion si se retorna un token
  const navegacion = useNavigate();

  // funcion para gurdar token en local6storage
  const setLocalStorage = (token) => {
    try {
      window.localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  // funcion para validar las credenciales del usuario
  const makeLogin = async (e) => {
    try {
      // peticion http post a api para poder obtener un token
      const response = await Api.post("/login", {
        correo: correo,
        contrasenia: contrasenia,
      });

      // si la respuesta es exitosa, redirecciona a la pantalla home, y guarda token en localstorage
      if (response) {
        navegacion("/home");
        setLocalStorage(response.data.token);
      }
    } catch (error) {
      // captura de errores
      /*  console.log(error.response.data.errors[0].msg); */
      setError(error.response.data.mensaje);

      switch (error.response.data.errors) {
        case "Formato de correo no valido":
          setError(error.response.data.errors[0].msg);
          break;

        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto pt-3">
        <form onSubmit={handleSubmit(makeLogin)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              {...register("correo", {
                required: {
                  value: true,
                  message: "el campo email es obligatorio",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message:
                    "el formato del email es incorrecto, por favor reviselo",
                },
              })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Correo
            </label>
            {errors.correo?.type === "required" && (
              <Alert descripcion={errors.correo.message} />
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_email"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("password", {
                required: {
                  value: true,
                  message: "el campo contrasena es obligatorio",
                },
                minLength: {
                  value: 5,
                  message: "la contrasena debe tener almenos 6 caracteres",
                },
              })}
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contraseña
            </label>
            {errors.password?.type === "required" && (
              <Alert descripcion={errors.password.message} />
            )}
          </div>
          <InputSubmit value="Login" />
        </form>
        <div>
          <Alert descripcion={error} />
        </div>
      </div>
    </>
  );
};

export default Login;
