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
export const cargarImagenArea = upload.single('img');

export const listarArea = async (req, res) => {
  try {
    const sql = "SELECT idArea, sede_nombre, area_nombre FROM areas INNER JOIN sedes ON area_fk_sedes = idSede";
    const [resultadoArea] = await conexion.query(sql);

    if (resultadoArea.length > 0) {
      return res.status(200).json({ mensaje: "Áreas encontradas", resultadoArea });
    } else {
      return res.status(404).json({ mensaje: "No se encontraron áreas" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const registrarArea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { area_nombre, area_fk_sedes } = req.body;
  const img_area = req.file ? req.file.originalname : null;

  try {
    const sql = "INSERT INTO areas (area_nombre, img_area, area_fk_sedes) VALUES (?, ?, ?)";
    const [respuesta] = await conexion.query(sql, [area_nombre, img_area, area_fk_sedes]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Área registrada correctamente" });
    } else {
      return res.status(400).json({ mensaje: "No se registró el área" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const eliminarArea = async (req, res) => {
  const idArea = req.params.id_area;

  try {
    const sql = "DELETE FROM areas WHERE idArea = ?";
    const [respuesta] = await conexion.query(sql, [idArea]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Área eliminada con éxito" });
    } else {
      return res.status(404).json({ mensaje: "No se eliminó el área" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const editarArea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const id = req.params.id_area;

  try {

    const sqlSelect = "SELECT * FROM areas WHERE idArea = ?";
    const [resultadoArea] = await conexion.query(sqlSelect, [id]);

    if (resultadoArea.length === 0) {
      return res.status(404).json({ mensaje: "Área no encontrada" });
    }

    const areaExistente = resultadoArea[0];

    const { area_nombre = areaExistente.area_nombre } = req.body;
    const img_area = req.file ? req.file.originalname : areaExistente.img_area;

    const sqlUpdate = "UPDATE areas SET area_nombre = ?, img_area = ? WHERE idArea = ?";
    const [respuesta] = await conexion.query(sqlUpdate, [area_nombre, img_area, id]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Área actualizada con éxito" });
    } else {
      return res.status(400).json({ mensaje: "No se actualizó el área" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const listarAreaPorId = async (req, res) => {
  const idArea = req.params.id_area;

  if (!idArea) {
    return res.status(400).json({ mensaje: "ID de área no proporcionado" });
  }

  try {
    const sql = "SELECT idArea, sede_nombre, area_nombre FROM areas INNER JOIN sedes ON area_fk_sedes = idSede WHERE idArea = ?";
    const [resultadoArea] = await conexion.query(sql, [idArea]);

    if (resultadoArea.length > 0) {
      return res.status(200).json({ mensaje: "Área encontrada", resultadoArea });
    } else {
      return res.status(404).json({ mensaje: "No se encontró el área" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const listarAreasPorSede = async (req, res) => {
  const idSede = req.params.id_sede;

  try {
    const sql = `
      SELECT areas.idArea, areas.area_nombre, areas.img_area, sedes.sede_nombre
      FROM areas
      INNER JOIN sedes ON areas.area_fk_sedes = sedes.idSede
      WHERE sedes.idSede = ?
    `;
    const [resultadoAreas] = await conexion.query(sql, [idSede]);

    if (resultadoAreas.length > 0) {
      return res.status(200).json({ mensaje: "Áreas encontradas", resultadoAreas });
    } else {
      return res.status(404).json({ mensaje: "No se encontraron áreas para la sede especificada" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};