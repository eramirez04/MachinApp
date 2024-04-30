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
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }

        let {tipo_sitio} = req.body

        let sql = `insert into tipo_sitio (tipo_sitio)
        values ('${tipo_sitio}')`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se registró correctamente" })
        }
        else {
            return res.status(404).json({ "message" : "No se registró" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

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
        const error = validationResult(req)
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