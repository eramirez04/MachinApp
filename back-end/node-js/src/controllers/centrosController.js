import { conexion } from "../database/database.js"
import { validationResult } from "express-validator"

export const listarCentro = async (req, res) => {
    try {
        let sql = "select * from centros"

        const [result] = await conexion.query(sql)

        if (result.length > 0) res.status(200).json(result)

        else res.status(404).json({ "message" : "No se encontraron centros" })
    }
    catch (error) {
        res.status(500).json({ "message" : "Error", error })
    }
}

export const registrarCentro = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }

        let {cen_nombre, cen_descripcion, cen_regional, cen_municipio, cen_subdirector} = req.body

        let sql = `insert into centros (cen_nombre, cen_descripcion, cen_regional, cen_municipio, cen_subdirector)
        values ('${cen_nombre}', '${cen_descripcion}', '${cen_regional}', '${cen_municipio}', '${cen_subdirector}')`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            res.status(200).json({ "message" : "Centro registrado correctamente" })
        }
        else res.status(404).json({ "message" : "No se registró el centro" })
    }
    catch (error) {
        res.status(500).json({ "message" : "Error", error })
    }
}

export const eliminarCentro = async (req, res) => {
    try {
        let idCentros = req.params.id_centro

        let sql = `delete from centros where idCentros = ${idCentros}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se eliminó con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se eliminó el centro" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const editarCentro = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        
        let {cen_nombre, cen_descripcion, cen_regional, cen_municipio, cen_subdirector} = req.body

        let id = req.params.id_centro

        let sql = `update centros set cen_nombre = '${cen_nombre}', cen_descripcion = '${cen_descripcion}', cen_regional = '${cen_regional}', cen_municipio = '${cen_municipio}', cen_subdirector = '${cen_subdirector}' where idCentros = ${id}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se registró con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se actualizó el centro" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}