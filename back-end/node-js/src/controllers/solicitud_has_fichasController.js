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
