import Jwt from "jsonwebtoken";
import {conexion} from "../database/database.js"

const secret = "my_key_secret"

export const Login = async (req, res) => {
    try {
        const correo = req.body.correo
        const contrasenia = req.body.contrasenia

        if (!correo && !contrasenia) {
            return res.status(400).json({message: "Correo y Contraseña son requeridos"});
        }

        let sql = `SELECT * FROM usuarios WHERE us_correo = '${correo}' AND us_contrasenia = '${contrasenia}'`
        const [resultado] = await conexion.query(sql)
        let usuario = {}
        usuario = resultado[0]

        if (resultado.length === 0) {
            return res.status(400).json({message: "Contraseña o correo incorrectos"})
        } else {
            const token = Jwt.sign({usuario}, secret, {expiresIn: '30m'})
            return res.status(200).json({token})
        }
    } catch (error) {
        return res.status(500).json({
            "Mensaje": "Error en el servidor"
        })
    }
}