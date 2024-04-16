
import { response } from 'express'
import { conexion } from '../database/database.js'

export const registrarFicha = async(req, res)=>{

    try{

        let {fiFecha, placaSena, serial, fechaAdquisicion, fechaInicioGarantia, fechaFinGarantia, descipcionGarantia,fiImagen, fiEstado, fk_sitio, fk_tipo_ficha}= req.body

        let sql = `insert into fichas (fi_fecha, fi_placa_sena, fi_serial, fi_fecha_adquisicion, fi_fecha_inicio_garantia, fi_fecha_fin_garantia, fi_descripcion_garantia, fi_imagen, fi_estado, fi_fk_sitios, fi_fk_tipo_ficha ) 
        values('${fiFecha}', '${placaSena}', '${serial}', '${fechaAdquisicion}' , '${fechaInicioGarantia}' , '${fechaFinGarantia}', '${descipcionGarantia}', '${fiImagen}','${fiEstado}', ${fk_sitio} , ${fk_tipo_ficha})`
    
        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            return res.status(200).json({"mensaje":"Se registro correctamente"})
        }
        else{
            return res.status(404).json({"mensaje":"Error al registrar ficha"})
        }
        
    }catch(error){
        return res.status(500).json({"mensaje":"Error del servidor"})
    }
}

export const listarFicha = async(req, res)=>{
    try{
        let sql = `SELECT * FROM fichas `

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

            //traer todas las variables de esa ficha. 
            let sqlVariables = `
            SELECT
            var_nombre, 
            var_descripcion,
            det_valor
            FROM detalle
            INNER JOIN variable ON det_fk_variable = idVariable
            WHERE det_fk_fichas = ${idFicha}
            `

            const [variables] = await conexion.query(sqlVariables)

            
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
                variables
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