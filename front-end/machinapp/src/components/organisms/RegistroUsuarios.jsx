import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../atoms/api/Api.jsx";
const Alert = lazy(() => import("../atoms/Alert.jsx"));
const InputSubmit = lazy(() => import("../atoms/InputSubmit.jsx"));

const RegistroUsuarios = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero_doc, setNumeroDoc] = useState("");
  const [tipoDocumento, setTipoDoc] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navegacion = useNavigate();

  const crearUsuario = async (e) => {
    console.log(nombre);
    try {
      const response = await api.post("/user/registrar", {
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        numero_documento: numero_doc,
        tipo_documento: tipoDocumento,
        contrasenia: contrasenia,
        rol: "4",
        img: undefined,
      });
      if (response.data.Mensaje === "Registro de usuario exitoso") {
        console.log("usuario creado");
        //navegacion('/')
        setNombre("");
        setApellidos("");
        setCorreo("");
        setContrasenia("");
        setNumeroDoc("");
        setTipoDoc("");
        alert("usuario creado");
      }
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto pt-3">
        <form onSubmit={handleSubmit(crearUsuario)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={nombre}
              {...register("nombres", { required: true })}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombres
            </label>
            {errors.nombres?.type === "required" && (
              <Alert descripcion="Nombre requerido" />
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={apellidos}
              {...register("apellido", { required: true, minLength: 4 })}
              onChange={(e) => setApellidos(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Apellidos
            </label>
            {errors.apellido?.type === "required" && (
              <Alert descripcion="Apellidos requeridos" />
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("correo", { required: true })}
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
              <Alert descripcion="Correo requerido" />
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("numero", { required: true })}
              value={numero_doc}
              onChange={(e) => setNumeroDoc(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Numero de documento
            </label>
            {errors.numero?.type === "required" && (
              <Alert descripcion="Numero de documento requerido" />
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Seleccione una opcion
            </label>
            <select
              name=""
              id=""
              value={tipoDocumento}
              onChange={(e) => setTipoDoc(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""></option>
              <option value="cedula de ciudadania">Cedula de Ciudadania</option>
              <option value="tarjeta identidad">tarjeta Identidad</option>
              <option value="cedula extranjeria">Cedula Extranjeria</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("password", { required: true })}
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
              <Alert descripcion="Contraseña requerida" />
            )}
          </div>
          <InputSubmit value="Registrarse" />
        </form>
      </div>
    </>
  );
};

export default RegistroUsuarios;
