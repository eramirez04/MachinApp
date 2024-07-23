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

export const registrarActividades= async (req,res)=>{
    try {

        const error=validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        let{acti_nombre, acti_descripcion, acti_fecha_realizacion,acti_estado,acti_fk_solicitud,}=req.body

        let sql =`insert into actividades(acti_nombre,acti_descripcion,acti_fecha_realizacion, acti_estado,acti_fk_solicitud)values('${acti_nombre}','${acti_descripcion}','${acti_fecha_realizacion}','${acti_estado}','${acti_fk_solicitud}')`;
    
        const[respuesta]=await conexion.query(sql);
    
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se registro con exito"});
        }else{
            return res.status(404).json({"menssage":"No se registro"})
        } 
        
    } catch (error) {
        return res.status(500).json({"menssage":"error"+error.menssage})
    }
  
}
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
  
