import { conexion } from "../database/database.js";
import { validationResult } from "express-validator";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, img, cb) {
    cb(null, "public/imagenes");
  },
  filename: function (req, img, cb) {
    cb(null, img.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImagenSede = upload.single("img");

export const listarSede = async (req, res) => {
  try {
    let sql =
      "SELECT idSede, sede_nombre_centro, sede_nombre, sede_descripcion, sede_regional, sede_municipio, sede_direccion, sede_subdirector, img_sede FROM sedes";
    const [resultadoSede] = await conexion.query(sql);

    if (resultadoSede.length > 0) {
      res.status(200).json({
        Mensaje: "sede encontrado",
        resultadoSede,
      });
    } else {
      return res.status(404).json({ Mensaje: "No se encontraron sede" });
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor", error });
  }
};

export const registrarSede = async (req, res) => {
  try {
    const error = validationResult(req.body);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }

    let {
      sede_nombre_centro,
      sede_nombre,
      sede_descripcion,
      sede_regional,
      sede_municipio,
      sede_direccion,
      sede_subdirector,
    } = req.body;

    let img_sede = req.file.originalname;

    let sql = `insert into sedes (sede_nombre_centro, sede_nombre, sede_descripcion, sede_regional, sede_municipio, sede_direccion, sede_subdirector, img_sede)
        values ('${sede_nombre_centro}', '${sede_nombre}',' ${sede_descripcion}', '${sede_regional}', '${sede_municipio}', '${sede_direccion}', '${sede_subdirector}', '${img_sede}')`;

    const [respuesta] = await conexion.query(sql);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ message: "Sede registrada correctamente" });
    } else {
      return res.status(404).json({ message: "No se registró la sede" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

export const eliminarSede = async (req, res) => {
  try {
    let idSedes = req.params.id_sede;

    let sql = `delete from sedes where idSede = ${idSedes}`;

    const [respuesta] = await conexion.query(sql);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ message: "Se eliminó con éxito" });
    } else {
      return res.status(404).json({ message: "No se eliminó la sede" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

export const editarSede = async (req, res) => {
  try {
    const error = validationResult(req.body);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }

    let {
      sede_nombre_centro,
      sede_nombre,
      sede_descripcion,
      sede_regional,
      sede_municipio,
      sede_direccion,
      sede_subdirector,
    } = req.body;
    let img_sede = req.file.originalname;
    let id = req.params.id_sede;

    let sql = `update sedes set sede_nombre_centro = '${sede_nombre_centro}', sede_nombre = '${sede_nombre}', sede_descripcion = '${sede_descripcion}', sede_regional = '${sede_regional}', sede_municipio = '${sede_municipio}', sede_direccion = '${sede_direccion}', sede_subdirector = '${sede_subdirector}', img_sede = '${img_sede}' where idSede = ${id}`;

    const [respuesta] = await conexion.query(sql);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ message: "Se registró con éxito" });
    } else {
      return res.status(404).json({ message: "No se actualizó la sede" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

export const listarSedePorId = async (req, res) => {
  try {
    let idSedes = req.params.id_sede;
    let sql =
      "SELECT idSede, sede_nombre_centro, sede_nombre, sede_descripcion, sede_regional, sede_municipio, sede_direccion, sede_subdirector, img_sede FROM sedes WHERE idSede = ?";

    const [resultadoSede] = await conexion.query(sql, [idSedes]);

    if (resultadoSede.length > 0) {
      res.status(200).json({
        Mensaje: "Sede encontrada",
        resultadoSede,
      });
    } else {
      return res.status(404).json({
        Mensaje: "No se encontró la sede",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Mensaje: "Error en el servidor",
      error,
    });
  }
};