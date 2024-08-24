import { Router } from "express";

import { registrarMantenimiento, listartodosmantenimientos, actualizarMantenimiento  } from "../controllers/mantenimientoController.js";

const mantenimiento= Router();

import {VerificarMantenimiento} from '../../validar/mantenimiento/mantenimiento_validar.js'
import {verificar} from '../middlewares/LoginMidleware.js'

/* registrar es el requerimiento 14 */
mantenimiento.post('/registrar', registrarMantenimiento);

/* listar mantenimientos */
mantenimiento.get('/listar/',verificar, listartodosmantenimientos);

/* actualizar */
mantenimiento.put('/Actualizar_mantenimiento/:id', actualizarMantenimiento);

export default mantenimiento