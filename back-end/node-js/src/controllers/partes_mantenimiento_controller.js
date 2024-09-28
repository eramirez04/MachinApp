import { conexion } from '../database/database.js';
import { validationResult } from 'express-validator';

/* funcional */
export const listarPartesMantenimiento = async (req, res) => {
    try {
        let sql = 'SELECT id_partes_mantenimiento, par_fk_mantenimientos, par_nombre_repuesto, par_costo FROM partes_mantenimiento';
        const [result] = await conexion.query(sql);

        if (result.length > 0) res.status(200).json(result);
        else res.status(404).json({ "mensaje": "no se encontraron partes de mantenimiento en la base de datos" });
    } catch (err) {
        res.status(500).json({ "mensaje": "error en el controlador mantenimientoController.js" + err });
    }
};

/* funcional */
export const registrarParteMantenimiento = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        const partes = req.body; // Espera un array de partes de mantenimiento

        if (!Array.isArray(partes) || partes.length === 0) {
            return res.status(400).json({ "mensaje": "Se esperaba un array de partes de mantenimiento." });
        }

        // Prepara la consulta SQL para insertar múltiples partes
        const valores = partes.map(part => `(${part.par_fk_mantenimientos}, '${part.par_nombre_repuesto}', ${part.par_costo})`).join(", ");
        const sql = `INSERT INTO partes_mantenimiento (par_fk_mantenimientos, par_nombre_repuesto, par_costo) VALUES ${valores}`;

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "mensaje": "Se registraron las partes de mantenimiento con éxito" });
        } else {
            return res.status(404).json({ "mensaje": "No se registraron las partes de mantenimiento con éxito" });
        }
    } catch (e) {
        console.error("Error al registrar las partes de mantenimiento:", e);
        return res.status(500).json({ "mensaje": "Error: " + e.message });
    }
};

/* funcional */
export const eliminarParteMantenimiento = async (req, res) => {
    try {
        let id_partes_mantenimiento = req.params.id_partes_mantenimiento;

        let sql = `DELETE FROM partes_mantenimiento WHERE id_partes_mantenimiento = ${id_partes_mantenimiento}`;

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "mensaje": "se eliminó con éxito la parte de mantenimiento" });
        } else {
            return res.status(404).json({ "mensaje": "no se eliminó con éxito la parte de mantenimiento" });
        }
    } catch (e) {
        console.error("Error al eliminar la parte de mantenimiento:", e);
        return res.status(500).json({ "mensaje": "error" + e.message });
    }
};

/* funcional */
export const actualizarParteMantenimiento = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        let { par_fk_mantenimientos, par_nombre_repuesto, par_costo } = req.body;

        // eliminar espacios en blanco alrededor de los valores de texto
        par_fk_mantenimientos = par_fk_mantenimientos?.toString().trim();
        par_nombre_repuesto = par_nombre_repuesto?.trim();

        par_costo = parseFloat(par_costo);

        let id = req.params.id_partes_mantenimiento;

        // Validaciones individuales para cada campo
        if (!par_fk_mantenimientos) {
            return res.status(400).json({ mensaje: "El campo 'par_fk_mantenimientos' es requerido o es inválido" });
        }

        if (!par_nombre_repuesto || typeof par_nombre_repuesto !== 'string') {
            return res.status(400).json({ mensaje: "El campo 'par_nombre_repuesto' es requerido y debe ser un texto válido" });
        }

        if (isNaN(par_costo)) {
            return res.status(400).json({ mensaje: "El campo 'par_costo' es requerido y debe ser un número válido" });
        }

        let sql = `UPDATE partes_mantenimiento SET par_fk_mantenimientos = ?, par_nombre_repuesto = ?, par_costo = ? WHERE id_partes_mantenimiento = ?`;

        const [respuesta] = await conexion.query(sql, [par_fk_mantenimientos, par_nombre_repuesto, par_costo, id]);

        // Verificar el resultado de la consulta
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ mensaje: "Se actualizó con éxito" });
        } else {
            return res.status(404).json({ mensaje: "No se actualizó" });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: "Error en actualizar: " + error.message });
    }
};


export const listarPartesMantenimientoPorIdMantenimiento = async (req, res) => {
    try {
        const { idMantenimiento } = req.params;

        const sql = `
            SELECT
                pm.id_partes_mantenimiento,
                pm.par_fk_mantenimientos,
                pm.par_nombre_repuesto,
                pm.par_costo
            FROM
                partes_mantenimiento pm
            INNER JOIN
                mantenimiento m ON pm.par_fk_mantenimientos = m.idMantenimiento
            WHERE
                m.idMantenimiento = ?
        `;

        const [result] = await conexion.query(sql, [idMantenimiento]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron partes de mantenimiento para ese id de mantenimiento."
            });
        }
    } catch (err) {
        console.error("Error en listarPartesMantenimientoPorIdMantenimiento:", err);
        res.status(500).json({
            "mensaje": "Error en el controlador listarPartesMantenimientoPorIdMantenimiento: " + err.message
        });
    }
};