import {conexion} from "../database/database.js"   // importamos lo que tenemos en conexion. 

import { validationResult } from "express-validator"

export const listarActividades= async (req,res)=>{     
    
    try{
        
        let sql = `SELECT * FROM actividades`

        const [resultadoActividad] = await conexion.query(sql)

        if (resultadoActividad.length > 0) {
          res.status(200).json({
            "Mensaje": "Usuarios encontrado",
            resultadoActividad
          })
        }
        else {
          return res.status(404).json(
            { "Mensaje": "No se encontraron usuarios" }
          )
        }
    }
    catch(err){
        res.status(500).json({"message":"error en el servidor"+err})

    }

}

//registrar por defecto las actividades
export const registrarActividades = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

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


//registrar manualmente las actividades 
export const registrarVariasActividades = async (req, res) => {
    const actividades = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    let connection;

    try {
        connection = await conexion.getConnection(); 
        await connection.beginTransaction(); 

        for (let i = 0; i < actividades.length; i++) {
            const { acti_nombre, acti_descripcion, acti_fecha_realizacion, acti_estado, acti_fk_solicitud } = actividades[i];

            const sql = `INSERT INTO actividades (
                acti_nombre,
                acti_descripcion,
                acti_fecha_realizacion,
                acti_estado,
                acti_fk_solicitud
            ) VALUES (?, ?, ?, ?, ?)`;

            const [respuesta] = await connection.query(sql, [
                acti_nombre,
                acti_descripcion,
                acti_fecha_realizacion,
                acti_estado,
                acti_fk_solicitud
            ]);

            if (respuesta.affectedRows === 0) {
                throw new Error("Error al registrar una o más actividades");
            }
        }

        await connection.commit(); 

        return res.status(200).json({ message: "Se registraron correctamente las actividades" });

    } catch (error) {
        if (connection) await connection.rollback(); 
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor: " + error.message });
    } finally {
        if (connection) connection.release(); 
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

export const actualizarActividades= async (req,res)=>{
    try {
        const error=validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        
        let{acti_nombre, acti_descripcion, acti_fecha_realizacion,acti_estado,acti_fk_solicitud}=req.body

        let id=req.params.id_actividades

        let sql =`update actividades set acti_nombre='${acti_nombre}', acti_descripcion='${acti_descripcion}',acti_fecha_realizacion='${acti_fecha_realizacion}', acti_estado='${acti_estado}', acti_fk_solicitud='${acti_fk_solicitud}' where idActividades=${id}`;
    
        const[respuesta]=await conexion.query(sql);
    
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se actualizo con exito"});
        }else{
            return res.status(404).json({"menssage":"No se actualizo"})
        } 
        
    } catch (error) {
        return res.status(500).json({"menssage":"error"+error.menssage})
    }
  
}
  
