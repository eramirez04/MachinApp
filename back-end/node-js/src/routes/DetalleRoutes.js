import {Router} from 'express'

import {registrarDetalle,  listarDetalle, actualizarDetalles, eliminarDetalle, registrarDetalles} from "../controllers/DetalleController.js"

import {validar_detalle} from '../../validar/fichas/validationDetalle.js'


import { verificar } from '../middlewares/LoginMidleware.js'

const rutaDetalle = Router()

rutaDetalle.post('/registrar',/*  verificar, validar_detalle, */ registrarDetalle)
rutaDetalle.get('/listar', verificar, listarDetalle)
rutaDetalle.put('/actualizar',/* verificar, validar_detalle, */  actualizarDetalles)
rutaDetalle.delete('/eliminar/:idDetalle',verificar, eliminarDetalle)

rutaDetalle.post('/registrarDetalles',/*  verificar, validar_detalle, */ registrarDetalles)

export default rutaDetalle