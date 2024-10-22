import { Router } from "express";
import {listarTipoMantenimiento, registrarTipoMantenimiento, eliminarTipoMantenimiento, actualizarTipoMantenimiento} from "../controllers/tipoMantController.js";
const tipoMantRoutes= Router();

import {VerificarTipoMantenimiento} from '../../validar/mantenimiento/tipo_mantenimiento_validar.js'
import {verificar} from '../middlewares/LoginMidleware.js'

tipoMantRoutes.get('/listar', verificar,listarTipoMantenimiento);

tipoMantRoutes.post('/registrar', verificar,VerificarTipoMantenimiento, registrarTipoMantenimiento);

tipoMantRoutes.delete('/eliminar/:idTipo_mantenimiento', verificar, eliminarTipoMantenimiento);

tipoMantRoutes.put('/actualizar/:idTipo_mantenimiento',VerificarTipoMantenimiento, actualizarTipoMantenimiento);

export default tipoMantRoutes