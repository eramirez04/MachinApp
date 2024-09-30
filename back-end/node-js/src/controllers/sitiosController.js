import { conexion } from "../database/database.js";
import { validationResult } from "express-validator";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imagenes");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImagenSitio = upload.single("img");

export const listarSitio = async (req, res) => {
  try {
    const sql = `
      SELECT idAmbientes, sit_nombre, tipo_sitio, sit_fecha_registro, area_nombre, us_nombre AS instructor_encargado 
      FROM ambientes 
      INNER JOIN tipo_sitio ON sit_fk_tipo_sitio = idTipo_sitio 
      INNER JOIN areas ON sit_fk_areas = idArea 
      INNER JOIN usuarios ON sit_fk_usuarios = idUsuarios
    `;
    const [resultadoSitio] = await conexion.query(sql);

    if (resultadoSitio.length > 0) {
      return res
        .status(200)
        .json({ mensaje: "Sitios encontrados", resultadoSitio });
    } else {
      return res.status(404).json({ mensaje: "No se encontraron sitios" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const registrarSitio = async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { sit_nombre, sit_fk_areas, sit_fk_tipo_sitio, sit_fk_usuarios } =
    req.body;

  const [consulta] = await conexion.query(
    "select * from ambientes where  sit_fk_usuarios = ?;",
    [sit_fk_usuarios]
  );


  if(consulta.length > 0) {
    return res.status(400).json({mensaje: "Ya existe ambiente asigando al instructor"})
  }

  const img_sitio = req.file ? req.file.originalname : null;

  try {
    const sql = `
      INSERT INTO ambientes (sit_nombre, img_sitio, sit_fk_areas, sit_fk_tipo_sitio, sit_fk_usuarios)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [respuesta] = await conexion.query(sql, [
      sit_nombre,
      img_sitio,
      sit_fk_areas,
      sit_fk_tipo_sitio,
      sit_fk_usuarios,
    ]);

    if (respuesta.affectedRows > 0) {
      return res
        .status(200)
        .json({ mensaje: "Sitio registrado correctamente" });
    } else {
      return res.status(400).json({ mensaje: "No se registró el sitio" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const eliminarSitio = async (req, res) => {
  const idAmbientes = req.params.id_sitio;

  try {
    const sql = "DELETE FROM ambientes WHERE idAmbientes = ?";
    const [respuesta] = await conexion.query(sql, [idAmbientes]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Sitio eliminado con éxito" });
    } else {
      return res.status(404).json({ mensaje: "No se eliminó el sitio" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const editarSitio = async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const id = req.params.id_sitio;

  try {
    const sqlSelect = "SELECT * FROM ambientes WHERE idAmbientes = ?";
    const [resultadoSitio] = await conexion.query(sqlSelect, [id]);

    if (resultadoSitio.length === 0) {
      return res.status(404).json({ mensaje: "Sitio no encontrado" });
    }

    const sitioExistente = resultadoSitio[0];

    const {
      sit_nombre = sitioExistente.sit_nombre,
      sit_fecha_registro = sitioExistente.sit_fecha_registro,
      sit_fk_areas = sitioExistente.sit_fk_areas,
      sit_fk_tipo_sitio = sitioExistente.sit_fk_tipo_sitio,
      sit_fk_usuarios = sitioExistente.sit_fk_usuarios,
    } = req.body;

    const img_sitio = req.file
      ? req.file.originalname
      : sitioExistente.img_sitio;

    const sqlUpdate = `
      UPDATE ambientes 
      SET sit_nombre = ?, sit_fecha_registro = ?, sit_fk_areas = ?, sit_fk_tipo_sitio = ?, sit_fk_usuarios = ?, img_sitio = ?
      WHERE idAmbientes = ?
    `;
    const [respuesta] = await conexion.query(sqlUpdate, [
      sit_nombre,
      sit_fecha_registro,
      sit_fk_areas,
      sit_fk_tipo_sitio,
      sit_fk_usuarios,
      img_sitio,
      id,
    ]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Sitio actualizado con éxito" });
    } else {
      return res.status(400).json({ mensaje: "No se actualizó el sitio" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const listarSitioPorId = async (req, res) => {
  const idAmbientes = req.params.id_sitio;

  if (!idAmbientes) {
    return res.status(400).json({ mensaje: "ID de sitio no proporcionado" });
  }

  try {
    const sql = `
      SELECT idAmbientes, sit_nombre, tipo_sitio, sit_fecha_registro, area_nombre, us_nombre AS instructor_encargado 
      FROM ambientes 
      INNER JOIN tipo_sitio ON sit_fk_tipo_sitio = idTipo_sitio 
      INNER JOIN areas ON sit_fk_areas = idArea 
      INNER JOIN usuarios ON sit_fk_usuarios = idUsuarios 
      WHERE idAmbientes = ?
    `;
    const [resultadoSitio] = await conexion.query(sql, [idAmbientes]);

    if (resultadoSitio.length > 0) {
      return res
        .status(200)
        .json({ mensaje: "Sitio encontrado", resultadoSitio });
    } else {
      return res.status(404).json({ mensaje: "No se encontró el sitio" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const listarSitiosPorArea = async (req, res) => {
  const idArea = req.params.id_area;

  try {
    const sql = `
      SELECT ambientes.idAmbientes, ambientes.sit_nombre, ambientes.sit_fecha_registro, ambientes.img_sitio, tipo_sitio.tipo_sitio, areas.area_nombre, usuarios.us_nombre AS instructor_encargado
      FROM ambientes
      INNER JOIN tipo_sitio ON ambientes.sit_fk_tipo_sitio = tipo_sitio.idTipo_sitio
      INNER JOIN areas ON ambientes.sit_fk_areas = areas.idArea
      INNER JOIN usuarios ON ambientes.sit_fk_usuarios = usuarios.idUsuarios
      WHERE areas.idArea = ?
    `;
    const [resultadoSitios] = await conexion.query(sql, [idArea]);

    if (resultadoSitios.length > 0) {
      return res
        .status(200)
        .json({ mensaje: "Sitios encontrados", resultadoSitios });
    } else {
      return res
        .status(404)
        .json({
          mensaje: "No se encontraron sitios para el área especificada",
        });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};
