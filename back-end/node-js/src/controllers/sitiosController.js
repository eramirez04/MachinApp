import { conexion } from "../database/database.js"

export const listarSitio = async (req, res) => {
    try {
        let sql = "select * from sitios"

        const [result] = await conexion.query(sql)

        if (result.length > 0) res.status(200).json(result)

        else res.status(404).json({ "message" : "No se encontraron ambientes en la BD" })
    }
    catch (error) {
        res.status(500).json({ "message" : "Error", error })
    }
}

export const registrarSitio = async (req, res) => {
    try {
        let {sit_nombre, sit_fk_areas, sit_fk_tipo_sitio} = req.body

        let sql = `insert into sitios (sit_nombre, sit_fk_areas, sit_fk_tipo_sitio)
        values ('${sit_nombre}', '${sit_fk_areas}', '${sit_fk_tipo_sitio}')`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Ambiente registrado correctamente" })
        }
        else {
            return res.status(404).json({ "message" : "No se registró el ambiente" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const eliminarSitio = async (req, res) => {
    try {
        let idAmbientes = req.params.id_sitio

        let sql = `delete from sitios where idAmbientes = ${idAmbientes}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se eliminó con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se eliminó el ambiente" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const editarSitio = async (req, res) => {
    try {
        let {sit_nombre, sit_fk_areas, sit_fk_tipo_sitio} = req.body

        let id = req.params.id_sitio

        let sql = `update sitios set sit_nombre = '${sit_nombre}', sit_fk_areas = '${sit_fk_areas}', sit_fk_tipo_sitio = '${sit_fk_tipo_sitio}' where idAmbientes = ${id}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se registró con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se actualizó el ambiente" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}