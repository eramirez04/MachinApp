import { Router } from "express";

import { validar_actividad } from "../../validar/Actividades/validationActividades.js";

import {
  listarActividades,
  registrarActividades,
  eliminarActividades,
  actualizarActividades,
  listarActividadesdeSolicitudes,

} from "../controllers/activitiesController.js";

import { verificar } from "../middlewares/LoginMidleware.js";

const ActivitiesRoutes = Router();

ActivitiesRoutes.get("/listar", listarActividades);

ActivitiesRoutes.get("/listarSolicitud/:idSolicitud", listarActividadesdeSolicitudes);


ActivitiesRoutes.post(
  "/registrar",
  verificar,
  validar_actividad,
  registrarActividades
);


ActivitiesRoutes.delete( 
  "/eliminar/:idActividades",
  verificar,
  eliminarActividades
);
ActivitiesRoutes.put(
  "/actualizar/:idActividades",
  verificar,
  validar_actividad,
  actualizarActividades
);

export default ActivitiesRoutes;
