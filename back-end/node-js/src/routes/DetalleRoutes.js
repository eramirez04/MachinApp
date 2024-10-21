import {Router} from 'express'

import {registrarDetalle,  listarDetalle, actualizarDetalles, eliminarDetalle, registrarDetalles} from "../controllers/DetalleController.js"

import {validar_detalles, validar_detalles_put} from '../../validar/fichas/validationDetalle.js'


import { verificar } from '../middlewares/LoginMidleware.js'

const rutaDetalle = Router()

rutaDetalle.post('/registrar',/*  verificar, validar_detalle, */ registrarDetalle)
rutaDetalle.get('/listar', verificar, listarDetalle)
rutaDetalle.put('/actualizar',verificar, validar_detalles_put,  actualizarDetalles)
rutaDetalle.delete('/eliminar/:idDetalle',verificar, eliminarDetalle)

rutaDetalle.post('/registrarDetalles', verificar, validar_detalles, registrarDetalles)

export default rutaDetalle