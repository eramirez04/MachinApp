import { Router } from "express";

import{registrarVariable, actualizarVariable, listarVariable, eliminarVariable, registrarVariasVariables} from '../controllers/VariableController.js'

import {validar_variable, validar_varias_variables} from '../../validar/fichas/validationVariable.js'

import { verificar } from "../middlewares/LoginMidleware.js";



const rutaVariable = Router()

rutaVariable.post('/registrar',verificar,validar_variable,registrarVariable)
rutaVariable.get('/listar', verificar, listarVariable)
rutaVariable.put('/actualizar/:idVariable', verificar, validar_variable,actualizarVariable)
rutaVariable.delete('/eliminar/:idVariable', verificar, eliminarVariable)

rutaVariable.get('/registrarConjuntoVar', verificar, validar_varias_variables, registrarVariasVariables )

export default rutaVariable