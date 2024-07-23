import { query, response } from 'express'
import { conexion } from '../database/database.js'

import QRCode  from 'qrcode'
import fs from 'fs/promises'

import { validationResult } from 'express-validator'


import multer from 'multer'


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let destinationPath = 'public/imagenes/ficha'; 
        if (file.fieldname === 'fiImagen') {
            destinationPath = 'public/imagenes/ficha';
        } else if (file.fieldname === 'fiTecnica') {
            destinationPath = 'public/fichasTecnicas';
        }
        cb(null, destinationPath);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);   //le podemos fecha, en caso de que se repita el nombre del documento. 
    }
})

const upload = multer({storage:storage})

export const cargarImagenFicha = upload.fields([
    {name:'fiImagen'},
    {name:'fiTecnica'}
])


export const registrarFicha = async(req, res)=>{

    try{

        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let {fiFecha, placaSena, serial, fechaAdquisicion, fechaInicioGarantia, fechaFinGarantia, descipcionGarantia, fiEstado, fk_sitio, fk_tipo_ficha}= req.body
        
        let fiImagen = req.files.fiImagen[0].filename
        let fiTecnica = req.files.fiTecnica[0].filename

        let sql = `insert into fichas (fi_fecha, fi_placa_sena, fi_serial, fi_fecha_adquisicion, fi_fecha_inicio_garantia, fi_fecha_fin_garantia, fi_descripcion_garantia, fi_imagen, fi_estado, fi_fk_sitios, fi_fk_tipo_ficha, ficha_respaldo ) 
        values('${fiFecha}', '${placaSena}', '${serial}', '${fechaAdquisicion}' , '${fechaInicioGarantia}' , '${fechaFinGarantia}', '${descipcionGarantia}', '${fiImagen}','${fiEstado}', ${fk_sitio} , ${fk_tipo_ficha}, '${fiTecnica}')`
    
        let [respuesta] = await conexion.query(sql)


        if(respuesta.affectedRows>0){


            // Traemos el id de la ficha que acabamos de registrar para asi mismo redireccionarla en la URL. 

            let idSql = `SELECT idFichas FROM fichas where fi_placa_sena = '${placaSena}'`
            
            const [resultadoID] = await conexion.query(idSql)
            
            if(resultadoID.length>0){

                let id = resultadoID[0].idFichas

                let data = `http://192.168.1.108:5173/maquinaInfo/${id}`   //poner la url que queramos.

                let folderPath = 'public/QRimagenes'; //ruta de donde se va a guardar
                let filePath = `${folderPath}/${id}-qr.png`;     //le pasamos la ruta y en nombre de como se va a crear la imagen. 

                
                QRCode.toFile(filePath,data,{
                        color:{
                            dark:'#000000',
                            light: '#FFFFFF'
                        },
                        width:300

                    }, function(err){
                        if (err) throw err 
                        |   console.log('Código QR generado y guardado como qrcode.png');
                    }
                )

                res.status(200).json({"mensaje":"Se registro correctamente. "})

            }
            else{
                res.status(404).json({"mensaje":"No se encontro id de la ficha"})
            }

        }
        else{
            return res.status(404).json({"mensaje":"Error al registrar ficha"})
        }
        
    }catch(error){
        return res.status(500).json({"mensaje":"Error del servidor"+error})
    }
}

export const listarFicha = async(req, res)=>{
    try{
        let sql = `SELECT
        idFichas,
        fi_placa_sena,
        fi_serial,
        fi_estado,
        sit_nombre
        FROM fichas
        INNER JOIN sitios ON fi_fk_sitios = idAmbientes
        `

        let  [respuesta] = await conexion.query(sql)

        if(respuesta.length>0){
            res.status(200).json(respuesta)
        }
        else{
            res.status(404).json({"mensaje":"No se encontraron fichas."})
        }


    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }
}

export const actualizarFicha = async(req, res)=>{
    try{
        
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
    

        let idFicha = req.params.idFicha

        let {fiFecha, placaSena, serial, fechaAdquisicion, fechaInicioGarantia, fechaFinGarantia, descipcionGarantia,fiImagen, fiEstado, fk_sitio, fk_tipo_ficha}= req.body

        let sql = `update fichas set  fi_fecha = '${fiFecha}', fi_placa_sena = '${placaSena}' , fi_serial='${serial}', fi_fecha_adquisicion='${fechaAdquisicion}', 
        fi_fecha_inicio_garantia = '${fechaInicioGarantia}', fi_fecha_fin_garantia='${fechaFinGarantia}', fi_descripcion_garantia='${descipcionGarantia}', fi_imagen='${fiImagen}',fi_estado = '${fiEstado}' , fi_fk_sitios=${fk_sitio}, fi_fk_tipo_ficha=${fk_tipo_ficha}
        where idFichas = ${idFicha}`
    
        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            return res.status(200).json({"mensaje":"Se actualizo correctamente la ficha"})
        }
        else{
            return res.status(404).json({"mensaje":"Error al actualizar ficha"})
        }
        
    }catch(error){
        return res.status(500).json({"mensaje":"Error del servidor"})
    }
}

export const eliminarFicha = async(req, res)=>{
    try{
        let idFicha = req.params.idFicha

        let sql = `delete from  fichas where idFichas=${idFicha}`

        let[respuesta]= await conexion.query(sql)

        if (respuesta.affectedRows>0){
            res.status(200).json({"mensaje":"Se elimino correctamente"})
        }
        else{
            res.status(404).json({"mensaje":"No se elimino"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }
}

export const listarFichaPorAmbiente = async(req, res)=>{

    try{

        let idAmbiente = req.params.idAmbiente

        let sql = `
        SELECT fichas.idFichas, 
        fichas.fi_placa_sena,
        fichas.fi_serial,
        fichas.fi_imagen,
        fichas.fi_fk_tipo_ficha,
        fichas.fi_estado
        FROM fichas 
        INNER JOIN sitios ON sitios.idAmbientes = fichas.fi_fk_sitios 
        WHERE sitios.idAmbientes = ${idAmbiente}
        `
        const [resuladoFichas] = await conexion.query(sql)

        let Maquinas = []

        for (let i = 0; i < resuladoFichas.length; i++){
            let idFicha = resuladoFichas[i].idFichas

            let sqlTipoEquipo = `
            SELECT tipo_equipo.idTipo_ficha, tipo_equipo.ti_fi_nombre
            FROM tipo_equipo 
            INNER JOIN fichas ON fichas.fi_fk_tipo_ficha = tipo_equipo.idTipo_ficha 
            WHERE fichas.idFichas = ${idFicha};
            `
            const [tipoEquipo] = await conexion.query(sqlTipoEquipo)

            let ObjMaquina = {
                idFicha: resuladoFichas[i].idFichas,
                placa_sena: resuladoFichas[i].fi_placa_sena,
                serial: resuladoFichas[i].fi_serial,
                imagen: resuladoFichas[i].fi_imagen,
                estado: resuladoFichas[i].fi_estado,
                tipoEquipo
            }
          Maquinas[i] = ObjMaquina
        }

        if (Maquinas.length === 0){
            return res.status(404).json({
                "Estado" : 404,
                "Mensage" :"No se encontraron maquinas o equipos al ambiente"
            })
        }

        res.status(200).json(Maquinas)

    }
    catch(error){
        return res.status(500).json({"message":"Error en el servidor"})
    }

}

export const listarFichaUnica=async (req, res)=>{
    
   try{
        let idFicha = req.params.idFicha

        let sql = `
        SELECT 
        idFichas, 
        fi_fecha,
        fi_placa_sena,
        fi_serial,
        fi_fecha_adquisicion, 
        fi_fecha_inicio_garantia,
        fi_fecha_fin_garantia, 
        fi_descripcion_garantia,
        fi_imagen,
        fi_estado,
        sit_nombre as ubicacion,   
        fi_fk_tipo_ficha
        FROM fichas
        INNER JOIN sitios ON fi_fk_sitios = idAmbientes
        WHERE idFichas = ${idFicha}`

        const [respuesta] = await conexion.query(sql)

        if (respuesta.length >0){

            //para que me traiga el id y el tipo de la ficha
            let sqlTipoEquipo = `
            SELECT 
            idTipo_ficha,
            ti_fi_nombre
            FROM tipo_equipo 
            INNER JOIN fichas ON fi_fk_tipo_ficha = idTipo_ficha 
            WHERE idFichas = ${idFicha}`
            
            const [tipoEquipo] = await conexion.query(sqlTipoEquipo)


            // traer las variables de la ficha
            let detallesql = `
                SELECT 
                det_fk_variable
                FROM detalle
                WHERE det_fk_fichas = ${idFicha}`

            const[detalles] = await conexion.query(detallesql)

            // for para no repetir variable. 
            let variables = []

            for (let i = 0; i<detalles.length; i++ ){
                if (!variables.includes(detalles[i].det_fk_variable)){
                    variables.push(detalles[i].det_fk_variable)
                }
            }

            //hacemos la consulta de los detalles e informacion de esas variables.

            let infoVariables= []
            for(let i =0; i<variables.length; i++){

                //info de la variable
                let varsql= `
                SELECT
                var_nombre,
                var_descripcion
                FROM variable
                WHERE idVariable = ${variables[i]}`

                const[variable] = await conexion.query(varsql)

                //consultamos los detalles de esa variable. 
                let detSql = `
                SELECT
                det_valor
                FROM detalle
                WHERE det_fk_variable = ${variables[i]} AND det_fk_fichas = ${idFicha}
                `
                const[detallesVar] = await conexion.query(detSql)

                let objVar = {
                    var_nombre: variable[0].var_nombre,
                    var_descripcion: variable[0].var_descripcion,
                    detallesVar: detallesVar
                }

                infoVariables.push(objVar)

            }
            
            let objFicha = {
                idFichas: respuesta[0].idFichas,
                fi_fecha: respuesta[0].id_fecha,
                fi_placa_sena: respuesta[0].fi_placa_sena, 
                fi_serial: respuesta[0].fi_serial,
                fi_fecha_adquisicion: respuesta[0].fi_fecha_adquisicion,
                fi_fecha_inicio_garantia: respuesta[0].fi_fecha_inicio_garantia, 
                fi_fecha_fin_garantia: respuesta[0].fi_fecha_fin_garantia, 
                fi_descripcion_garantia: respuesta[0].fi_descripcion_garantia, 
                fi_imagen: respuesta[0].fi_imagen, 
                fi_estado: respuesta[0].fi_estado, 
                ubicacion: respuesta[0].ubicacion,
                tipoEquipo,
                infoVariables
            }
            return res.status(200).json(objFicha)

        }
        else{
            return res.status(404).json({"mensaje":"No se encontraron fichas."})
        }

   }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
   }
}

export const listarInfoEspecifica = async(req, res)=>{

    try{
        let idFicha = req.params.idFicha

        //buscamos informacion de la ficha correspondiente
        let sqlFicha = `
        SELECT 
        idFichas, 
        fi_fecha,
        fi_placa_sena,
        fi_serial,
        fi_fecha_adquisicion, 
        fi_fecha_inicio_garantia,
        fi_fecha_fin_garantia, 
        fi_descripcion_garantia,
        fi_imagen,
        fi_estado,
        ficha_respaldo,
        ti_fi_nombre as tipoEquipo
        FROM fichas
        INNER JOIN tipo_equipo ON idTipo_ficha   = fi_fk_tipo_ficha 
        WHERE idFichas = ${idFicha}
        `

        const[respuesta] = await conexion.query(sqlFicha)


        if(respuesta.length > 0 ){
           
    
            //buscamos los mantenimientos que se le an echo a esa ficha 
    
            let sqlMantenimientos = `
            SELECT
            idMantenimiento,
            mant_codigo_mantenimiento,
            mant_fecha_realizacion,
            tipo_mantenimiento
            FROM mantenimiento
            INNER JOIN tipo_mantenimiento ON fk_tipo_mantenimiento = idTipo_mantenimiento
            WHERE mant_fk_fichas = ${idFicha}
            `
            const[mantenimientos] = await conexion.query(sqlMantenimientos)
    
            let objInfoEspecifica = {
                idFichas: respuesta[0].idFichas,
                fi_fecha: respuesta[0].id_fecha,
                fi_placa_sena: respuesta[0].fi_placa_sena, 
                fi_serial: respuesta[0].fi_serial,
                fi_fecha_adquisicion: respuesta[0].fi_fecha_adquisicion,
                fi_fecha_inicio_garantia: respuesta[0].fi_fecha_inicio_garantia, 
                fi_fecha_fin_garantia: respuesta[0].fi_fecha_fin_garantia, 
                fi_descripcion_garantia: respuesta[0].fi_descripcion_garantia, 
                fi_imagen: respuesta[0].fi_imagen, 
                fi_estado: respuesta[0].fi_estado,
                tipoEquipo: respuesta[0].tipoEquipo,
                ficha_respaldo: respuesta[0].ficha_respaldo,
                mantenimientos
            }
    
            return res.status(200).json(objInfoEspecifica)
    
    
        }else{
            return res.status(404).json({"mensaje":"No se encontro ficha"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"error en el servidor"})
    }
    
}
