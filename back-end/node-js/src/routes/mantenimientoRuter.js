/* routeusuario */
import { Router } from "express";
import {listarRequerimiento5, listarMantenimientoPorId, registrarMantenimiento, listarRequerimiento17, mantenimientoDeMaquinas } from "../controllers/mantenimientoController.js";
const mantenimiento= Router();

/* requerimiento 5 */
mantenimiento.get('/listarRequerimiento/', listarRequerimiento5);

/* 5.2 lista por ID y activdades*/
mantenimiento.get('/listar_por_id/:idMantenimiento', listarMantenimientoPorId);

/* registrar es el requerimiento 14 */
mantenimiento.post('/registrar',registrarMantenimiento);

/* listar es el requerimiento 17 */
mantenimiento.get('/listarRequerimiento17/:fecha_realizacion', listarRequerimiento17);

/* listar por id de fichas */
mantenimiento.get('/listar_por_ficha/:idFichas', mantenimientoDeMaquinas);

export default mantenimiento
