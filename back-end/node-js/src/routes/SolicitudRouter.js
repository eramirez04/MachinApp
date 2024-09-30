import { Router } from "express";
import {
  registarSolicitud,
  obtenerSolicitudes,
  actualizarSolicitudes,
  listarSolicitudPorId,
} from "../controllers/solicitudController.js";

const solicitudRouter = Router();

solicitudRouter.post("/", registarSolicitud);
solicitudRouter.get("/", obtenerSolicitudes);
solicitudRouter.put("/:idSolicitud", actualizarSolicitudes);
solicitudRouter.get("listarPorId/:idSolicitud",  /* verificar, */ listarSolicitudPorId )

export default solicitudRouter;