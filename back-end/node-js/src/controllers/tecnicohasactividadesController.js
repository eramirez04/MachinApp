import {conexion} from "../database/database.js"   // importamos lo que tenemos en conexion. 

import { validationResult } from "express-validator"

export const registrarActividades= async (req,res)=>{
    try {

        const error=validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        let{fk_usuarios}=req.body

        let sql =`insert into tecnicos_has_actividades(fk_usuarios)values('${fk_usuarios}')`;
    
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


export const actualizarActividades= async (req,res)=>{
    try {
        const error=validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        
        let{acti_nombre, acti_descripcion, acti_fecha_realizacion,acti_estado,fk_mantenimiento}=req.body

        let id=req.params.id_actividades

        let sql =`update actividades set acti_nombre='${acti_nombre}', acti_descripcion='${acti_descripcion}',acti_fecha_realizacion='${acti_fecha_realizacion}', acti_estado='${acti_estado}', fk_mantenimiento='${fk_mantenimiento}' where idActividades=${id}`;
    
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
  