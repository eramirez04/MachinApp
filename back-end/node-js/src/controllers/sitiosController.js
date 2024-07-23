import { conexion } from "../database/database.js"
import { validationResult } from "express-validator"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, img, cb) {cb(null, "public/imagenes")}, 
    filename: function(req, img, cb) {cb(null, img.originalname)}
})

const upload = multer({storage: storage})
export const cargarImagenSitio = upload.single('img')

export const listarSitio = async (req, res) => {
    try {
        let sql = "select idAmbientes,sit_nombre,tipo_sitio,area_nombre from sitios INNER JOIN tipo_sitio ON sit_fk_tipo_sitio = idTipo_sitio INNER JOIN areas ON sit_fk_areas = idArea"

        const [resultadoSitio] = await conexion.query(sql)
  
        if (resultadoSitio.length > 0) {
          res.status(200).json({
            "Mensaje": "Sitio encontrado",
            resultadoSitio
          })
        }
        else {
          return res.status(404).json(
            { "Mensaje": "No se encontraron Sitios" }
          )
        }
      } catch (error) {
        return res.status(500).json({"Mensaje"  : "Error en el servidor", error})
      }
}

export const registrarSitio = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }

        let {sit_nombre, sit_fk_areas, sit_fk_tipo_sitio} = req.body

        let img_sitio = req.file.originalname

        let sql = `insert into sitios (sit_nombre, img_sitio, sit_fk_areas, sit_fk_tipo_sitio)
        values ('${sit_nombre}', '${img_sitio}', '${sit_fk_areas}', '${sit_fk_tipo_sitio}')`

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
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        
        let {sit_nombre, sit_fk_areas, sit_fk_tipo_sitio} = req.body
        let img_sitio = req.file.originalname
        let id = req.params.id_sitio

        let sql = `update sitios set sit_nombre = '${sit_nombre}', sit_fk_areas = '${sit_fk_areas}', sit_fk_tipo_sitio = '${sit_fk_tipo_sitio}', img_sitio = '${img_sitio}' where idAmbientes = ${id}`

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

export const listarSitioPorId = async (req, res) => {
    try {
        let idAmbientes = req.params.id_sitio;

        if (!idAmbientes) {
            return res.status(400).json({ "Mensaje": "ID de sitio no proporcionado" });
        }

        let sql = `select idAmbientes,sit_nombre,tipo_sitio,area_nombre from sitios 
                    INNER JOIN tipo_sitio ON sit_fk_tipo_sitio = idTipo_sitio 
                    INNER JOIN areas ON sit_fk_areas = idArea 
                    where idAmbientes = ?`;

        const [resultadoSitio] = await conexion.query(sql, [idAmbientes]);

        if (resultadoSitio.length > 0) {
          res.status(200).json({
            "Mensaje": "Sitio encontrado",
            resultadoSitio
          });
        } else {
          return res.status(404).json({ "Mensaje": "No se encontró el Sitio" });
        }
    } catch (error) {
        return res.status(500).json({ "Mensaje": "Error en el servidor", error });
    }
}

export const listarSitiosPorArea = async (req, res) => {
    try {
        let idArea = req.params.id_area;
        let sql = `
        SELECT sitios.idAmbientes, sitios.sit_nombre, sitios.img_sitio, tipo_sitio.tipo_sitio, areas.area_nombre
        FROM sitios
        INNER JOIN tipo_sitio ON sitios.sit_fk_tipo_sitio = tipo_sitio.idTipo_sitio
        INNER JOIN areas ON sitios.sit_fk_areas = areas.idArea
        WHERE areas.idArea = ?
        `;

        const [resultadoSitios] = await conexion.query(sql, [idArea]);

        if (resultadoSitios.length > 0) {
            res.status(200).json({
                "Mensaje": "Sitios encontrados",
                resultadoSitios
            });
        } else {
            return res.status(404).json({
                "Mensaje": "No se encontraron sitios para el área especificada"
            });
        }
    } catch (error) {
        return res.status(500).json({
            "Mensaje": "Error en el servidor",
            error
        });
    }
}