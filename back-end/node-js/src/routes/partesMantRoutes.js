import { Router } from 'express';
import {listarPartesMantenimiento, registrarParteMantenimiento, eliminarParteMantenimiento, actualizarParteMantenimiento, listarPartesMantenimientoPorIdMantenimiento} from '../controllers/partes_mantenimiento_controller.js';
const partesMantRoutes = Router();

partesMantRoutes.get('/listar',  listarPartesMantenimiento);

partesMantRoutes.post('/registrar',   registrarParteMantenimiento);

partesMantRoutes.delete('/eliminar/:id_partes_mantenimiento',  eliminarParteMantenimiento);

partesMantRoutes.put('/actualizar/:id_partes_mantenimiento',   actualizarParteMantenimiento);

partesMantRoutes.get('/listar_por_idmantenimiento/:idMantenimiento',   listarPartesMantenimientoPorIdMantenimiento);

export default partesMantRoutes;