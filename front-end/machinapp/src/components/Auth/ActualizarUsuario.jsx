import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../Api";

const Alert = lazy(() => import("../Alert"));
import InputSubmit from "../InputSubmit";

const ActualizarUsuario = () => {
  //  para registrar la informacion de el usuario
  /* const [usuario, setUsuario] = useState({
    nombre: props.nombre,
    apellidos: props.apellido,
    correo: props.correo,
  }); */

  let nombre = props.nombre
  const apellidos = props.apellidos
  const correo = props.correo

  //  para registrar la informacion de el usuario
  const [userActualizar, setUserAct] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
  });

  // validaciones de los campos
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // funcion que permite actualizar informacion de un usuarios en la base de datos
  const ActualizarUser = async (e) => {
    console.log(userActualizar);
  };

  return (
    <>
      <form method="POST" action="" onSubmit={handleSubmit(ActualizarUser)}>
        <div className="max-w-md mx-auto pt-3">
          <label htmlFor="nombre">
            <input
              type="text"
              value={nombre.nombre}
              onChange={(nom) =>
                setUserAct({ ...userActualizar, nombre: nom.target.value })
              }
              name="nombre"
              id="nombre"
              className="border"
            />
          </label>
          <label htmlFor="nombre">
            <input
              type="text"
              onChange={(ape) =>
                setUserAct({ ...userActualizar, apellidos: ape.target.value })
              }
              value={apellidos}
              name="nombre"
              id="nombre"
              className="border"
            />
          </label>
          <label htmlFor="nombre">
            <input
              type="text"
              onChange={(cor) =>
                setUserAct({ ...userActualizar, correo: cor.target.value })
              }
              value={correo}
              name="nombre"
              id="nombre"
              className="border"
            />
          </label>

          <input type="submit" value="actualizar" />
        </div>
      </form>
    </>
  );
};

export default ActualizarUsuario;
