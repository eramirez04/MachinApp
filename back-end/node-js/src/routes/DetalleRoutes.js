import {Router} from 'express'

import {registrarDetalle,  listarDetalle, actualizarDetalle, eliminarDetalle} from "../controllers/DetalleController.js"

import {validar_detalle} from '../../validar/validationDetalle.js'


import { verificar } from '../middlewares/LoginMidleware.js'

const rutaDetalle = Router()

rutaDetalle.post('/registrar',verificar, validar_detalle, registrarDetalle)
rutaDetalle.get('/listar', verificar, validar_detalle, listarDetalle)
rutaDetalle.put('/actualizar/:idDetalle',verificar, validar_detalle,  actualizarDetalle)
rutaDetalle.delete('/eliminar/:idDetalle',verificar, validar_detalle,  eliminarDetalle)


export default rutaDetalle