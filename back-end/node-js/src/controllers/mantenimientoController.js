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