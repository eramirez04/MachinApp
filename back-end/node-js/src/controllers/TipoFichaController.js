import { conexion } from '../database/database.js'

import { validationResult } from 'express-validator'


export const registrarTipoFicha= async(req, res)=>{

    try{

        const error = validationResult(req)
        
        if (!error.isEmpty()){
            return res.status(400).json(error)
        }


        let tipoFicha = req.body.tipoFicha

        let sql = `insert into tipo_equipo (ti_fi_nombre) values ('${tipoFicha}')`

        const [respuesta] = await conexion.query(sql)


        if(respuesta.affectedRows>0){
            return res.status(200).json({"mensaje":"Se registro con exito", "idTipoFicha": respuesta.insertId}) 
        }
        else{
            return res.status(404).json({"mensaje":"No se registro con exito"})
        }

    }catch(e){
        return res.status(500).json({"mensaje":"Error en el servidor"+ e})
    }
}

export const listarTipoFicha = async(req, res)=>{
    try{

        let sql= `SELECT * FROM tipo_equipo `

        let [respuesta] = await conexion.query(sql)

        if(respuesta.length>0){
            res.status(200).json(respuesta)
        }
        else{
            res.status(404).json({"mensaje":"No se encontraron usuario"})
        }
    }catch(error){
        res.status(500).json({"mensaje":"Error en el servidor."})
    }
}

export const actualizarTipoFicha = async(req, res)=>{
    
    try{

        const error = validationResult(req)
        
        if (!error.isEmpty()){
            return res.status(400).json(error)
        }

        let idTipoFicha = req.params.idTipoFicha
        let nombreTipoFicha = req.body.tipoFicha

        let sql= `update tipo_equipo set ti_fi_nombre='${nombreTipoFicha}' where idTipo_ficha=${idTipoFicha}`

        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se actualizo con exito"})
        }
        else{
            res.status(404).json({"mensaje":"No se actualizo"})
        }

    }catch(error){
        res.status(500).json({"mensaje":"Error en el servidor"})
    }
}

export const eliminarTipoFicha = async(req, res)=>{

    try{
        
        let idTipoFicha = req.params.idTipoFicha

        let sql = `delete from  tipo_equipo where idTipo_ficha=${idTipoFicha}`

        let[respuesta] = await conexion.query(sql)

        if (respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se elimino con exito"})
        }
        else{
            res.status(404).json({"mensaje":"No se elimino con exito"})
        }

    }catch(error){
        res.status(500).json({"mensaje":"Error en el servidor"})
    }

}

export const buscarTipoFicha = async(req, res)=>{

    try{
        let idTipoFicha = req.params.idTipoFicha

        let sql = `
        SELECT
        ti_fi_nombre
        FROM tipo_equipo
        WHERE idTipo_Ficha= ${idTipoFicha}`
    
        const[respuesta] = await conexion.query(sql)
        
        if(respuesta.length>0){

/*             let sqlVar = `
            SELECT
            var_nombre,
            var_descripcion
            FROM variable
            WHERE var_fk_tipo_ficha = ${idTipoFicha}`
            
            const[varFicha] = await conexion.query(sqlVar)
    
            let infoTipoFicha ={
                ficha: respuesta ,
                varFicha: varFicha
            } */

            return res.status(200).json(respuesta)
        }
        else{
            return res.status(404).json({"message":"No se encontro ficha"})
        }
    
    }
    catch(error){
        return res.status(500).json({"message":"Error en el servidor"})
    }
}

