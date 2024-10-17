import { Router } from "express";
import {
  registarSolicitud,
  obtenerSolicitudes,
  actualizarSolicitudes,
  listarSolicitudPorId,
  obtenerSolicitudesPDF,

} from "../controllers/solicitudController.js";

import { verificar } from "../middlewares/LoginMidleware.js";

const solicitudRouter = Router();

solicitudRouter.post("/", verificar, registarSolicitud);
solicitudRouter.get("/",verificar, obtenerSolicitudes);
solicitudRouter.get("/PDF", verificar, obtenerSolicitudesPDF);


solicitudRouter.put("/actualizar/:id",verificar, actualizarSolicitudes);
solicitudRouter.get("/listarPorId/:idSolicitud",verificar, listarSolicitudPorId);


export default solicitudRouter;