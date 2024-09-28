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
                m.mant_costo_final,
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
            mant_costo_final: row.mant_costo_final,
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
      mant_codigo_mantenimiento,
      mant_estado,
      mant_fecha_proxima,
      mant_descripcion,
      mant_costo_final,
      fk_tipo_mantenimiento,
      fk_solicitud_mantenimiento,
    } = req.body;

    // Obtener la ruta del archivo si existe
    const mant_ficha_soporte = req.file ? req.file.path : null;

    const { idMantenimiento } = req.params;

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

      if (mant_ficha_soporte) {
        sql += ', mant_ficha_soporte = ?';
        params.push(mant_ficha_soporte);
      }

      sql += ' WHERE idMantenimiento = ?';
      params.push(idMantenimiento);

      const [resultado] = await conexion.query(sql, params);

      if (resultado.affectedRows > 0) {
        return res.status(200).json({ mensaje: "Mantenimiento actualizado con éxito" });
      } else {
        return res.status(404).json({ mensaje: "Mantenimiento no encontrado" });
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
    

    /* if (result.length === 0) return res.status(404).json({ mensaje: "no" }); */

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(err);
  }
};


export const listarMantenimientoPorId = async (req, res) => {
  try {
    const { idMantenimiento } = req.params;


    const sql = `
      SELECT
          fme.fi_placa_sena AS referencia_maquina,
          m.idMantenimiento,
          m.mant_codigo_mantenimiento,
          m.mant_descripcion,
          m.mant_estado,
          m.mant_fecha_proxima,
          m.mant_costo_final,
          m.fk_solicitud_mantenimiento, 
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
      WHERE
          m.idMantenimiento = ?
    `;

    const [result] = await conexion.query(sql, [idMantenimiento]);

    if (result.length > 0) {
      const mantenimiento = {
        idMantenimiento: result[0].idMantenimiento,
        referencia_maquina: result[0].referencia_maquina,
        codigo_mantenimiento: result[0].mant_codigo_mantenimiento,
        descripcion_mantenimiento: result[0].mant_descripcion,
        mant_fecha_proxima: new Date(result[0].mant_fecha_proxima).toLocaleDateString("es-ES"),
        mant_costo_final: result[0].mant_costo_final,

        fk_solicitud_mantenimiento : result[0].fk_solicitud_mantenimiento ,

        estado_maquina: result[0].acti_estado,
        idActividades: result[0].idActividades,
        acti_nombre: result[0].acti_nombre,
        tipo_mantenimiento: result[0].tipo_mantenimiento,
        idFichas: result[0].idFichas,
        estado_ficha: result[0].fi_estado,
        mant_estado: result[0].mant_estado,
      };

      res.status(200).json(mantenimiento);
    } else {
      res.status(404).json({
        message: "No se encontró un mantenimiento con ese id.",
      });
    }
  } catch (err) {
    console.error("Error en listarMantenimientoPorId:", err);
    res.status(500).json({
      message: "Error en el controlador listarMantenimientoPorId: " + err.message,
    });
  }
};


export const excelconsultavariables = async (req, res) => {
  try {
    const sql = `
      SELECT 
        m.idMantenimiento,
        MAX(fme.fi_placa_sena) AS fi_placa_sena,
        m.mant_codigo_mantenimiento AS codigo_mantenimiento,
        MAX(CASE WHEN v.idVariable = 7 THEN df.det_valor END) AS fi_marca,
        MAX(CASE WHEN v.idVariable = 1 THEN df.det_valor END) AS fi_fecha_adquisicion,
        m.mant_fecha_proxima AS fecha_realizacion,
        MAX(CASE WHEN v.idVariable = 9 THEN df.det_valor END) AS fi_precioEquipo,
        MAX(te.ti_fi_nombre) AS nombre,
        m.mant_costo_final,
        m.mant_descripcion AS descripcion_mantenimiento,
        MAX(tm.tipo_mantenimiento) AS tipo_mantenimiento,
        MAX(a.sit_nombre) AS sit_nombre,
        MAX(ar.area_nombre) AS area_nombre,
        MAX(s.sede_nombre_centro) AS sede_nombre_centro,
        MAX(s.sede_nombre) AS sede_nombre,
        MAX(sm.soli_prioridad) AS soli_prioridad,
        GROUP_CONCAT(DISTINCT pm.par_nombre_repuesto SEPARATOR ', ') AS par_nombre_repuesto,
        SUM(pm.par_costo) AS par_costo_total
      FROM 
        mantenimiento m
        LEFT JOIN solicitud_mantenimiento sm ON m.fk_solicitud_mantenimiento = sm.idSolicitud
        LEFT JOIN solicitud_has_fichas shf ON sm.idSolicitud = shf.fk_solicitud
        LEFT JOIN fichas_maquinas_equipos fme ON shf.fk_fichas = fme.idFichas
        LEFT JOIN tipo_mantenimiento tm ON m.fk_tipo_mantenimiento = tm.idTipo_mantenimiento
        LEFT JOIN tipo_equipo te ON fme.fi_fk_tipo_ficha = te.idTipo_ficha
        LEFT JOIN detalles_fichas df ON fme.idFichas = df.det_fk_fichas
        LEFT JOIN variable v ON df.det_fk_variable = v.idVariable
        LEFT JOIN ambientes a ON fme.fi_fk_sitios = a.idAmbientes
        LEFT JOIN areas ar ON a.sit_fk_areas = ar.idArea
        LEFT JOIN sedes s ON ar.area_fk_sedes = s.idSede
        LEFT JOIN partes_mantenimiento pm ON m.idMantenimiento = pm.par_fk_mantenimientos
      GROUP BY 
        m.idMantenimiento
    `;
    const [resultado] = await conexion.query(sql);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error en excelconsultavariables:", error);
    res.status(500).json({
      message: "Error en el controlador excelconsultavariables: " + error.message
    });
  }
};