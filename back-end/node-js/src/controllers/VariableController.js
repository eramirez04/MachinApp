import {conexion} from '../database/database.js'

import { validationResult } from 'express-validator'

export const registrarVariable= async(req, res)=>{
    try{


        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let{varNombre, varDescripcion}= req.body

        let sql = `insert into variable (var_nombre, var_descripcion) 
        values ('${varNombre}', '${varDescripcion}')`

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
        let{varNombre, varDescripcion }= req.body
    
        let sql = `update variable set var_nombre='${varNombre}', var_descripcion='${varDescripcion}' where idVariable=${idVariable} `
    
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



/* ---------------------------Listo----------------------------------------------------------------- */
export const registrarVariasVariables = async (req, res)=>{
    try{

        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let {variblesFicha, tipoFicha} = req.body  //variables ficha debe ser un array con la informacion de las variables. 

        console.log(variblesFicha)
        console.log(tipoFicha)


        let sql 
        for(let i = 0 ;variblesFicha.length>i; i++){

            if(variblesFicha[i].var_clase == "obligatoria"){
                sql = ` insert into variable (var_nombre, var_descripcion, var_clase, var_tipoDato) values('${variblesFicha[i].var_nombre}', '${variblesFicha[i].var_descripcion}', '${variblesFicha[i].var_clase}', '${variblesFicha[i].var_tipoDato}')`
            }
            else{
                sql = ` insert into variable (var_nombre, var_descripcion, var_clase, var_tipoDato, fk_tipo_equipo ) values('${variblesFicha[i].var_nombre}', '${variblesFicha[i].var_descripcion}', '${variblesFicha[i].var_clase}', '${variblesFicha[i].var_tipoDato}', '${tipoFicha}')`
            }
            
            const [respuesta] = await conexion.query(sql)

            if (respuesta.affectedRows == 0){   
                return res.status(404).json({"message":"Error al registrar variables."})
            }   
        }

        return res.status(200).json({"message":"Se registraron correctamente las variables"})


    }catch(error){

        return res.status(500).json({"message":"Error en el servidor: "+error})
    }
}


/* ---------------------------Listo------------------------------------------------------------- */
//listar las variables dependiendo del tipo de ficha tecnica, esto se utilizara al momento de generar el formulario de registro de la ficha tecnica
export const listarVarFicha = async (req, res)=>{

    try{
        let idTipoFicha = req.params.idTipoFicha


        let sql = `
        
        SELECT 
        var_nombre,
        var_descripcion,
        var_clase,
        var_tipoDato
        FROM variable
        WHERE fk_tipo_equipo = ${idTipoFicha} or var_clase = 'obligatoria'
        `

        const [respuesta] = await conexion.query(sql)

        if (respuesta.length>0){

            return  res.status(200).json({respuesta})
        }

        return  res.status(404).json({"mensaje":"error al listar variables"})


    }
    catch(e){
        return res.status(500).json({"mensaje":"Error del servidor"})
    }


}