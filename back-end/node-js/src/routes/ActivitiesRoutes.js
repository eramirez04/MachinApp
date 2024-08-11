import { Router } from "express";

import { validar_actividad } from "../../validar/Actividades/validationActividades.js";

import {
  listarActividades,
  registrarActividades,
  eliminarActividades,
  actualizarActividades,
  registrarVariasActividades,
  listarActividadesFecha,
} from "../controllers/activitiesController.js";

import { verificar } from "../middlewares/LoginMidleware.js";

const ActivitiesRoutes = Router();

ActivitiesRoutes.get("/listar", verificar, listarActividades);
ActivitiesRoutes.get("/listar/:acti_fecha_realizacion", verificar, listarActividadesFecha);

ActivitiesRoutes.post(
  "/registrar",
  verificar,
  validar_actividad,
  registrarActividades
);
ActivitiesRoutes.post(
  "/registrarvarias",
  verificar,
  validar_actividad,
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
