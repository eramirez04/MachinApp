import { conexion } from "../database/database.js";

export const registrar = async (req, res) => {
  try {
    const datos = req.body;

    const promesas = datos.map((element) => {
      return conexion.query(
        "INSERT INTO solicitud_has_fichas (fk_solicitud, fk_fichas) VALUES (?, ?);",
        [element.fk_solicitud, element.fk_ficha]
      );
    });

    // Espera a que todas las promesas se resuelvan
    const resultados = await Promise.all(promesas);

    if (resultados)
      return res.status(201).json({ mensaje: "se registro con exito" });
  } catch (error) {
    return res.status(500).json({ Mensaje: "Error en el servidor" + error });
  }
};
export const actualizar = async (req, res) => {
  try {
    let { fk_fichas } = req.body;
    let id = req.params.id_solicitud_has_fichas;

    let sql = `UPDATE solicitud_has_fichas SET fk_fichas = ? WHERE id_solicitud_has_fichas = ?`;

    const [respuesta] = await conexion.query(sql, [fk_fichas, id]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ message: "Se actualizó con éxito" });
    } else {
      return res.status(404).json({ message: "No se actualizó" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error: " + error.message });
  }
};
export const listarFichas_has_Solicitudes = async (req, res) => {     
  try {
      const { idSolicitud } = req.params;
      let sql = `SELECT 
                  id_solicitud_has_fichas,
                  fk_fichas
                 FROM solicitud_has_fichas
                 JOIN solicitud_mantenimiento ON idSolicitud = fk_solicitud
                 WHERE idSolicitud = ?`;

      const [resultadoActividad] = await conexion.query(sql, [idSolicitud]);

      if (resultadoActividad.length > 0) {
          res.status(200).json({
              "Mensaje": "Actividad encontrada",
              resultadoActividad
          });
      } else {
          return res.status(404).json({
              "Mensaje": "No se encontraron actividades"
          });
      }
  } catch (err) {
      res.status(500).json({ "message": "Error en el servidor: " + err });
  }
};


