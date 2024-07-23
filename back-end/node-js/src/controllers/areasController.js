import { conexion } from "../database/database.js"
import { validationResult } from "express-validator"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, img, cb) {cb(null, "public/imagenes")}, 
    filename: function(req, img, cb) {cb(null, img.originalname)}
})

const upload = multer({storage: storage})
export const cargarImagenArea = upload.single('img')

export const listarArea = async (req, res) => {
    try {
      let sql = "SELECT idArea, sede_nombre, area_nombre FROM areas INNER JOIN sedes ON area_fk_sedes = idSede"
      const [resultadoArea] = await conexion.query(sql)
  
      if (resultadoArea.length > 0) {
        res.status(200).json({
          "Mensaje": "Area encontrado",
          resultadoArea
        })
      }
      else {
        return res.status(404).json(
          { "Mensaje": "No se encontraron Area" }
        )
      }
    } catch (error) {
      return res.status(500).json({"Mensaje"  : "Error en el servidor", error})
    }
}

export const registrarArea = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }

        let {area_nombre, area_fk_sedes} = req.body

        let img_area = req.file.originalname

        let sql = `insert into areas (area_nombre, img_area, area_fk_sedes)
        values ('${area_nombre}', '${img_area}', '${area_fk_sedes}')`

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
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        
        let {area_nombre} = req.body
        let img_area = req.file.originalname
        let id = req.params.id_area

        let sql = `update areas set area_nombre = '${area_nombre}', img_area = '${img_area}' where idArea = ${id}`

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

export const listarAreaPorId = async (req, res) => {
    try {
        let idArea = req.params.id_area;
        let sql = "SELECT idArea, sede_nombre, area_nombre FROM areas INNER JOIN sedes ON area_fk_sedes = idSede WHERE idArea = ?";

        const [resultadoArea] = await conexion.query(sql, [idArea]);

        if (resultadoArea.length > 0) {
            res.status(200).json({
                "Mensaje": "Área encontrada",
                resultadoArea
            });
        } else {
            return res.status(404).json({
                "Mensaje": "No se encontró el área"
            });
        }
    } catch (error) {
        return res.status(500).json({
            "Mensaje": "Error en el servidor",
            error
        });
    }
}

export const listarAreasPorSede = async (req, res) => {
    try {
        let idSede = req.params.id_sede;
        let sql = `
        SELECT areas.idArea, areas.area_nombre, areas.img_area, sedes.sede_nombre
        FROM areas
        INNER JOIN sedes ON areas.area_fk_sedes = sedes.idSede
        WHERE sedes.idSede = ?
        `;

        const [resultadoAreas] = await conexion.query(sql, [idSede]);

        if (resultadoAreas.length > 0) {
            res.status(200).json({
                "Mensaje": "Áreas encontradas",
                resultadoAreas
            });
        } else {
            return res.status(404).json({
                "Mensaje": "No se encontraron áreas para la sede especificada"
            });
        }
    } catch (error) {
        return res.status(500).json({
            "Mensaje": "Error en el servidor",
            error
        });
    }
}