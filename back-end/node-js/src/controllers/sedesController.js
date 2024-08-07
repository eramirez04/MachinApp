import { conexion } from "../database/database.js";
import { validationResult } from "express-validator";
import multer from "multer";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imagenes");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImagenSede = upload.single("img");

export const listarSede = async (req, res) => {
  try {
    const sql = `
      SELECT * 
      FROM sedes
    `;
    const [resultadoSede] = await conexion.query(sql);

    if (resultadoSede.length > 0) {
      return res.status(200).json({ mensaje: "Sedes encontradas", resultadoSede });
    } else {
      return res.status(404).json({ mensaje: "No se encontraron sedes" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const registrarSede = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const {
    sede_nombre_centro,
    sede_nombre,
    sede_descripcion,
    sede_regional,
    sede_municipio,
    sede_direccion,
    sede_subdirector,
  } = req.body;

  const img_sede = req.file ? req.file.originalname : null;

  try {
    const sql = `
      INSERT INTO sedes (sede_nombre_centro, sede_nombre, sede_descripcion, sede_regional, sede_municipio, sede_direccion, sede_subdirector, img_sede)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [respuesta] = await conexion.query(sql, [
      sede_nombre_centro,
      sede_nombre,
      sede_descripcion,
      sede_regional,
      sede_municipio,
      sede_direccion,
      sede_subdirector,
      img_sede,
    ]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Sede registrada correctamente" });
    } else {
      return res.status(400).json({ mensaje: "No se registró la sede" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const eliminarSede = async (req, res) => {
  const idSedes = req.params.id_sede;

  try {
    const sql = "DELETE FROM sedes WHERE idSede = ?";
    const [respuesta] = await conexion.query(sql, [idSedes]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Sede eliminada con éxito" });
    } else {
      return res.status(404).json({ mensaje: "No se eliminó la sede" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const editarSede = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const id = req.params.id_sede;

  try {
    const sqlSelect = "SELECT * FROM sedes WHERE idSede = ?";
    const [resultadoSede] = await conexion.query(sqlSelect, [id]);

    if (resultadoSede.length === 0) {
      return res.status(404).json({ mensaje: "Sede no encontrada" });
    }

    const sedeExistente = resultadoSede[0];

    const {
      sede_nombre_centro = sedeExistente.sede_nombre_centro,
      sede_nombre = sedeExistente.sede_nombre,
      sede_descripcion = sedeExistente.sede_descripcion,
      sede_regional = sedeExistente.sede_regional,
      sede_municipio = sedeExistente.sede_municipio,
      sede_direccion = sedeExistente.sede_direccion,
      sede_subdirector = sedeExistente.sede_subdirector,
    } = req.body;

    const img_sede = req.file ? req.file.originalname : sedeExistente.img_sede;

    const sqlUpdate = `
      UPDATE sedes 
      SET sede_nombre_centro = ?, sede_nombre = ?, sede_descripcion = ?, sede_regional = ?, sede_municipio = ?, sede_direccion = ?, sede_subdirector = ?, img_sede = ?
      WHERE idSede = ?
    `;
    const [respuesta] = await conexion.query(sqlUpdate, [
      sede_nombre_centro,
      sede_nombre,
      sede_descripcion,
      sede_regional,
      sede_municipio,
      sede_direccion,
      sede_subdirector,
      img_sede,
      id,
    ]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ mensaje: "Sede actualizada con éxito" });
    } else {
      return res.status(400).json({ mensaje: "No se actualizó la sede" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const listarSedePorId = async (req, res) => {
  const idSedes = req.params.id_sede;

  try {
    const sql = `
      SELECT *
      FROM sedes 
      WHERE idSede = ?
    `;
    const [resultadoSede] = await conexion.query(sql, [idSedes]);

    if (resultadoSede.length > 0) {
      return res.status(200).json({ mensaje: "Sede encontrada", resultadoSede });
    } else {
      return res.status(404).json({ mensaje: "No se encontró la sede" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};