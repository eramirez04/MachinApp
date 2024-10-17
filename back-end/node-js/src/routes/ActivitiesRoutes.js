import { Router } from "express";

import { validar_actividad } from "../../validar/Actividades/validationActividades.js";

import {
  listarActividades,
  registrarActividades,
  eliminarActividades,
  actualizarActividades,
  registrarVariasActividades,
  listarActividadesdeSolicitudes,

} from "../controllers/activitiesController.js";

import { verificar } from "../middlewares/LoginMidleware.js";

const ActivitiesRoutes = Router();

ActivitiesRoutes.get("/listar", listarActividades);

ActivitiesRoutes.get("/listarSolicitud/:idSolicitud", listarActividadesdeSolicitudes);


ActivitiesRoutes.post(
  "/registrar",
  validar_actividad,
  registrarActividades
);
ActivitiesRoutes.post(
  "/registrarvarias",
  validar_actividad,
  registrarVariasActividades
);

ActivitiesRoutes.delete(
  "/eliminar/:idActividades",
  verificar,
  eliminarActividades
);
ActivitiesRoutes.put(
  "/actualizar/:idActividades",
  validar_actividad,
  actualizarActividades
);

export default ActivitiesRoutes;
