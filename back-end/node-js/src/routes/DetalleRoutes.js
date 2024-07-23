import {Router} from 'express'

import {registrarDetalle,  listarDetalle, actualizarDetalle, eliminarDetalle} from "../controllers/DetalleController.js"

import {validar_detalle} from '../../validar/fichas/validationDetalle.js'


import { verificar } from '../middlewares/LoginMidleware.js'

const rutaDetalle = Router()

rutaDetalle.post('/registrar', verificar, validar_detalle, registrarDetalle)
rutaDetalle.get('/listar', verificar, listarDetalle)
rutaDetalle.put('/actualizar/:idDetalle',verificar, validar_detalle,  actualizarDetalle)
rutaDetalle.delete('/eliminar/:idDetalle',verificar, eliminarDetalle)

export default rutaDetalle