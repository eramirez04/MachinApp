import { Router } from "express";
import {listarTipoMantenimiento, registrarTipoMantenimiento, eliminarTipoMantenimiento, actualizarTipoMantenimiento} from "../controllers/tipoMantController.js";
const tipoMantRoutes= Router();

tipoMantRoutes.get('/listar',listarTipoMantenimiento);

tipoMantRoutes.post('/registrar',registrarTipoMantenimiento);

tipoMantRoutes.delete('/eliminar/:idTipo_mantenimiento',eliminarTipoMantenimiento);

tipoMantRoutes.put('/actualizar/:idTipo_mantenimiento',actualizarTipoMantenimiento);

export default tipoMantRoutes