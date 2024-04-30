import { conexion } from '../database/database.js';
import {validationResult} from 'express-validator'

/* funcional */
export const listarTipoMantenimiento=async(req,res) =>{
    try{
        let sql ='select idTipo_mantenimiento, tipo_mantenimiento from tipo_mantenimiento'
        const [result] = await conexion.query(sql);
        console.log(result.length)

    if(result.length>0)res.status(200).json(result);
    else res.status(404).json({"menssage": "no se encontro mantenimiento en la base de datos "});
    }
    catch(err){
        res.status(500).json({"menssage": "error en el controlador mantenimientoController.js" + err});
    }
};
/* funcional */
export const registrarTipoMantenimiento = async(req, res) =>{
    try{
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(400).json(error);
        }
    let { tipo_mantenimiento} = req.body;

    let sql =`INSERT INTO tipo_mantenimiento (tipo_mantenimiento)
                Values('${tipo_mantenimiento}')`

    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows > 0){
        return res.status(200).json({"menssage":"se registro con exito"});
    }else{
        return res.status(404).json({"menssage":"no se registro con exito el mantenimiento"});
    }
    }catch(e){
        console.error("Error al registrar el mantenimiento:", e);
        return res.status(500).json({"menssage":"error" + e});
    }
}
/* funcional */
export const eliminarTipoMantenimiento = async (req, res) => {
    try {
        let idTipo_mantenimiento = req.params.idTipo_mantenimiento; 

        let sql = `delete from tipo_mantenimiento where idTipo_mantenimiento = ${idTipo_mantenimiento} `;

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({"mensaje": "se eliminó con éxito el mantenimiento"});
        } else {
            return res.status(404).json({"mensaje": "no se eliminó con éxito el mantenimiento"});
        }
    } catch (e) {
        console.error("Error al eliminar el mantenimiento:", e);
        return res.status(500).json({"mensaje": "error" + e.message});
    }
}
/* funcional */
export const actualizarTipoMantenimiento= async (req,res)=>{
    try {
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(400).json(error);
        }
        
        let{ tipo_mantenimiento}=req.body

        let id=req.params.idTipo_mantenimiento

        let sql =`UPDATE tipo_mantenimiento SET tipo_mantenimiento = '${tipo_mantenimiento}' WHERE idTipo_mantenimiento = ${id}`;
    
        const[respuesta]=await conexion.query(sql);
    
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se registro con exito"});
        }else{
            return res.status(404).json({"menssage":"No se actualizo"})
        } 
        
    } catch (error) {
        return res.status(500).json({"menssage":"error"+error.menssage})
    }
}