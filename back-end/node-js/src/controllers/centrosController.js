import { conexion } from "../database/database.js"

export const registrarCentro = async (req, res) => {
    try {
        let {cen_nombre, cen_descripcion, cen_regional, cen_municipio, cen_subdirector} = req.body()

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