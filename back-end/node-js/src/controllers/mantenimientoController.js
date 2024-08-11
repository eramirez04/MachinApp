import { conexion } from '../database/database.js';
import {validationResult} from 'express-validator'


/* listo */
export const listarRequerimiento5 = async (req, res) => {
    try {
        let sql = `
            SELECT idMantenimiento, mant_codigo_mantenimiento, mant_estado, mant_fecha_proxima
            FROM mantenimiento 
        `;
        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron mantenimientos en la base de datos." });
        }
    }
    catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarRequerimiento5: " + err });
    }
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
                html: html
            });
        }

        console.log("Todos los correos electrónicos enviados correctamente.");
    } catch (error) {
        console.error("Error al enviar correos electrónicos:", error);
    }
};

setInterval(verificarEnvioCorreosMantenimiento, 24 * 60 * 60 * 1000);

/* ejecuta el codigo para verificar cada dia */
setInterval(verificarEnvioCorreosMantenimiento, 24 * 60 * 60 * 1000); 
/* setInterval(verificarEnvioCorreosMantenimiento, 10 * 1000); */


/* 5.2 listo busqueda por id de mantenimiento y que aparesca todas las actividades */
export const listarMantenimientoPorId = async (req, res) => {
    try {
        const { idMantenimiento } = req.params;
        let sql = `
            SELECT a.idActividades, a.acti_nombre, a.acti_descripcion, a.acti_fecha_realizacion, a.acti_estado, m.idMantenimiento
            FROM mantenimiento AS m
            JOIN solicitud_mantenimiento AS sm ON m.fk_solicitud_mantenimiento = sm.idSolicitud
            JOIN actividades AS a ON sm.idSolicitud = a.acti_fk_solicitud
            WHERE m.idMantenimiento = ?`;
        const [result] = await conexion.query(sql, [idMantenimiento]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron actividades con el ID de mantenimiento especificado" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarMantenimientoPorId: " + err });
    }
};

/* arreglar */
export const registrarMantenimiento = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {
            mant_codigo_mantenimiento,
            mant_estado,
            mant_fecha_proxima,
            fi_placa_sena,
            tipo_mantenimiento,
            mant_descripcion,
            mant_ficha_soporte,
            mant_costo_final
        } = req.body;
        
        // Consultar la tabla fichas_maquinas_equipos para obtener idFichas
        let [fichasResult] = await conexion.query(`SELECT idFichas FROM fichas_maquinas_equipos WHERE fi_placa_sena = ?`, [fi_placa_sena]);
        if (fichasResult.length === 0) {
            return res.status(400).json({"mensaje": "Ficha no encontrada"});
        }
        const idFichas = fichasResult[0].idFichas;
        
        // Consultar la tabla tipo_mantenimiento para obtener idTipo_mantenimiento
        let [tipoMantenimientoResult] = await conexion.query(`SELECT idTipo_mantenimiento FROM tipo_mantenimiento WHERE tipo_mantenimiento = ?`, [tipo_mantenimiento]);
        if (tipoMantenimientoResult.length === 0) {
            return res.status(400).json({"mensaje": "Tipo de mantenimiento no encontrado"});
        }
        const fk_tipo_mantenimiento = tipoMantenimientoResult[0].idTipo_mantenimiento;
        
        // Crear una nueva solicitud de mantenimiento
        const [solicitudResult] = await conexion.query(`
            INSERT INTO solicitud_mantenimiento (soli_descripcion_problemas, soli_estado) 
            VALUES (?, 'Pendiente')`, [mant_descripcion]);
        const idSolicitud = solicitudResult.insertId;
        
        // Insertar en solicitud_has_fichas
        await conexion.query(`
            INSERT INTO solicitud_has_fichas (fk_solicitud, fk_fichas) 
            VALUES (?, ?)`, [idSolicitud, idFichas]);
        
        // Insertar el nuevo mantenimiento con los campos adicionales
        const [mantenimientoResult] = await conexion.query(`
            INSERT INTO mantenimiento (
                mant_codigo_mantenimiento, 
                mant_estado,
                mant_fecha_proxima, 
                fk_tipo_mantenimiento,
                mant_descripcion,
                mant_ficha_soporte,
                mant_costo_final,
                fk_solicitud_mantenimiento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [mant_codigo_mantenimiento, mant_estado, mant_fecha_proxima, fk_tipo_mantenimiento, mant_descripcion, mant_ficha_soporte, mant_costo_final, idSolicitud]
        );
        
        if (mantenimientoResult.affectedRows > 0) {
            return res.status(200).json({"mensaje": "Se registró el mantenimiento con éxito"});
        } else {
            return res.status(404).json({"mensaje": "No se registró con éxito el mantenimiento"});
        }
    } catch (e) {
        return res.status(500).json({"mensaje": "Error: " + e.message});
    }
};

/* funciola al parecer pero toca ver,    busca el mantenimiento por id de la ficha  */
export const mantenimientoDeMaquinas = async (req, res) => {
    try {
        const { idFichas } = req.params; 
        let sql = `
            SELECT Distinct m.idMantenimiento, m.mant_codigo_mantenimiento, m.mant_fecha_proxima, 
                   m.mant_estado, m.mant_descripcion, m.fk_tipo_mantenimiento
            FROM mantenimiento m
            JOIN solicitud_mantenimiento sm ON m.fk_solicitud_mantenimiento = sm.idSolicitud
            JOIN solicitud_has_fichas shf ON sm.idSolicitud = shf.fk_solicitud
            WHERE shf.fk_fichas = ?`;

        const [result] = await conexion.query(sql, [idFichas]); 
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron mantenimientos relacionados con esa ficha." });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador mantenimientoDeMaquinas: " + err });
    }
};


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
                m.mant_fecha_proxima AS mant_fecha_realizacion,
                a.acti_estado,
                a.idActividades,
                a.acti_nombre,
                tm.tipo_mantenimiento,
                fme.idFichas,
                fme.fi_fecha_inicio_garantia,
                fme.fi_fecha_fin_garantia,
                fme.fi_descripcion_garantia
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
            const requerimientos = [];
            const idsProcesados = new Set();

            for (let i = 0; i < result.length; i++) {
                const row = result[i];
                
                if (!idsProcesados.has(row.idMantenimiento)) {
                    const requerimiento = {
                        idMantenimiento: row.idMantenimiento,
                        referencia_maquina: row.referencia_maquina,
                        codigo_mantenimiento: row.mant_codigo_mantenimiento,
                        descripcion_mantenimiento: row.mant_descripcion,
                        fecha_realizacion: new Date(row.mant_fecha_realizacion).toLocaleDateString('es-ES'), // Formateo de la fecha
                        estado_maquina: row.acti_estado,
                        idActividades: row.idActividades,
                        acti_nombre: row.acti_nombre,
                        tipo_mantenimiento: row.tipo_mantenimiento,
                        idFichas: row.idFichas,
                        fi_fecha_inicio_garantia: row.fi_fecha_inicio_garantia ? new Date(row.fi_fecha_inicio_garantia).toLocaleDateString('es-ES') : null, // Formateo de la fecha
                        fi_fecha_fin_garantia: row.fi_fecha_fin_garantia ? new Date(row.fi_fecha_fin_garantia).toLocaleDateString('es-ES') : null, // Formateo de la fecha
                        fi_descripcion_garantia: row.fi_descripcion_garantia
                    };
                    requerimientos.push(requerimiento);
                    idsProcesados.add(row.idMantenimiento);
                }
            }

            res.status(200).json(requerimientos);
        } else {
            res.status(404).json({ "message": "No se encontraron mantenimientos en la base de datos." });
        }
    } catch (err) {
        console.error("Error en listartodosmantenimientos:", err);
        res.status(500).json({ "message": "Error en el controlador listartodosmantenimientos", "error": err.message });
    }
};

/* arreglar */
export const listarMantenimientoPorFicha = async (req, res) => {
    try {
        const { mant_ficha_soporte } = req.params;
        let sql = `SELECT a.idActividades, a.acti_nombre, a.acti_descripcion, a.acti_fecha_realizacion, a.acti_estado, a.acti_fk_solicitud 
                    FROM mantenimiento AS m
                    JOIN solicitud_mantenimiento AS sm ON m.fk_solicitud_mantenimiento = sm.idSolicitud
                    JOIN actividades AS a ON sm.idSolicitud = a.acti_fk_solicitud
                    WHERE m.mant_ficha_soporte = ?`;
        const [result] = await conexion.query(sql, [mant_ficha_soporte]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron actividades para la ficha de soporte especificada" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarMantenimientoPorFicha: " + err });
    }
};

export const listarMantenimientoPorId_mantenimiento = async (req, res) => {
    try {
        const { mant_codigo_mantenimiento } = req.params;

        let sql = `SELECT idMantenimiento, mant_codigo_mantenimiento, mant_fecha_proxima, mant_descripcion, 
                          mant_ficha_soporte, mant_estado, mant_costo_final, fk_tipo_mantenimiento, fk_solicitud_mantenimiento
                   FROM mantenimiento 
                   WHERE mant_codigo_mantenimiento = ?`;

        const [result] = await conexion.query(sql, [mant_codigo_mantenimiento]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No se encontró mantenimiento con el código especificado" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error en el controlador listarMantenimientoPorId_mantenimiento: " + err.message });
    }
};


/* verificar ,eliminar mantenimiento */
export const eliminarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;

        let sql = 'DELETE FROM mantenimiento WHERE idMantenimiento = ?';

        const [result] = await conexion.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ "message": "Mantenimiento eliminado exitosamente." });
        } else {
            res.status(404).json({ "message": "No se encontró el mantenimiento con el ID especificado." });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador eliminarMantenimiento: " + err });
    }
};
/* verificar actualizar */
export const actualizarMantenimiento = async (req, res) => {
    try {
        let { mant_codigo_mantenimiento, mant_fecha_proxima, mant_descripcion, mant_estado, mant_costo_final, fk_tipo_mantenimiento, fk_solicitud_mantenimiento } = req.body;
        let id = req.params.id;

        let sql = `UPDATE mantenimiento 
        SET mant_codigo_mantenimiento = ?, 
            mant_fecha_proxima = ?, 
            mant_descripcion = ?, 
            mant_estado = ?,
            mant_costo_final = ?,
            fk_tipo_mantenimiento = ?,
            fk_solicitud_mantenimiento = ?
        WHERE idMantenimiento = ?`;

        const [respuesta] = await conexion.query(sql, [
            mant_codigo_mantenimiento,
            mant_fecha_proxima,
            mant_descripcion,
            mant_estado,
            mant_costo_final,
            fk_tipo_mantenimiento,
            fk_solicitud_mantenimiento,
            id
        ]);

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message": "Se actualizó con éxito" });
        } else {
            return res.status(404).json({ "message": "No se encontró el mantenimiento para actualizar" });
        }
    } catch (e) {
        return res.status(500).json({ "message": "Error: " + e });
    }
}
