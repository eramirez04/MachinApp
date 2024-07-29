import { conexion } from '../database/database.js';
import { validationResult } from 'express-validator';

/* funcional */
export const listarPartesMantenimiento = async (req, res) => {
    try {
        let sql = 'SELECT id_partes_mantenimiento, par_fk_mantenimientos, par_nombre_repuesto, par_costo FROM partes_mantenimiento';
        const [result] = await conexion.query(sql);
        console.log(result.length);

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

        let { par_fk_mantenimientos, par_nombre_repuesto, par_costo } = req.body;

        let sql = `INSERT INTO partes_mantenimiento (par_fk_mantenimientos, par_nombre_repuesto, par_costo)
                    VALUES ('${par_fk_mantenimientos}', '${par_nombre_repuesto}', '${par_costo}')`;

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "mensaje": "se registró con éxito" });
        } else {
            return res.status(404).json({ "mensaje": "no se registró con éxito la parte de mantenimiento" });
        }
    } catch (e) {
        console.error("Error al registrar la parte de mantenimiento:", e);
        return res.status(500).json({ "mensaje": "error" + e });
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
        let id = req.params.id_partes_mantenimiento;

        let sql = `UPDATE partes_mantenimiento SET par_fk_mantenimientos = '${par_fk_mantenimientos}', par_nombre_repuesto = '${par_nombre_repuesto}', par_costo = '${par_costo}' WHERE id_partes_mantenimiento = ${id}`;

        const [respuesta] = await conexion.query(sql);

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "mensaje": "se actualizó con éxito" });
        } else {
            return res.status(404).json({ "mensaje": "no se actualizó" });
        }
    } catch (error) {
        return res.status(500).json({ "mensaje": "error" + error.message });
    }
};
