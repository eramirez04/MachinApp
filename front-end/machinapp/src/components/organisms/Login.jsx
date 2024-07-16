import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosCliente } from "../../service/api/axios.js";

// importacion de componentes
const InputSubmit = lazy(() => import("../atoms/Inputs/InputSubmit.jsx"));
import Alert from "../atoms/feedback/Alert.jsx";

const InputforForm = lazy(() => import("../molecules/InputForForm.jsx"));

const Login = () => {
  // iniciando variables de estado

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
  const makeLogin = async (data) => {
    try {
      console.log(data);
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

  return (
    <>
      <div className="max-w-md mx-auto pt-3">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(makeLogin)}
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
          <InputSubmit valorInput="Login" />
        </form>
        <div>
          <Alert descripcion={error.invalido && error.invalido} />
        </div>
        ¿Olvidades tu contraseña?
      </div>
    </>
  );
};

export default Login;
