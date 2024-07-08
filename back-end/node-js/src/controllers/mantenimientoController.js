import { conexion } from '../database/database.js';
import {validationResult} from 'express-validator'

/* 5 listo funcional */
export const listarRequerimiento5 = async (req, res) => {
    try {
        let sql = `
            SELECT idMantenimiento ,mant_fecha_realizacion
            FROM mantenimiento 
            
        `;
        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron requerimientos de mantenimiento completos en la base de datos." });
        }
    }
    catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarRequerimiento5: " + err });
    }
}; 

/* 5.1 Generar alertas de mantenimiento de a través de correo electrónico */
import { mantenimiento_correo } from "../config/mantenimiento_email/email_mantenimineto.js";
import { emailHtml_mantenimiento } from "../config/mantenimiento_email/emailhtml_mantenimiento.js";

/* función para verificar y enviar correos electrónicos de mantenimiento automáticamente */
export const verificarEnvioCorreosMantenimiento = async () => {
    try {
        let sql = `
        SELECT usuarios.*, mantenimiento.*, actividades.*, tipo_mantenimiento.*, fichas.fi_placa_sena AS referencia_maquina
        FROM usuarios
        JOIN tecnicos_has_actividades ON usuarios.idUsuarios = tecnicos_has_actividades.fk_usuarios
        JOIN actividades ON tecnicos_has_actividades.fk_actividades = actividades.idActividades
        JOIN mantenimiento ON actividades.fk_mantenimiento = mantenimiento.idMantenimiento
        JOIN tipo_mantenimiento ON mantenimiento.fk_tipo_mantenimiento = tipo_mantenimiento.idTipo_mantenimiento
        JOIN fichas ON mantenimiento.mant_fk_fichas = fichas.idFichas
        WHERE DATEDIFF(mantenimiento.mant_fecha_proxima, CURDATE()) <= 7
        `;

        const [mantenimientos] = await conexion.query(sql);

        /* Si no hay mantenimientos a 7 días o menos, no hacemos nada */
        if (mantenimientos.length === 0) {
            console.log("No hay mantenimientos programados en 7 días o menos.");
            return;
        }

        /* Envío de correos electrónicos para cada mantenimiento encontrado */
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
        console.error("Error al enviar correos electrónicos:s", error);
    }
};

/* ejecuta el codigo para verificar cada dia */
setInterval(verificarEnvioCorreosMantenimiento, 24 * 60 * 60 * 1000); 
/* setInterval(verificarEnvioCorreosMantenimiento, 10 * 1000); */


/* 5.2 busqueda por id de mantenimiento y que aparesca todas las actividades */
export const listarMantenimientoPorId = async (req, res) => {
    try {
        const { idMantenimiento } = req.params;
        let sql = `SELECT idActividades, acti_nombre, acti_descripcion, acti_fecha_realizacion, acti_estado, fk_mantenimiento 
                    FROM mantenimiento AS m
                    JOIN actividades AS a ON m.idMantenimiento = a.fk_mantenimiento
                    WHERE m.idMantenimiento = ${idMantenimiento}`;
        const [result] = await conexion.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontró actividades con el ID especificado" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador mantenimientoController.js: " + err });
    }
};

/* 14 */
export const registrarMantenimiento = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(400).json(error);
        }
        let {
            mant_codigo_mantenimiento,
            mant_fecha_realizacion,
            mant_fecha_proxima,
            mant_fk_fichas,
            fk_tipo_mantenimiento,
            mant_descripcion
        } = req.body;

        let sql = `INSERT INTO mantenimiento (mant_codigo_mantenimiento, mant_fecha_realizacion, mant_fecha_proxima, mant_fk_fichas, fk_tipo_mantenimiento, mant_descripcion)
        values('${mant_codigo_mantenimiento}', '${mant_fecha_realizacion}', '${mant_fecha_proxima}', '${mant_fk_fichas}', '${fk_tipo_mantenimiento}', '${mant_descripcion}')`;
        
        const [respuesta] = await conexion.query(sql);

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({"mensaje": "Se registró con éxito"});
        } else {
            return res.status(404).json({"mensaje": "No se registró con éxito el mantenimiento"});
        }
    } catch (e) {
        return res.status(500).json({"mensaje": "Error: " + e.message});
    }
}

/* 16 generar ficha de mantenimiento */
export const listarRequerimiento16 = async (req, res) => {
    try {
        const { fecha_realizacion } = req.params;

        // Verificar la fecha que se recibe
        /* console.log("Fecha recibida:", fecha_realizacion); */

        const sql = `
            SELECT
                fichas.fi_placa_sena AS referencia_maquina,
                mantenimiento.idMantenimiento,
                mantenimiento.mant_codigo_mantenimiento,
                mantenimiento.mant_descripcion,
                mantenimiento.mant_fecha_realizacion,
                actividades.acti_estado,
                actividades.idActividades,
                actividades.acti_nombre,
                tipo_mantenimiento.tipo_mantenimiento,
                fichas.idFichas,
                fichas.fi_fecha_inicio_garantia,
                fichas.fi_fecha_fin_garantia,
                fichas.fi_descripcion_garantia
            FROM
                mantenimiento
            LEFT JOIN
                fichas ON mantenimiento.mant_fk_fichas = fichas.idFichas
            LEFT JOIN
                actividades ON actividades.fk_mantenimiento = mantenimiento.idMantenimiento
            LEFT JOIN
                tipo_mantenimiento ON mantenimiento.fk_tipo_mantenimiento = tipo_mantenimiento.idTipo_mantenimiento
            WHERE 
                DATE(mantenimiento.mant_fecha_realizacion) >= ?
                
        `;

        const [result] = await conexion.query(sql, [fecha_realizacion]);

        // Verificar el resultado de la consulta
        /* console.log("Resultado de la consulta:", result); */

        if (result.length > 0) {
            const requerimientos = [];
            const idsProcesados = new Set();

            for (let i = 0; i < result.length; i++) {
                const row = result[i];
                
                // Evitar la repetición de datos
                if (!idsProcesados.has(row.idActividades)) {
                    const requerimiento = {
                        idMantenimiento: row.idMantenimiento,
                        referencia_maquina: row.referencia_maquina,
                        codigo_mantenimiento: row.mant_codigo_mantenimiento,
                        descripcion_mantenimiento: row.mant_descripcion,
                        fecha_realizacion: row.mant_fecha_realizacion,
                        estado_maquina: row.acti_estado,
                        idActividades: row.idActividades,
                        acti_nombre: row.acti_nombre,
                        tipo_mantenimiento: row.tipo_mantenimiento,
                        idFichas: row.idFichas,
                        fi_fecha_inicio_garantia: row.fi_fecha_inicio_garantia,
                        fi_fecha_fin_garantia: row.fi_fecha_fin_garantia,
                        fi_descripcion_garantia: row.fi_descripcion_garantia
                    };
                    requerimientos.push(requerimiento);
                    idsProcesados.add(row.idActividades);
                }
            }
            
            res.status(200).json(requerimientos);
        } else {
            res.status(404).json({ "message": "No se encontraron requerimientos de mantenimiento en la base de datos para la fecha de realización proporcionada." });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarRequerimiento16: " + err.message });
    }
};


/* busca el mantenimiento por id de la ficha  */
export const mantenimientoDeMaquinas = async (req, res) => {
    try {
        const { idFichas } = req.params; 
        let sql = `
            SELECT idMantenimiento, mant_codigo_mantenimiento, mant_fecha_realizacion, mant_fecha_proxima, mant_fk_fichas, fk_tipo_mantenimiento
            FROM mantenimiento 
            LEFT JOIN fichas ON mantenimiento.mant_fk_fichas = fichas.idFichas
            WHERE idFichas = ${idFichas}`; 

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
/* listar mantenimientos */
export const listartodosmantenimientos = async (req, res) => {
    try {
        let sql = `
        SELECT
        mantenimiento.idMantenimiento,
        mantenimiento.mant_codigo_mantenimiento,
        mantenimiento.mant_fecha_realizacion,
        mantenimiento.mant_fecha_proxima,
        mantenimiento.mant_descripcion,
        mantenimiento.mant_ficha_soporte,
        fichas.fi_placa_sena AS referencia_maquina,
        tipo_mantenimiento.tipo_mantenimiento
    FROM
        mantenimiento
    LEFT JOIN
        fichas ON mantenimiento.mant_fk_fichas = fichas.idFichas
    LEFT JOIN
        tipo_mantenimiento ON mantenimiento.fk_tipo_mantenimiento = tipo_mantenimiento.idTipo_mantenimiento;
    
            
        `;
        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "menssage": "No se encontraron requerimientos de mantenimiento completos en la base de datos." });
        }
    }
    catch (err) {
        res.status(500).json({ "menssage": "Error en el controlador listarRequerimiento5: " + err });
    }
}; 


export const listarMantenimientoPorFicha = async (req, res) => {
    try {
        const { mant_ficha_soporte } = req.params;
        let sql = `SELECT idActividades, acti_nombre, acti_descripcion, acti_fecha_realizacion, acti_estado, fk_mantenimiento 
                    FROM mantenimiento AS m
                    JOIN actividades AS a ON m.idMantenimiento = a.fk_mantenimiento
                    WHERE m.mant_ficha_soporte = ${mant_ficha_soporte}`;
        const [result] = await conexion.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontró actividades con el ID especificado" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador mantenimientoController.js: " + err });
    }
};




export const listarMantenimientoPorId_mantenimiento = async (req, res) => {
    try {
        const { mant_codigo_mantenimiento } = req.params;

        let sql = `SELECT idMantenimiento, mant_codigo_mantenimiento, mant_fecha_realizacion, mant_fecha_proxima, mant_descripcion,             mant_ficha_soporte, mant_fk_fichas, fk_tipo_mantenimiento
                    FROM mantenimiento 
                    WHERE mant_codigo_mantenimiento = ?`;

        const [result] = await conexion.query(sql, [mant_codigo_mantenimiento]);

        
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No se encontró actividad con el ID especificado" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error en el controlador listarMantenimientoPorId_mantenimiento: " + err.message });
    }
};


/* eliminar mantenimiento */
export const eliminarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;

        let sql = 'DELETE FROM mantenimiento WHERE idMantenimiento = ?';

        const [result] = await conexion.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ "menssage": "Mantenimiento eliminado exitosamente." });
        } else {
            res.status(404).json({ "menssage": "No se encontró el mantenimiento con el ID especificado." });
        }
    } catch (err) {
        res.status(500).json({ "menssage": "Error en el controlador eliminarMantenimiento: " + err });
    }
};

/* actualizar */
export const actualizarMantenimiento = async (req, res) => {
    try {
        let {  mant_codigo_mantenimiento, mant_fecha_realizacion, mant_fecha_proxima, mant_descripcion, mant_fk_fichas, fk_tipo_mantenimiento } = req.body;
        let id = req.params.id ;

        let sql = `UPDATE mantenimiento 
        SET mant_codigo_mantenimiento = '${mant_codigo_mantenimiento}', 
            mant_fecha_realizacion = '${mant_fecha_realizacion}', 
            mant_fecha_proxima = '${mant_fecha_proxima}', 
            mant_descripcion = '${mant_descripcion}', 
            mant_fk_fichas  = ${mant_fk_fichas }, 
            fk_tipo_mantenimiento = ${fk_tipo_mantenimiento }
        WHERE idMantenimiento  = ${id}`;

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message": "Se actualizó con éxito" });
        } else {
            return res.status(404).json({ "message": "No se encontró el mantenimiento para actualizar" });
        }
    } catch (e) {
        return res.status(500).json({ "message": "Error: " + e });
    }
}
