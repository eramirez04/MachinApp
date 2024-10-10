import { Router } from "express";
import {
  registarSolicitud,
  obtenerSolicitudes,
  actualizarSolicitudes,
  listarSolicitudPorId,
  obtenerSolicitudesPDF,

} from "../controllers/solicitudController.js";

const solicitudRouter = Router();

solicitudRouter.post("/", registarSolicitud);
solicitudRouter.get("/", obtenerSolicitudes);
solicitudRouter.get("/PDF", obtenerSolicitudesPDF);


solicitudRouter.put("/actualizar/:idSolicitud", actualizarSolicitudes);
solicitudRouter.get("/listarPorId/:idSolicitud", listarSolicitudPorId);


export default solicitudRouter;