/* routeusuario */
import { Router } from "express";
import {listarRequerimiento5, listarMantenimientoPorId, listarRequerimiento16, mantenimientoDeMaquinas, listartodosmantenimientos, listarMantenimientoPorId_mantenimiento, registrarMantenimiento, listarMantenimientoPorFicha, eliminarMantenimiento, actualizarMantenimiento  } from "../controllers/mantenimientoController.js";
const mantenimiento= Router();

import {VerificarMantenimiento} from '../../validar/mantenimiento/mantenimiento_validar.js'
import {verificar} from '../middlewares/LoginMidleware.js'

/* requerimiento 5 */
mantenimiento.get('/listarRequerimiento/', verificar, listarRequerimiento5);

/* 5.2 lista por ID y activdades*/
mantenimiento.get('/listar_por_id/:idMantenimiento',verificar, listarMantenimientoPorId);

/* registrar es el requerimiento 14 */
mantenimiento.post('/registrar',verificar, VerificarMantenimiento, registrarMantenimiento);

/* listar es el requerimiento 16 */
mantenimiento.get('/listarRequerimiento16/:fecha_realizacion', verificar, listarRequerimiento16);

/* listar por id de fichas */
mantenimiento.get('/listar_por_ficha/:idFichas', verificar, mantenimientoDeMaquinas);




/* front-end */

/* listar mantenimientos */
mantenimiento.get('/listar/', listartodosmantenimientos);

/* listar mantenimientos por id */
mantenimiento.get('/listar/:mant_codigo_mantenimiento', listarMantenimientoPorId_mantenimiento);


/* registrar es el requerimiento 14 */
mantenimiento.post('/Registrar_Mantenimiento', registrarMantenimiento);


/* listar por mantenimineto ficha soporte */
mantenimiento.get('/listar_por_ficha/:mant_ficha_soporte', listarMantenimientoPorFicha);

/* Eliminar mantenimiento */
mantenimiento.delete('/Eliminar_mantenimiento/:id', eliminarMantenimiento);

/* actualizar */
mantenimiento.put('/Actualizar_mantenimiento/:id', actualizarMantenimiento);

export default mantenimiento
