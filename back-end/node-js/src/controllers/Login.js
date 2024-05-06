import Jwt from "jsonwebtoken";
import { conexion } from "../database/database.js"
import { compare } from "../config/bcryptjs.js";
import { validationResult } from "express-validator";


export const Login = async (req, res) => {
    try {
        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        const { correo, contrasenia } = req.body

        let sql = `SELECT idUsuarios,us_nombre, us_especialidad, fk_roles, us_contrasenia FROM usuarios WHERE us_correo = '${correo}'`
        const [resultado] = await conexion.query(sql)

        let usuario = {}
        usuario = resultado[0]
        // comparando contraseña
        const checkContra = await compare(contrasenia, usuario.us_contrasenia)

        if (checkContra) {
            const token = Jwt.sign({ user: usuario }, process.env.AUTH_SECRET, { expiresIn: process.env.TIME })
            return res.status(200).json({
                "Mensaje": "Usuario autorizado",
                usuario: resultado,
                token: token
            })
        } else {
            return res.status(400).json({ mensaje: "Contraseña o correo incorrectos" })
        }
    } catch (error) {
        return res.status(500).json({
            Mensaje: "Error en el servidor",
            error
        })
    }
}