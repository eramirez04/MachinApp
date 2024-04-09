import { conexion } from '../database/database.js'


export const registrarTipoFicha= async(req, res)=>{

    try{

        let tipoFicha = req.body.tipoFicha

        let sql = `insert into tipo_equipo (ti_fi_nombre) values ('${tipoFicha}')`

        const [respuesta] = await conexion.query(sql)

        if(respuesta.affectedRows>0){
            return res.status(200).json({"mensaje":"Se registro con exito"}) 
        }
        else{
            return res.status(404).json({"mensaje":"No se registro con exito"})
        }

    }catch(e){
        return res.status(500).json({"mensaje":"Error en el servidor"})
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