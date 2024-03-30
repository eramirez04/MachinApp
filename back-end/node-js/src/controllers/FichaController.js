
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

export const listarFichaPorAmbiente = async(req, res)=>{

    try{

        let idAmbiente = req.params.idAmbiente

        let sql  = `
        SELECT 
            fi_serial, 
            var_nombre, 
            var_descripcion, 
            det_valor
            FROM sitios
            LEFT JOIN fichas ON idAmbientes = fi_fk_sitios
            LEFT JOIN detalle ON idFichas = det_fk_fichas
            LEFT JOIN variable ON det_fk_variable = idVariable
            LEFT JOIN tipo_ficha ON var_fk_tipo_ficha = idTipo_ficha
            WHERE idAmbientes = ${idAmbiente} and ti_fi_nombre = 'ficha tecnica'
        `
        /* para evitar que me traiga todas las fichas, especifico la condicion de que solo traiga las fichas tecnicas de ese ambiente o sitio*/
    
        let [respuesta] = await conexion.query(sql)
    
    
        /* Para que me elija solo a siertas variables y no utiilizar todas las variables de las fichas tecnicas. */
        let infoBasicaMaquinas= []
        
        for(let i = 0; i <respuesta.length; i++){
    
            // asi como se llaman aca, se deben ser nombradas las variables 
            if(respuesta[i].var_nombre == 'estado equipo' || respuesta[i].var_nombre == 'imagen equipo'  || respuesta[i].var_nombre ==  'nombre equipo'){
    
                infoBasicaMaquinas.push(respuesta[i])
            }
        }
    
    
    
    
        let objeto = {}
        let ayudante = ''
    
        let array = [];
    
        /* Usamos un objeto para tener las maquinas temporalmente */
        let maquina = {};
    
        for (let i = 0; i < infoBasicaMaquinas.length; i++) {
            ayudante = infoBasicaMaquinas[i]
    
    
            if (!maquina[ayudante.fi_serial]) {
                objeto = {
                    maquina: {
                        fi_serial: ayudante.fi_serial,
                        variables: [] /* Inicializamos un array para almacenar las variables */
                    }
                }
                /* Marcar la maquina para evitar que se repita */
                maquina[ayudante.fi_serial] = objeto.maquina;
                array.push(objeto); /* Agregamos el objeto al array */
            }
    
            /* Hacemos que las variables vayan a  donde les corresponde */
            maquina[ayudante.fi_serial].variables.push({
                var_nombre: ayudante.var_nombre,
                var_descripcion: ayudante.var_descripcion,
                det_valor: ayudante.det_valor
            });
        }
    
        let maquinas = array
        if (maquinas.length > 0) res.status(200).json({ maquinas });
        else res.status(404).json({ "message": "No se encontraron maquinas en la base de datos." });

    }
    catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }




} 

/* Tener en cuanta el ingreso de datos para el correcto funcionamiento de la funcion del controlador (revisar) */
export const listarFichaUnica=async (req, res)=>{

    try{

        let idFicha= req.params.idFicha


        /* Para que una ficha pertenesca a un tipo de ficha debe tener una variable con su detalle. */
        let sql = `
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
        LEFT JOIN detalle ON idFichas = det_fk_fichas
        LEFT JOIN variable ON det_fk_variable = idVariable
        LEFT JOIN tipo_ficha ON var_fk_tipo_ficha = idTipo_ficha
        WHERE idFichas = ${idFicha}
        `

        let [respuesta]= await conexion.query(sql)
        
        //console.log(objeto)
        

        if(respuesta.length>0){

            /* Estos datos nunca van a cambiar. */
            let objeto = [
                {
                  "fi_fecha": respuesta[0].fi_fecha,
                  "fi_placa_sena": respuesta[0].fi_placa_sena,
                  "fi_serial": respuesta[0].fi_serial,
                  "fi_fecha_adquisicion": respuesta[0].fi_fecha_adquisicion,
                  "fi_fecha_inicio_garantia": respuesta[0].fi_fecha_inicio_garantia,
                  "fi_fecha_fin_garantia": respuesta[0].fi_fecha_fin_garantia,
                  "fi_descripcion_garantia": respuesta[0].fi_descripcion_garantia,
                  "fi_equipo_plano": respuesta[0].fi_equipo_plano,
                  "ti_fi_nombre": respuesta[0].ti_fi_nombre
                }
            ]

            for (let i = 0; i < respuesta.length; i++) {
            
                if (respuesta[i].var_nombre != null){

                    let objetoInfoVar = 
                        {
                            "var_nombre": respuesta[i].var_nombre, 
                            "var_descripcion": respuesta[i].var_descripcion,
                            "det_valor": respuesta[i].det_valor
                        }

                    objeto.push(objetoInfoVar)
                }
            }
            
            res.status(200).json(objeto)
        }
        else{
            res.status(404).json({"mensaje":"No se ecntraron fichas"})
        }

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor"})
    }

}
