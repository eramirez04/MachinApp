import {conexion} from "../database/database.js"   // importamos lo que tenemos en conexion. 

import { validationResult } from "express-validator"


export const listarActividades= async (req,res)=>{     
    
    try{

       
        let sql = "select us_nombre,rol_nombre,acti_nombre,acti_descripcion,acti_fecha_realizacion,acti_estado,fk_mantenimiento from actividades INNER JOIN tecnicos_has_actividades ON fk_actividades=idActividades INNER JOIN usuarios ON idUsuarios=fk_usuarios JOIN roles ON idRoles = fk_roles WHERE rol_nombre = 'tecnico'"

        const [result] =await conexion.query(sql)  //se puede llamar la variable o escribir directamente 
                                                                                                              //el comando sql 
        if(result.length > 0)res.status(200).json(result)
        
        else res.status(404).json({"message":"no se encontro usuarios en la base de datos"})
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
        let{acti_nombre, acti_descripcion, acti_fecha_realizacion,acti_estado,fk_mantenimiento,}=req.body

        let sql =`insert into actividades(acti_nombre,acti_descripcion,acti_fecha_realizacion, acti_estado, fk_mantenimiento)values('${acti_nombre}','${acti_descripcion}','${acti_fecha_realizacion}','${acti_estado}','${fk_mantenimiento}')`;
    
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
  
