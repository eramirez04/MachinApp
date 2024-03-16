
import { conexion } from '../database/database.js'

export const registrarFicha = async(req, res)=>{

    try{

        let {fiFecha, placaSena, serial, fechaAdquisicion, fechaInicioGarantia, fechaFinGarantia, descipcionGarantia, equipoPlano, fk_sitio, fk_tipo_ficha}= req.body

        let sql = `insert into fichas (fi_fecha, fi_placa_sena, fi_serial, fi_fecha_adquisicion, fi_fecha_inicio_garantia, fi_fecha_fin_garantia, fi_descripcion_garantia, fi_equipo_plano, fi_fk_sitios, fi_fk_tipo_ficha ) 
        values('${fiFecha}', '${placaSena}', '${serial}', '${fechaAdquisicion}' , '${fechaInicioGarantia}' , '${fechaFinGarantia}', '${descipcionGarantia}', '${equipoPlano}', ${fk_sitio} , ${fk_tipo_ficha})`
    
        let [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            return res.status(200).json(respuesta)
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
        let {fiFecha, placaSena, serial, fechaAdquisicion, fechaInicioGarantia, fechaFinGarantia, descipcionGarantia, equipoPlano, fk_sitio, fk_tipo_ficha}= req.body

        let sql = `update fichas set  fi_fecha = '${fiFecha}', fi_placa_sena = '${placaSena}' , fi_serial='${serial}', fi_fecha_adquisicion='${fechaAdquisicion}', 
        fi_fecha_inicio_garantia = '${fechaInicioGarantia}', fi_fecha_fin_garantia='${fechaFinGarantia}', fi_descripcion_garantia='${descipcionGarantia}', fi_equipo_plano='${equipoPlano}', fi_fk_sitios=${fk_sitio}, fi_fk_tipo_ficha=${fk_tipo_ficha}
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

/* Tener en cuanta el ingreso de datos para el correcto funcionamiento de la funcion del controlador (revisar) */
export const listarFichaUnica=async (req, res)=>{

    try{

        let idFicha= req.params.idFicha

        let sql= `
        SELECT 
        fi_fecha,
        fi_placa_sena, 
        fi_serial, 
        fi_fecha_adquisicion, 
        fi_fecha_inicio_garantia, 
        fi_fecha_fin_garantia, 
        fi_descripcion_garantia, 
        fi_equipo_plano, 
        ti_fi_nombre, 
        var_nombre, 
        var_descripcion, 
        det_valor
        FROM fichas
        INNER JOIN tipo_ficha 
        ON fi_fk_tipo_ficha = idTipo_ficha
        INNER JOIN variable
        ON idTipo_ficha = var_fk_tipo_ficha
        INNER JOIN detalle
        ON idVariable = det_fk_variable
        WHERE idFichas=${idFicha}   
        `
    
        let [respuesta]= await conexion.query(sql)

        if(respuesta.length>0){
            res.status(200).json(respuesta)
        }
        else{
            res.status(404).json({"mensaje":"No se ecntraron fichas"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }

}
