import { conexion } from "../database/database.js"
import { validationResult } from "express-validator"

export const listarTipoSitio = async (req, res) => {
    try {
        let sql = "select * from tipo_sitio"

        const [result] = await conexion.query(sql)

        if (result.length > 0) res.status(200).json(result)

        else res.status(404).json({ "message" : "No se encontró" })
    }
    catch (error) {
        res.status(500).json({ "message" : "Error", error })
    }
}

    export const registrarTipoSitio = async (req, res) => {
        console.log('Cuerpo de la solicitud:', req.body);
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            console.log('Errores de validación:', errors.array()); // Muestra los errores
            return res.status(400).json({ errores: errors.array() });
        }
    
        console.log('Cuerpo de la solicitud:', req.body); // Log para ver el cuerpo
    
        const { tipo_sitio } = req.body;
        try {
            const sql = `INSERT INTO tipo_sitio (tipo_sitio) VALUES (?)`;
            const [respuesta] = await conexion.query(sql, [tipo_sitio]);
    
            if (respuesta.affectedRows > 0) {
                return res.status(200).json({ mensaje: "Tipo de sitio registrado correctamente" });
            } else {
                return res.status(400).json({ mensaje: "No se registró el tipo de sitio" });
            }
        } catch (error) {
            console.error('Error al registrar tipo de sitio:', error); // Muestra el error
            return res.status(500).json({ mensaje: "Error en el servidor", error });
        }
    };
    

export const eliminarTipoSitio = async (req, res) => {
    try {
        let idTipo_sitio = req.params.id_tipo_sitio

        let sql = `delete from tipo_sitio where idTipo_sitio = ${idTipo_sitio}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se eliminó con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se eliminó con éxito" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const editarTipoSitio = async (req, res) => {
    try {
        const error = validationResult(req.body)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        
        let {tipo_sitio} = req.body

        let id = req.params.id_tipo_sitio

        let sql = `update tipo_sitio set tipo_sitio = '${tipo_sitio}' where idTipo_sitio = ${id}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se registró con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se actualizó con éxito" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}