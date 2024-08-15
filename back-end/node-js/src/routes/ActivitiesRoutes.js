import { Router } from "express";

import { validar_actividad } from "../../validar/Actividades/validationActividades.js";

import {
  listarActividades,
  registrarActividades,
  eliminarActividades,
  actualizarActividades,
  registrarVariasActividades,

} from "../controllers/activitiesController.js";

import { verificar } from "../middlewares/LoginMidleware.js";

const ActivitiesRoutes = Router();

ActivitiesRoutes.get("/listar", verificar, listarActividades);

ActivitiesRoutes.post(
  "/registrar",
  registrarActividades
);
ActivitiesRoutes.post(
  "/registrarvarias",
  registrarVariasActividades
);

ActivitiesRoutes.delete(
  "/eliminar/:idActividades",
  verificar,
  eliminarActividades
);
ActivitiesRoutes.put(
  "/actualizar/:id_actividades",
  verificar,
  validar_actividad,
  actualizarActividades
);

export default ActivitiesRoutes;
