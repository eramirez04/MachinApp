import { conexion } from "../database/database.js";
import { validationResult } from "express-validator";
import multer from "multer";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/pdfs");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Renombrar el archivo para evitar colisiones
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF"), false);
    }
  },
});

// Middleware para manejar la subida del archivo
export const cargarMantenimiento = upload.single("mant_ficha_soporte");

export const registrarMantenimiento = async (req, res) => {
  cargarMantenimiento(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ mensaje: err.message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      mant_codigo_mantenimiento,
      mant_estado,
      mant_fecha_proxima,
      mant_descripcion,
      mant_costo_final,
      fk_tipo_mantenimiento,
      fk_solicitud_mantenimiento,
    } = req.body;

    const mant_ficha_soporte = req.file ? req.file.path : null;

    try {
      const sql = `
          INSERT INTO mantenimiento (
            mant_codigo_mantenimiento,
            mant_estado,
            mant_fecha_proxima,
            fk_tipo_mantenimiento,
            mant_descripcion,
            mant_ficha_soporte,
            mant_costo_final,
            fk_solicitud_mantenimiento
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
      const [resultado] = await conexion.query(sql, [
        mant_codigo_mantenimiento,
        mant_estado,
        mant_fecha_proxima,
        fk_tipo_mantenimiento,
        mant_descripcion,
        mant_ficha_soporte,
        mant_costo_final,
        fk_solicitud_mantenimiento,
      ]);

      if (resultado.affectedRows > 0) {
        // Obtener el id del nuevo mantenimiento
        const idMantenimiento = resultado.insertId;
        return res.status(200).json({
          mensaje: "Se registró el mantenimiento con éxito",
          idMantenimiento,
        });
      } else {
        return res
          .status(400)
          .json({ mensaje: "No se registró el mantenimiento" });
      }
    } catch (e) {
      return res.status(500).json({ mensaje: "Error: " + e.message });
    }
  });
};

/* 5.1 Generar alertas de mantenimiento de a través de correo electrónico */
import { mantenimiento_correo } from "../config/mantenimiento_email/email_mantenimineto.js";
import { emailHtml_mantenimiento } from "../config/mantenimiento_email/emailhtml_mantenimiento.js";

/* Listo función para verificar y enviar correos electrónicos de mantenimiento automáticamente */
export const verificarEnvioCorreosMantenimiento = async () => {
  try {
    let sql = `
        SELECT u.*, m.*, a.*, tm.*, fme.fi_placa_sena AS referencia_maquina
        FROM usuarios u
        JOIN tecnicos_has_actividades tha ON u.idUsuarios = tha.fk_usuarios
        JOIN actividades a ON tha.fk_actividades = a.idActividades
        JOIN solicitud_mantenimiento sm ON a.acti_fk_solicitud = sm.idSolicitud
        JOIN mantenimiento m ON sm.idSolicitud = m.fk_solicitud_mantenimiento
        JOIN tipo_mantenimiento tm ON m.fk_tipo_mantenimiento = tm.idTipo_mantenimiento
        JOIN solicitud_has_fichas shf ON sm.idSolicitud = shf.fk_solicitud
        JOIN fichas_maquinas_equipos fme ON shf.fk_fichas = fme.idFichas
        WHERE DATEDIFF(m.mant_fecha_proxima, CURDATE()) <= 7
        `;

    const [mantenimientos] = await conexion.query(sql);

    if (mantenimientos.length === 0) {
      console.log("No hay mantenimientos programados en 7 días o menos.");
      return;
    }

    for (const mantenimiento of mantenimientos) {
      const html = emailHtml_mantenimiento(mantenimiento);
      await mantenimiento_correo.sendMail({
        from: '"MachinApp" <machinappsena@gmail.com>',
        to: mantenimiento.us_correo,
        subject: "Recordatorio de Mantenimiento",
        html: html,
      });
    }

    console.log("Todos los correos electrónicos enviados correctamente.");
  } catch (error) {
    console.error("Error al enviar correos electrónicos:", error);
  }
};

/* ejecuta el codigo para verificar cada dia */
setInterval(verificarEnvioCorreosMantenimiento, 24 * 60 * 60 * 1000);
/* setInterval(verificarEnvioCorreosMantenimiento, 10 * 1000); */

/* front-end */
/* listo listar mantenimientos */
export const listartodosmantenimientos = async (req, res) => {
  try {
    const sql = `
            SELECT
                fme.fi_placa_sena AS referencia_maquina,
                m.idMantenimiento,
                m.mant_codigo_mantenimiento,
                m.mant_descripcion,
                m.mant_estado,
                m.mant_fecha_proxima AS mant_fecha_realizacion,
                a.acti_estado,
                a.idActividades,
                a.acti_nombre,
                tm.tipo_mantenimiento,
                fme.idFichas,
                fme.fi_estado
            FROM
                mantenimiento m
            LEFT JOIN
                solicitud_mantenimiento sm ON m.fk_solicitud_mantenimiento = sm.idSolicitud
            LEFT JOIN
                solicitud_has_fichas shf ON sm.idSolicitud = shf.fk_solicitud
            LEFT JOIN
                fichas_maquinas_equipos fme ON shf.fk_fichas = fme.idFichas
            LEFT JOIN
                actividades a ON a.acti_fk_solicitud = sm.idSolicitud
            LEFT JOIN
                tipo_mantenimiento tm ON m.fk_tipo_mantenimiento = tm.idTipo_mantenimiento
        `;

    const [result] = await conexion.query(sql);

    if (result.length > 0) {
      const mantenimientos = [];
      const idsProcesados = new Set();

      for (let i = 0; i < result.length; i++) {
        const row = result[i];

        if (!idsProcesados.has(row.idMantenimiento)) {
          const mantenimiento = {
            idMantenimiento: row.idMantenimiento,
            referencia_maquina: row.referencia_maquina,
            codigo_mantenimiento: row.mant_codigo_mantenimiento,
            descripcion_mantenimiento: row.mant_descripcion,
            fecha_realizacion: new Date(
              row.mant_fecha_realizacion
            ).toLocaleDateString("es-ES"), // Formateo de la fecha
            estado_maquina: row.acti_estado,
            idActividades: row.idActividades,
            acti_nombre: row.acti_nombre,
            tipo_mantenimiento: row.tipo_mantenimiento,
            idFichas: row.idFichas,
            estado_ficha: row.fi_estado,
            mant_estado: row.mant_estado,
          };
          mantenimientos.push(mantenimiento);
          idsProcesados.add(row.idMantenimiento);
        }
      }

      res.status(200).json(mantenimientos);
    } else {
      res.status(404).json({
        message: "No se encontraron mantenimientos en la base de datos.",
      });
    }
  } catch (err) {
    console.error("Error en listartodosmantenimientos:", err);
    res.status(500).json({
      message:
        "Error en el controlador listartodosmantenimientos: " + err.message,
    });
  }
};

/* listo actualizar */
export const actualizarMantenimiento = async (req, res) => {
  cargarMantenimiento(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ mensaje: err.message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      mant_id, // ID del mantenimiento que se va a actualizar
      mant_codigo_mantenimiento,
      mant_estado,
      mant_fecha_proxima,
      mant_descripcion,
      mant_costo_final,
      fk_tipo_mantenimiento,
      fk_solicitud_mantenimiento,
    } = req.body;

    // Obtener la ruta del archivo
    const mant_ficha_soporte = req.file ? req.file.path : null;

    try {
      // Construir la consulta de actualización
      let sql = `
          UPDATE mantenimiento SET
            mant_codigo_mantenimiento = ?,
            mant_estado = ?,
            mant_fecha_proxima = ?,
            fk_tipo_mantenimiento = ?,
            mant_descripcion = ?,
            mant_costo_final = ?,
            fk_solicitud_mantenimiento = ?
        `;

      const params = [
        mant_codigo_mantenimiento,
        mant_estado,
        mant_fecha_proxima,
        fk_tipo_mantenimiento,
        mant_descripcion,
        mant_costo_final,
        fk_solicitud_mantenimiento,
      ];

      // Si hay un nuevo archivo PDF, incluirlo en la consulta
      if (mant_ficha_soporte) {
        sql += `, mant_ficha_soporte = ?`;
        params.push(mant_ficha_soporte);
      }

      sql += ` WHERE mant_id = ?`;
      params.push(mant_id);

      const [resultado] = await conexion.query(sql, params);

      if (resultado.affectedRows > 0) {
        return res
          .status(200)
          .json({ mensaje: "Se actualizó el mantenimiento con éxito" });
      } else {
        return res
          .status(400)
          .json({ mensaje: "No se actualizó el mantenimiento" });
      }
    } catch (e) {
      return res.status(500).json({ mensaje: "Error: " + e.message });
    }
  });
};

export const graficas = async (req, res) => {
  try {
    const sql = `
                SELECT 
          YEAR(mantenimiento.mant_fecha_proxima) AS anio,
          MONTH(mantenimiento.mant_fecha_proxima) AS mes,
          COUNT(mantenimiento.mant_fecha_proxima) as tota_mantenimientos,
          tipo_mantenimiento.tipo_mantenimiento,
          mantenimiento.mant_estado
          from mantenimiento

          INNER JOIN tipo_mantenimiento ON tipo_mantenimiento.idTipo_mantenimiento = mantenimiento.fk_tipo_mantenimiento

          GROUP BY anio, mes, tipo_mantenimiento.tipo_mantenimiento, mantenimiento.mant_estado
          ORDER by anio, mes;
        `;

    const [result] = await conexion.query(sql);
    console.log(result);

    /* if (result.length === 0) return res.status(404).json({ mensaje: "no" }); */

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(err);
  }
};
