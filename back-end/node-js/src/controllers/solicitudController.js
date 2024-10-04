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

/* export const obtenerSolicitudes = async (req, res) => {
  try {
    const consultaSQL =
      "select * from solicitud_mantenimiento where soli_estado = 'pendiente'";

    const [resultadoConsulta] = await conexion.query(consultaSQL);

    return res.status(200).json(resultadoConsulta);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor", error });
  }
}; */
/* export const obtenerSolicitudes = async (req, res) => {
  try {
    const consultaSQL = `
      SELECT 
        idSolicitud,
        soli_prioridad,
        soli_descripcion_problemas,
        soli_costo_estimado,
        soli_observaciones,
        soli_estado,
        fecha_solicitud,
        nombre_solicitante,
        correo_solicitante,
        fi_placa_sena,
        acti_nombre,
        acti_descripcion
      FROM solicitud_mantenimiento
      INNER JOIN solicitud_has_fichas ON solicitud_mantenimiento.idSolicitud = solicitud_has_fichas.fk_solicitud
      INNER JOIN fichas_maquinas_equipos ON solicitud_has_fichas.fk_fichas = fichas_maquinas_equipos.idFichas
      LEFT JOIN actividades ON solicitud_mantenimiento.idSolicitud = actividades.acti_fk_solicitud
      WHERE solicitud_mantenimiento.soli_estado = 'pendiente'
    `;

    const [resultadoConsulta] = await conexion.query(consultaSQL);

    return res.status(200).json(resultadoConsulta);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor", error });
  }
}; */

export const obtenerSolicitudes = async (req, res) => {
  try {
    const consultaSQL = `
      SELECT DISTINCT
        sm.idSolicitud,
        sm.soli_prioridad,
        sm.soli_descripcion_problemas,
        sm.soli_costo_estimado,
        sm.soli_observaciones,
        sm.soli_estado,
        sm.temas_legal,
        sm.fecha_solicitud,
        sm.nombre_solicitante,
        sm.correo_solicitante,
        fme.fi_placa_sena,
        GROUP_CONCAT(DISTINCT a.acti_nombre SEPARATOR ', ') AS acti_nombres,
        GROUP_CONCAT(DISTINCT a.acti_descripcion SEPARATOR ', ') AS acti_descripciones
      FROM solicitud_mantenimiento sm
      INNER JOIN solicitud_has_fichas shf ON sm.idSolicitud = shf.fk_solicitud
      INNER JOIN fichas_maquinas_equipos fme ON shf.fk_fichas = fme.idFichas
      LEFT JOIN actividades a ON sm.idSolicitud = a.acti_fk_solicitud
      WHERE sm.soli_estado = 'pendiente'
      GROUP BY sm.idSolicitud, sm.soli_prioridad, sm.soli_descripcion_problemas, 
               sm.soli_costo_estimado, sm.soli_observaciones, sm.soli_estado, 
               sm.temas_legal, sm.fecha_solicitud, sm.nombre_solicitante, 
               sm.correo_solicitante, fme.fi_placa_sena
    `;

    const [resultadoConsulta] = await conexion.query(consultaSQL);

    return res.status(200).json(resultadoConsulta);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor", error });
  }
};


export const actualizarSolicitudes = async(req, res)=>{
  try{
      
    const resultado = validarSolicitud_Mantenimiento(req.body);
    if (resultado.error)
      return res.status(400).json({ error: resultado.error.errors });
  

      let idSolicitud = req.params.idSolicitud

      let {
        prioridad,
        descripcion, 
        costo_estimado, 
        observaciones, 
        estado, 
        temaLegal, 
        nombre_solicitante,
        correo_solicitante
      }= req.body

      let sql = `
      UPDATE solicitud_mantenimiento 
      SET  
        soli_prioridad = '${prioridad}', 
        soli_descripcion_problemas = '${descripcion}', 
        soli_costo_estimado = '${costo_estimado}', 
        soli_observaciones = '${observaciones}', 
        soli_estado = '${estado}', 
        temas_legal = '${temaLegal}', 
        nombre_solicitante = '${nombre_solicitante}', 
        correo_solicitante = '${correo_solicitante}'
      WHERE 
        idSolicitud = ${idSolicitud}
    `;

      let [respuesta] = await conexion.query(sql)
      console.log(respuesta)
  
      if(respuesta.affectedRows>0){
          return res.status(200).json({"mensaje":"Se actualizo correctamente la solicitud"})
      }
      else{
          return res.status(404).json({"mensaje":"Error al actualizar solicitud"})
      }
      
  }catch(error){
      return res.status(500).json({"mensaje":"Error del servidor"})
  }
}


export const listarSolicitudPorId = async (req, res) => {
  try {
    const { idSolicitud } = req.params;
    console.log("ID de la solicitud:", idSolicitud); // Agregar para depurar
    const sql = `
      SELECT
          idSolicitud,
          soli_prioridad,
          soli_descripcion_problemas,
          soli_costo_estimado,
          soli_observaciones,
          soli_estado,
          temas_legal,
          fecha_solicitud,
          nombre_solicitante,
          correo_solicitante,
          acti_nombre,
          acti_descripcion,
          fi_placa_sena
      FROM
         solicitud_mantenimiento 
      JOIN 
          solicitud_has_fichas ON idSolicitud = fk_solicitud
      JOIN 
          fichas_maquinas_equipos ON fk_fichas = idFichas
      JOIN 
          actividades ON acti_fk_solicitud = idSolicitud
      WHERE
          idSolicitud = ?
    `;

    const [result] = await conexion.query(sql, [idSolicitud]);

    if (result.length > 0) {
      const mantenimiento = {
        idSolicitud: result[0].idSolicitud,
        soli_prioridad: result[0].soli_prioridad,
        soli_descripcion_problemas: result[0].soli_descripcion_problemas,
        soli_costo_estimado: result[0].soli_costo_estimado,
        soli_observaciones: result[0].soli_observaciones,
        soli_estado: result[0].soli_estado,
        temas_legal: result[0].temas_legal,
        fecha_solicitud: result[0].fecha_solicitud,
        nombre_solicitante: result[0].nombre_solicitante,
        correo_solicitante: result[0].correo_solicitante,
        acti_nombre: result[0].acti_nombre,
        acti_descripcion: result[0].acti_descripcion,
        fi_placa_sena: result[0].fi_placa_sena
      };

      res.status(200).json(mantenimiento);
    } else {
      res.status(404).json({
        message: "No se encontró un solicitud con ese id.",
      });
    }
  } catch (err) {
    console.error("Error en listarSolicitudPorId:", err);
    res.status(500).json({
      message: "Error en el controlador listarSolicitudPorId: " + err.message,
    });
  }
};

