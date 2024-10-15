import { Router } from "express";

import{ actualizarVariable, listarVariable, eliminarVariable, registrarVariable,registrarVariasVariables, listarVarFicha, actualizarVariasVariables, listarVarFichaAll} from '../controllers/VariableController.js'

import {validar_variable, validar_varias_variables} from '../../validar/fichas/validationVariable.js'

import { verificar } from "../middlewares/LoginMidleware.js";



const rutaVariable = Router()

rutaVariable.post('/registrar',/* verificar, validar_variable, */ registrarVariable)
rutaVariable.get('/listar', verificar, listarVariable)
rutaVariable.put('/actualizar/:idVariable', verificar, validar_variable,actualizarVariable)
rutaVariable.delete('/eliminar/:idVariable', verificar, eliminarVariable)


/* new */
rutaVariable.post('/registrarVars',registrarVariasVariables)

rutaVariable.get('/listarVars/:idTipoFicha/:tipo_ficha', listarVarFicha)


/* editar varias variables */
rutaVariable.put('/actualizarVars', actualizarVariasVariables)

/* listar todas las variables de un tipo de ficha sin importar su estado */
rutaVariable.get('/listarVariablesAll/:idTipoFicha/:tipo_ficha', listarVarFichaAll)

export default rutaVariable