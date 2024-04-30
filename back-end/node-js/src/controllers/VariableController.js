import {conexion} from '../database/database.js'

import { validationResult } from 'express-validator'

export const registrarVariable= async(req, res)=>{
    try{


        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let{varNombre, varDescripcion, fkTipoFicha}= req.body

        let sql = `insert into variable (var_nombre, var_descripcion, var_fk_tipo_ficha) 
        values ('${varNombre}', '${varDescripcion}', ${fkTipoFicha})`

        let [respuesta]= await conexion.query(sql)

        if(respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se registro correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se registro"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"+error})
    }
}

export const listarVariable = async(req, res)=>{
    try{
        
        let sql = ` SELECT * FROM variable`

        let [respuesta]= await conexion.query(sql)

        if(respuesta.length>0){
            res.status(200).json(respuesta)
        }
        else{
            res.status(404).json({"mensaje":"No se encontraron variables"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }
}

export const actualizarVariable = async (req, res)=>{

    try{

        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        
        let idVariable = req.params.idVariable
        let{varNombre, varDescripcion, fkTipoFicha}= req.body
    
        let sql = `update variable set var_nombre='${varNombre}', var_descripcion='${varDescripcion}', var_fk_tipo_ficha = ${fkTipoFicha} where idVariable=${idVariable} `
    
        let [respuesta] = await conexion.query(sql)
    
        if(respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se actualizo correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se actualizo "})
        }
    
    }catch(error){
        return res.status(500).json({"mensaje":"Error del servidor"})
    }


}

export const eliminarVariable = async (req, res)=>{
    try{

        let idVariable = req.params.idVariable

        let sql = `delete from variable where idVariable=${idVariable}`

        let [respuesta] = await  conexion.query(sql)

        if (respuesta.affectedRows>0 ){
            res.status(200).json({"mensaje":"Se elimino correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se elimino"})
        }

    }
    catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }
}