import { Router } from "express";

import{registrarVariable, actualizarVariable, listarVariable, eliminarVariable} from '../controllers/VariableController.js'

import {validar_variable} from '../../validar/validationVariable.js'

import { verificar } from "../middlewares/LoginMidleware.js";



const rutaVariable = Router()

rutaVariable.post('/registrar',verificar,validar_variable,registrarVariable)
rutaVariable.get('/listar', verificar, listarVariable)
rutaVariable.put('/actualizar/:idVariable', verificar, validar_variable,actualizarVariable)
rutaVariable.delete('/eliminar/:idVariable', verificar, eliminarVariable)


export default rutaVariable