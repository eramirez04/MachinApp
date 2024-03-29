import { conexion } from '../database/database.js';

/* funcional */
export const listarMantenimiento = async (req, res) => {
    try {
        let objeto = {}
        let ayudante = ''

        let sql = 'SELECT idMantenimiento, mant_codigo_mantenimiento, mant_fecha_realizacion, mant_fecha_proxima, mant_fk_fichas, tipo_mantenimiento, mant_descripcion, idActividades, acti_nombre, acti_estado, acti_descripcion, acti_fecha_realizacion FROM mantenimiento LEFT JOIN tipo_mantenimiento ON fk_tipo_mantenimiento = idTipo_mantenimiento LEFT JOIN actividades ON fk_mantenimiento = idMantenimiento'
        const [result] = await conexion.query(sql);

        let array = [];

        /* Usamos un objeto para tener los mantenimientos temporalmente */
        let mantenimientosUnicos = {};

        for (let i = 0; i < result.length; i++) {
            ayudante = result[i]

            /* Verificar si ya tenemos este mantenimiento en el objeto */
            if (!mantenimientosUnicos[ayudante.idMantenimiento]) {
                objeto = {
                    mantenimiento: {
                        id: ayudante.idMantenimiento,
                        codigo: ayudante.mant_codigo_mantenimiento,
                        fecha_realizacion: ayudante.mant_fecha_realizacion,
                        fecha_proxima: ayudante.mant_fecha_proxima,
                        ficha: ayudante.mant_fk_fichas,
                        tipo_mantenimiento: ayudante.tipo_mantenimiento,
                        descripcion: ayudante.mant_descripcion,
                        actividades: [] /* Inicializamos un array para almacenar las actividades */
                    }
                }
                /* Marcar el mantenimiento para evitar que se repita */
                mantenimientosUnicos[ayudante.idMantenimiento] = objeto.mantenimiento;
                array.push(objeto); /* Agregamos el objeto al array */
            }

            /* Hacemos que la actividad vaya donde le corresponde */
            mantenimientosUnicos[ayudante.idMantenimiento].actividades.push({
                id: ayudante.idActividades,
                nombre_actividad: ayudante.acti_nombre,
                descripcion: ayudante.acti_descripcion,
                fecha_realizacion: ayudante.acti_fecha_realizacion
            });
        }

        let manten = array
        if (manten.length > 0) res.status(200).json({ manten });
        else res.status(404).json({ "message": "No se encontraron mantenimientos en la base de datos." });
    }
    catch (err) {
        res.status(500).json({ "message": "Error en el controlador mantenimientoController.js: " + err });
    }
};

export const listarMantenimientoPorId_actividades = async (req, res) => {
    try {
        const { idMantenimiento } = req.params;
        let sql = `SELECT m.idMantenimiento, m.mant_codigo_mantenimiento, a.idActividades, a.acti_nombre, a.acti_descripcion
                    FROM mantenimiento AS m
                    JOIN actividades AS a ON m.idMantenimiento = a.fk_mantenimiento
                    WHERE m.idMantenimiento = ${idMantenimiento}`;
        const [result] = await conexion.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontró mantenimiento con el ID especificado" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador mantenimientoController.js: " + err });
    }
};

/* funcional */
export const listarMantenimientoPorId = async (req, res) => {
    try {
        const { idMantenimiento } = req.params;
        let sql = `SELECT mant_codigo_mantenimiento, mant_fecha_realizacion, mant_fecha_proxima, mant_fk_fichas, fk_tipo_mantenimiento, mant_descripcion FROM mantenimiento WHERE idMantenimiento = ${idMantenimiento}`;
        const [result] = await conexion.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontró mantenimiento con el ID especificado" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador mantenimientoController.js: " + err });
    }
};


/* funcional */
export const registrarMantenimiento = async (req, res) => {
    try {
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

/* funcional */
export const eliminarMantenimiento = async(req, res) =>{
    try{
    let idMantenimiento = req.params.id_mantenimiento;

    let sql =`delete from mantenimiento where idMantenimiento =${idMantenimiento} `;

    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows > 0){
        return res.status(200).json({"menssage":"se elimino con exito el mantenimiento"});
    }else{
        return res.status(404).json({"menssage":"no se elimino con exito el mantenimiento"});
    }
    }catch(e){
        return res.status(500).json({"menssage":"error" + e.menssage});
    }
}

/* funcional */
export const actualizarMantenimiento = async(req, res) =>{
    try{
        let {mant_codigo_mantenimiento,	
            mant_fecha_realizacion,	
            mant_fecha_proxima,	
            mant_fk_fichas,	
            fk_tipo_mantenimiento,	
            mant_descripcion
        } = req.body;

        let id = req.params.id_mantenimiento;

        let sql =`UPDATE mantenimiento SET
                mant_codigo_mantenimiento = '${mant_codigo_mantenimiento}',
                mant_fecha_realizacion= '${mant_fecha_realizacion}', 
                mant_fecha_proxima = '${mant_fecha_proxima}', 
                mant_fk_fichas = '${mant_fk_fichas}',  
                fk_tipo_mantenimiento = '${fk_tipo_mantenimiento}', 
                mant_descripcion = '${mant_descripcion}' 
                WHERE idMantenimiento  = ${id}`;
        

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0){
            return res.status(200).json({"menssage":"se actualizo con exito"});
        }else{
            return res.status(404).json({"menssage":" se actulizo con exito el mantenimiento"});
        }
    }catch(e){
        return res.status(500).json({"menssage":"error" + e});
    }
}

/* requerimiento 5 */
export const listarRequerimiento5 = async (req, res) => {
    try {
        let sql = `
            SELECT mant_fecha_proxima, mant_fk_fichas, mant_fecha_realizacion, fichas.fi_placa_sena AS nombre_maquina, actividades.acti_nombre AS actividades_maquina, usuarios.us_nombre AS nombre_tecnico 
            FROM mantenimiento 
            LEFT JOIN fichas ON mantenimiento.mant_fk_fichas = fichas.idFichas 
            LEFT JOIN actividades ON actividades.fk_mantenimiento = mantenimiento.idMantenimiento 
            LEFT JOIN tecnicos_has_actividades ON actividades.idActividades = tecnicos_has_actividades.fk_actividades 
            LEFT JOIN usuarios ON tecnicos_has_actividades.fk_usuarios = usuarios.idUsuarios
            WHERE mant_fecha_proxima IS NOT NULL 


            /* esto es para que solo las tablas que tengan todos los datos en todas las tablas aparescan */
            /* AND mant_fk_fichas IS NOT NULL 
            AND mant_fecha_realizacion IS NOT NULL 
            AND fichas.fi_placa_sena IS NOT NULL 
            AND actividades.acti_nombre IS NOT NULL 
            AND usuarios.us_nombre IS NOT NULL; */
        `;
        const [result] = await conexion.query(sql);

        /* verificar si se encontraron requerimientos de mantenimiento */
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron los requerimientos completos en la base de datos." });
        }
    }
    catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarRequerimiento5: " + err.message });
    }
};

/* requerimiento 17 */
export const listarRequerimiento17 = async (req, res) => {
    try {
        let objeto = {};
        let ayudante = '';

        /* obtiene la fecha de realizacion*/
        const { fecha_realizacion } = req.params;

        
        let sql = `
            SELECT
                fichas.fi_placa_sena AS referencia_maquina,
                mantenimiento.mant_codigo_mantenimiento,
                mantenimiento.mant_descripcion,
                mantenimiento.mant_fecha_realizacion,
                actividades.acti_estado
            FROM
                mantenimiento
            LEFT JOIN
                fichas ON mantenimiento.mant_fk_fichas = fichas.idFichas
            LEFT JOIN
                actividades ON actividades.fk_mantenimiento = mantenimiento.idMantenimiento
            WHERE 
                mantenimiento.mant_fecha_realizacion = '${fecha_realizacion}'
        `;
        const [result] = await conexion.query(sql);

        let array = [];

        for (let i = 0; i < result.length; i++) {
            ayudante = result[i];

            /* crear un objeto para almacenar la informacion */
            objeto = {
                referencia_maquina: ayudante.referencia_maquina,
                codigo_mantenimiento: ayudante.mant_codigo_mantenimiento,
                descripcion_mantenimiento: ayudante.mant_descripcion,
                fecha_realizacion: ayudante.mant_fecha_realizacion,
                estado_maquina: ayudante.acti_estado
            };

            array.push(objeto);
        }

        /* verificar si se encontraron requerimientos de mantenimiento */
        if (array.length > 0) {
            res.status(200).json(array);
        } else {
            res.status(404).json({ "message": "No se encontraron la fecha de realizacion deese mantenimiento en la base de datos" });
        }
        
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador listarRequerimiento17: " + err.message });
    }
};