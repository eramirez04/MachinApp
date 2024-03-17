import { conexion } from "../database/database.js"

export const listarArea = async (req, res) => {
    try {
        let sql = "select * from areas"

        const [result] = await conexion.query(sql)

        if (result.length > 0) res.status(200).json(result)

        else res.status(404).json({ "message" : "No se encontraron areas en la BD" })
    }
    catch (error) {
        res.status(500).json({ "message" : "Error", error })
    }
}

export const registrarArea = async (req, res) => {
    try {
        let {area_nombre, area_fk_sedes} = req.body

        let sql = `insert into areas (area_nombre, area_fk_sedes)
        values ('${area_nombre}', '${area_fk_sedes}')`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Area registrada correctamente" })
        }
        else {
            return res.status(404).json({ "message" : "No se registró el area" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const eliminarArea = async (req, res) => {
    try {
        let idArea = req.params.id_area

        let sql = `delete from areas where idArea = ${idArea}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se eliminó con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se eliminó el area" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const editarArea = async (req, res) => {
    try {
        let {area_nombre, area_fk_sedes} = req.body

        let id = req.params.id_area

        let sql = `update areas set area_nombre = '${area_nombre}', area_fk_sedes = '${area_fk_sedes}' where idArea = ${id}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se registró con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se actualizó el area" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}