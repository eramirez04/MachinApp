import { Router } from "express";

import{registrarVariable, actualizarVariable, listarVariable, eliminarVariable} from '../controllers/VariableController.js'


const rutaVariable = Router()

rutaVariable.post('/registrar',registrarVariable)
rutaVariable.get('/listar', listarVariable)
rutaVariable.put('/actualizar/:idVariable', actualizarVariable)
rutaVariable.delete('/eliminar/:idVariable', eliminarVariable)


export default rutaVariable