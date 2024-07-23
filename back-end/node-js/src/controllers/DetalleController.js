
import { conexion } from "../database/database.js"


import { validationResult } from 'express-validator'



export const registrarDetalle = async(req, res)=>{


    try{
        
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }


        let{detFkFicha, detFkVariable, detValor}= req.body

        let sql = `insert into detalles_fichas (det_fk_fichas, det_fk_variable, det_valor) 
        values(${detFkFicha}, ${detFkVariable},'${detValor}')`

        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se registro correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se registro correctamente"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor",error })
    }

}

export const listarDetalle = async(req, res)=>{
    try{

        
        let sql = `SELECT * FROM detalles_fichas`

        let [respuesta]= await conexion.query(sql)

        if (respuesta.length>0){
            res.status(200).json(respuesta)
        }
        else{
            res.status(404).json({"mensaje":"No se encontraron detalles"})
        }

    }catch(error){
        return  res.status(500).json({"mensaje":"Error del servidor"})
    }
}

export const actualizarDetalle = async(req, res)=>{


    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json(error)
    }
    

    try{
        let idDetalle = req.params.idDetalle
        let{detFkFicha, detFkVariable, detValor}= req.body

        let sql = `update detalles_fichas set det_fk_fichas=${detFkFicha} , det_fk_variable=${detFkVariable}, det_valor='${detValor}' where idDetalle= ${idDetalle}`

        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se actualizo correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se actualizo correctamente"})
        }

    }catch(error){

        return res.status(500).json({"mensaje":"Error en el servidor"})
    }
}

export const eliminarDetalle = async(req, res)=>{
    try{
        let idDetalle = req.params.idDetalle

        let sql= `delete from detalles_fichas where idDetalle= ${idDetalle}`

        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se elimino correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se elimino"})
        }

    } catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }
}