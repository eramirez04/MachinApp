import Jwt from "jsonwebtoken";
import { conexion } from "../database/database.js";
import { compare } from "../config/bcryptjs.js";
import { validationResult } from "express-validator";

// importamos las validaciones de los campos
import { LoginRequest } from "../../validar/usuariosValidaciones/LoginRequest.js";

export const Login = async (req, res) => {
  try {
    const result = LoginRequest(req.body);

    if (result.error)
      return res.status(400).json({ error: result.error.errors });

    const { correo, contrasenia } = req.body;

    let sql = `
        SELECT idUsuarios,us_contrasenia, roles.rol_nombre
        FROM usuarios 
        INNER JOIN roles ON roles.idRoles = usuarios.fk_roles
        WHERE us_correo = 
        '${correo}'`;
    const [resultado] = await conexion.query(sql);

    if (resultado.length === 0) {
      return res.status(400).json({ mensaje: "Correo es incorrecto" });
    }

    let usuario = {};
    usuario = resultado[0];
    // comparando contraseña
    const checkContra = await compare(contrasenia, usuario.us_contrasenia);

    if (checkContra) {
      const token = Jwt.sign({ user: usuario }, process.env.AUTH_SECRET, {
        expiresIn: process.env.TIME,
      });
      return res.status(200).json({
        Mensaje: "Usuario autorizado",
        usuario: resultado,
        token: token,
      });
    } else {
      return res.status(400).json({ mensaje: "Contraseña es incorrecta" });
    }
  } catch (error) {
    return res.status(500).json({
      Mensaje: "Error en el servidor" + error,
    });
  }
};
