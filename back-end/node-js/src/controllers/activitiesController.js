import {conexion} from "../database/database.js"   // importamos lo que tenemos en conexion. 

import { validationResult } from "express-validator"

export const listarActividades= async (req,res)=>{     
    
    try{
        
        let sql = `SELECT * FROM actividades`

        const [resultadoActividad] = await conexion.query(sql)

        if (resultadoActividad.length > 0) {
          res.status(200).json({
            "Mensaje": "adctividad encontrada",
            resultadoActividad
          })
        }
        else {
          return res.status(404).json(
            { "Mensaje": "No se encontraron adctividad" }
          )
        }
    }
    catch(err){
        res.status(500).json({"message":"error en el servidor"+err})

    }

}
export const listarActividadesdeSolicitudes = async (req, res) => {     
    try {
        const { idSolicitud } = req.params;

        let sql = `SELECT 
                    idActividades,
                    acti_nombre,
                    acti_descripcion 
                   FROM actividades 
                   WHERE acti_fk_solicitud = ?`;

        const [resultadoActividad] = await conexion.query(sql, [idSolicitud]);

        if (resultadoActividad.length > 0) {
            res.status(200).json({
                "Mensaje": "Actividad encontrado",
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



//registrar por defecto las actividades
export const registrarActividades = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { acti_nombre, acti_descripcion, acti_fecha_realizacion, acti_fk_solicitud } = req.body;

        if (!Array.isArray(acti_nombre) || !Array.isArray(acti_descripcion)) {
            return res.status(400).json({ message: "acti_nombre y acti_descripciones deben ser arrays" });
        }

        if (acti_nombre.length !== acti_descripcion.length) {
            return res.status(400).json({ message: "acti_nombre y acti_descripciones deben tener la misma longitud" });
        }

        const values = [];
        const placeholders = acti_nombre.map((_, index) => {
            values.push(
                JSON.stringify(acti_nombre[index]), 
                JSON.stringify(acti_descripcion[index]), 
                acti_fecha_realizacion, 
                acti_fk_solicitud
            );
            return "(?, ?, ?, ?, DEFAULT)";  
        }).join(", ");

        const sql = `INSERT INTO actividades (
            acti_nombre,
            acti_descripcion,
            acti_fecha_realizacion,
            acti_fk_solicitud,
            acti_estado
        ) VALUES ${placeholders}`;

        const [respuesta] = await conexion.query(sql, values);

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ message: "Se registraron todas las actividades con éxito" });
        } else {
            return res.status(404).json({ message: "No se registraron las actividades" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

export const eliminarActividades= async (req,res)=>{
    try {
        let idActividades=req.params.idActividades

        let sql =`delete from actividades where idActividades=${idActividades}`;
    
        const[respuesta]=await conexion.query(sql);
    
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se elemino con exito"});
        }else{
            return res.status(404).json({"menssage":"No se registro"})
        } 
        
    } catch (error) {
        return res.status(500).json({"menssage":"error"+error.menssage})
    }
  
}


export const actualizarActividades = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        let { acti_nombre, acti_descripcion } = req.body;
        let id = req.params.idActividades;


        let sql = `UPDATE actividades SET acti_nombre = ?, acti_descripcion = ? WHERE idActividades = ?`;
        const [respuesta] = await conexion.query(sql, [acti_nombre, acti_descripcion, id]);


        if (respuesta.affectedRows > 0) {
            if (respuesta.changedRows > 0) {
                return res.status(200).json({ "message": "Se actualizó con éxito" });
            } else {
                return res.status(200).json({ "message": "Los datos son los mismos, no se realizaron cambios." });
            }
        } else {
            return res.status(404).json({ "message": "No se actualizó" });
        }
        
    } catch (error) {
        console.error("Error al actualizar la actividad:", error); // Para revisar errores
        return res.status(500).json({ "message": "Error " + error.message });
    }
};

  
