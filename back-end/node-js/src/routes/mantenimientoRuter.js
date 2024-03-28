/* routeusuario */
import { Router } from "express";
import {listarMantenimiento, registrarMantenimiento, eliminarMantenimiento, actualizarMantenimiento, listarMantenimientoPorId, listarMantenimientoPorId_actividades} from "../controllers/mantenimientoController.js";
const mantenimiento= Router();
/* lista general */
mantenimiento.get('/listar',listarMantenimiento);
/* lista por ID y activdades*/
mantenimiento.get('/listar/:idMantenimiento', listarMantenimientoPorId_actividades);

/* esta era el espacio donde hiba listar por proxima fecha */



/* lista por ID */
mantenimiento.get('/listarPorIdMantenimiento/:idMantenimiento', listarMantenimientoPorId);

/* registrar */
mantenimiento.post('/registrar',registrarMantenimiento);
/* eliminar */
mantenimiento.delete('/eliminar/:id_mantenimiento',eliminarMantenimiento);
/* actualizar */
mantenimiento.put('/actualizar/:id_mantenimiento',actualizarMantenimiento);



export default mantenimiento
