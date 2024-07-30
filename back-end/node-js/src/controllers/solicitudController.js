import { conexion } from "../database/database.js";
import { validarSolicitud_Mantenimiento } from "../../validar/validarSolicitudMantenimiento.js";

export const registarSolicitud = async (req, res) => {
  try {
    const resultado = validarSolicitud_Mantenimiento(req.body);

    if (resultado.error)
      return res.status(400).json({ error: resultado.error.errors });

    const {
      prioridad,
      descripcion,
      costo_estimado,
      obsevaciones,
      temaLegal,
      nombre_solicitante,
      correo_solicitante,
    } = req.body;

    const estado = "pendiente";

    const [resultadoSql] = await conexion.query(
      `INSERT INTO solicitud_mantenimiento 
      (soli_prioridad, soli_descripcion_problemas, soli_costo_estimado, soli_observaciones, soli_estado,temas_legal, nombre_solicitante, correo_solicitante) 
      VALUES
     (?,?,?,?,?,?,?,?);`,
      [
        prioridad,
        descripcion,
        costo_estimado,
        obsevaciones,
        estado,
        temaLegal,
        nombre_solicitante,
        correo_solicitante,
      ]
    );

    if (resultadoSql.affectedRows === 0)
      return res.status(400).json({
        mensaje: "no se puedo registrar la solicitud para los mantenimientos",
      });

    return res.status(201).json({
      mensaje: "nueva solicitud registrada ",
      data_id: resultadoSql.insertId,
    });
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor" + error });
  }
};

export const obtenerSolicitudes = async (req, res) => {
  try {
    const consultaSQL = "select * from solicitud_mantenimiento";

    const [hola] = await conexion.query(consultaSQL);

    console.log(hola);

    return res.status(200).json(hola);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor", error });
  }
};
