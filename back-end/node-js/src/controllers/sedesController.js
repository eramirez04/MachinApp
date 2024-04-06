import { conexion } from "../database/database.js"

export const listarSede = async (req, res) => {
    try {
      let sql = "SELECT idSede, cen_nombre, sede_nombre, sede_descripcion, sede_direccion FROM sedes INNER JOIN centros ON sede_fk_centros = idCentros"
      const [resultadoSede] = await conexion.query(sql)
  
      if (resultadoSede.length > 0) {
        res.status(200).json({
          "Mensaje": "Sede encontrada",
          resultadoSede
        })
      }
      else {
        return res.status(404).json(
          { "Mensaje": "No se encontraron Sedes" }
        )
      }
    } catch (error) {
      return res.status(500).json({"Mensaje"  : "Error en el servidor", error})
    }
}


export const registrarSede = async (req, res) => {
    try {
        let {sede_nombre, sede_descripcion, sede_direccion, sede_fk_centros} = req.body

        let sql = `insert into sedes (sede_nombre, sede_descripcion, sede_direccion, sede_fk_centros)
        values ('${sede_nombre}', '${sede_descripcion}', '${sede_direccion}', '${sede_fk_centros}')`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Sede registrada correctamente" })
        }
        else {
            return res.status(404).json({ "message" : "No se registró la sede" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const eliminarSede = async (req, res) => {
    try {
        let idSedes = req.params.id_sede

        let sql = `delete from sedes where idSede = ${idSedes}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se eliminó con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se eliminó la sede" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}

export const editarSede = async (req, res) => {
    try {
        let {sede_nombre, sede_descripcion, sede_direccion, sede_fk_centros} = req.body

        let id = req.params.id_sede

        let sql = `update sedes set sede_nombre = '${sede_nombre}', sede_descripcion = '${sede_descripcion}', sede_direccion = '${sede_direccion}', sede_fk_centros = '${sede_fk_centros}' where idSede = ${id}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message" : "Se registró con éxito" })
        }
        else {
            return res.status(404).json({ "message" : "No se actualizó la sede" })
        }
    }
    catch (error) {
        return res.status(500).json({ "message" : "Error", error })
    }
}