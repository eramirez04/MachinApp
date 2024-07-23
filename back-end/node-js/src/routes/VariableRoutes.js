import { Router } from "express";

import{ actualizarVariable, listarVariable, eliminarVariable, registrarVariable} from '../controllers/VariableController.js'

import {validar_variable, validar_varias_variables} from '../../validar/fichas/validationVariable.js'

import { verificar } from "../middlewares/LoginMidleware.js";



const rutaVariable = Router()

rutaVariable.post('/registrar',verificar, validar_variable, registrarVariable)
rutaVariable.get('/listar', verificar, listarVariable)
rutaVariable.put('/actualizar/:idVariable', verificar, validar_variable,actualizarVariable)
rutaVariable.delete('/eliminar/:idVariable', verificar, eliminarVariable)

export default rutaVariable