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
    const consultaSQL =
      "select * from solicitud_mantenimiento where soli_estado = 'pendiente'";

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
        obsevaciones, 
        estado, 
        temaLegal, 
        nombre_solicitante,
        correo_solicitante
      }= req.body

      let sql = `update solicitud_mantenimiento set  soli_prioridad = '${prioridad}', soli_descripcion_problemas = '${descripcion}' , soli_costo_estimado='${costo_estimado}', soli_observaciones='${obsevaciones}', 
      soli_estado = '${estado}', temas_legal='${temaLegal}', nombre_solicitante='${nombre_solicitante}',correo_solicitante = '${correo_solicitante}'
      where idSolicitud = ${idSolicitud}`


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