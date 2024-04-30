import Jwt from "jsonwebtoken";
import { conexion } from "../database/database.js"



export const Login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body

        if (!correo && !contrasenia) {
            return res.status(400).json({ mensaje: "Correo y Contraseña son requeridos" });
        }

        let sql = `SELECT idUsuarios,us_nombre, us_especialidad, fk_roles FROM usuarios WHERE us_correo = '${correo}' AND us_contrasenia = '${contrasenia}'`
        const [resultado] = await conexion.query(sql)
        let usuario = {}
        usuario = resultado[0]

        if (resultado.length === 0) {
            return res.status(400).json({ mensaje: "Contraseña o correo incorrectos" })
        } else {
            const token = Jwt.sign({ user: usuario }, process.env.AUTH_SECRET, { expiresIn: process.env.TIME })
            return res.status(200).json({
                "Mensaje": "Usuario autorizado",
                usuario: resultado,
                token: token
            })
        }
    } catch (error) {
        return res.status(500).json({
            Mensaje: "Error en el servidor"
        })
    }
}