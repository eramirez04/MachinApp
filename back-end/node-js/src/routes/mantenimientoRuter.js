/* routeusuario */
import { Router } from "express";
import {listarRequerimiento5, listarMantenimientoPorId, registrarMantenimiento, listarRequerimiento17, mantenimientoDeMaquinas } from "../controllers/mantenimientoController.js";
const mantenimiento= Router();

import {VerificarMantenimiento} from '../../validar/mantenimiento/mantenimiento_validar.js'
import {verificar} from '../middlewares/LoginMidleware.js'

/* requerimiento 5 */
mantenimiento.get('/listarRequerimiento/', verificar, listarRequerimiento5);

/* 5.2 lista por ID y activdades*/
mantenimiento.get('/listar_por_id/:idMantenimiento',verificar, listarMantenimientoPorId);

/* registrar es el requerimiento 14 */
mantenimiento.post('/registrar',verificar, VerificarMantenimiento, registrarMantenimiento);

/* listar es el requerimiento 17 */
mantenimiento.get('/listarRequerimiento17/:fecha_realizacion', verificar, listarRequerimiento17);

/* listar por id de fichas */
mantenimiento.get('/listar_por_ficha/:idFichas', verificar, mantenimientoDeMaquinas);

export default mantenimiento
