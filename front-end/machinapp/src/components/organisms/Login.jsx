import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosCliente } from "../../service/api/axios.js";

// importacion de componentes
const InputSubmit = lazy(() => import("../atoms/Inputs/InputSubmit.jsx"));
const Alert = lazy(() => import("../atoms/Alert.jsx"));

const InputforForm = lazy(() => import("../molecules/InputForForm.jsx"));

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
  const makeLogin = async (data) => {
    try {
      // peticion http post a api para poder obtener un token
      const response = await axiosCliente.post("/login", {
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
          <InputforForm
            errors={errors}
            register={register}
            tipo={"email"}
            name={"Correo"}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <InputforForm
            errors={errors}
            register={register}
            tipo={"password"}
            name={"password"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <InputSubmit valorInput="Login" />
        </form>
        <div>
          <Alert descripcion={error} />
        </div>
        ¿Olvidades tu contraseña?
      </div>
    </>
  );
};

export default Login;
