// conexion a base de datos
import { conexion } from "../database/database.js";

// jwt
import Jwt from "jsonwebtoken";

//encriptacion de contraseña, registro de usuarios
import { encriptarContra } from "../config/bcryptjs.js";

// transporte que contiene la configuracion de envio de correos
import { transporter } from "../config/email.js";
import { generarRandom } from "../config/passwordRamdom.js";

// importacion del modelo que hace consultas a la base de datos
import { UsuarioModel } from "../database/model/usuario.js";

// validaciones de campos con la libreria zod
import {
  validarUsuarios,
  validarUsuariosActualizar,
} from "../../validar/usuariosValidaciones/usuariosRequest.js";

import { validarNumeroDocumento } from "../../validar/usuariosValidaciones/recuperarContraseña.js";

// registro de usuarios
export const Store = async (req, res) => {
  try {
    // validacion de datos del usuario
    const result = validarUsuarios(req.body);

    // en caso de se ecuentre un error retornar estado 400
    if (result.error)
      return res.status(400).json({ error: result.error.errors });

    // se asigna los datos que lleguen por el cuerpo de la solicitud
    // y se agregan a la variable
    const data = req.body;

    // conexion con el modelo
    const [resultadoUser] = await UsuarioModel.registroUsuario(data);

    // si se registra con exito, se devuelve un estado 200
    if (resultadoUser.affectedRows > 0)
      res.status(200).json({ Mensaje: "Registro de usuario exitoso" });
  } catch (error) {
    // si ocurre algun error, se captura y se devuelve un estado 500
    return res.status(500).json({
      Mensaje: "Error en el servidor" + error,
    });
  }
};

export const ListarUsuarios = async (req, res) => {
  try {
    // instacia de la clase UsuarioModel, que interactua como modelo
    const user = new UsuarioModel();
    const [resultadoUser] = await user.getAll();
    if (resultadoUser.length === 0)
      return res.status(404).json({ Mensaje: "No se encontraron usuarios" });
    return res.status(200).json(resultadoUser);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor" + error });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const error = validarUsuariosActualizar(req.body);

    if (error.error) return res.status(400).json({ error: error.error.errors });

    let id = req.params.id;

    let imagen = "";
    if (req.body.us_imagen) {
      // imagen cuando se actulizan los demas datos pero conserva la imagen
      imagen = req.body.us_imagen;
    } else {
      // variable que recibe la imagen que se desa actualizar
      let img = req.file;

      imagen = img ? img.originalname : null;
    }

    const [reActualizar] = await UsuarioModel.actualizarUser(
      req.body,
      id,
      imagen
    );

    if (reActualizar.affectedRows === 0)
      return res
        .status(404)
        .json({ Mensaje: "No se encontro usuario para actulizar" });

    return res.status(200).json({ Mensaje: "Usuario Actualizado" });
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor" + error });
  }
};

export const EliminarUsuario = async (req, res) => {
  try {
    let id = req.params.id;
    let sqlDelete = `delete from usuarios where idUsuarios = ${id}`;
    const [eliminarUs] = await conexion.query(sqlDelete);
    if (eliminarUs.affectedRows > 0) {
      res.status(200).json({
        Mensaje: "Usuario Eliminado",
      });
    } else {
      return res.status(404).json({
        Mensaje: "Usuarios no Econtrado",
      });
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor", error });
  }
};

export const ListarUsuarioId = async (req, res) => {
  try {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    const paylod = Jwt.verify(token, process.env.AUTH_SECRET);

    const user = new UsuarioModel();

    const [resultado] = await user.getId(paylod.user.idUsuarios);
    if (resultado.length === 0)
      return res.status(404).json({ Mensaje: "Usuario no encontrado" });
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor" + error });
  }
};

export const ListarTecnicos = async (req, res) => {
  try {
    let sqlListarIdT = `
    SELECT idUsuarios,us_nombre, rol_nombre FROM usuarios JOIN roles ON idRoles = fk_roles WHERE rol_nombre = 'Tecnico'`;

    const [resultado] = await conexion.query(sqlListarIdT);
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      return res.status(404).json({
        Mensaje: "Usuario no encontrado",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//plantilla html de correos electronico
import { emailHtml } from "../config/emailhtml.js";

// funcion que envia correos para recuperar contraseña
export const recuperaraContra = async (req, res) => {
  try {
    const result = validarNumeroDocumento(req.body);

    if (result.error)
      return res.status(400).json({ error: result.error.errors });

    const { numero_identificacion } = req.body;

    const [usuario] = await conexion.query(
      "select * from usuarios where us_numero_documento = ?;",
      [numero_identificacion]
    );

    if (usuario.length === 0) {
      return res
        .status(404)
        .json({ estado: false, mensaje: "no se encontro usuario" });
    } else {
      let newPassword = generarRandom();

      const result = await transporter.sendMail({
        from: '"MachinApp" <machinappsena@gmail.com>', // sender address
        to: usuario[0].us_correo, // list of receivers
        subject: "Recuperacion de contraseña", // Subject line
        html: emailHtml(usuario[0].us_nombre, newPassword),
      });
      // encriptar contraseña
      const newPasswordCrypt = await encriptarContra(newPassword);

      let sqlActualizarContra = `UPDATE usuarios SET us_contrasenia= '${newPasswordCrypt}' WHERE idUsuarios = ${usuario[0].idUsuarios}`;
      await conexion.query(sqlActualizarContra);
      res.status(200).json({
        mensage: "Contraseña recuperada",
        estado: true,
        "correo_usuario: ": result.accepted,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
