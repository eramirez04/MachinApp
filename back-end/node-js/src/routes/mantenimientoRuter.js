import { Router } from "express";
import { registrarMantenimiento, listartodosmantenimientos, actualizarMantenimiento, graficas, listarMantenimientoPorId, excelconsultavariables  } from "../controllers/mantenimientoController.js";
import { VerificarMantenimiento } from '../../validar/mantenimiento/mantenimiento_validar.js';
import { verificar } from '../middlewares/LoginMidleware.js';

const mantenimiento = Router();

mantenimiento.post('/registrar', verificar, registrarMantenimiento);

mantenimiento.get('/listar/', verificar, listartodosmantenimientos);

mantenimiento.put('/Actualizar_mantenimiento/:idMantenimiento', verificar, actualizarMantenimiento);

mantenimiento.get('/listar_por_id/:idMantenimiento',verificar, listarMantenimientoPorId);

mantenimiento.get("/grafica/", graficas);

mantenimiento.get("/excelconsultavariables", verificar, excelconsultavariables);

export default mantenimiento;