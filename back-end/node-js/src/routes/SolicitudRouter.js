import { Router } from "express";
import {
  registarSolicitud,
  obtenerSolicitudes,
  actualizarSolicitudes,
} from "../controllers/solicitudController.js";

const solicitudRouter = Router();

solicitudRouter.post("/", registarSolicitud);
solicitudRouter.get("/", obtenerSolicitudes);
solicitudRouter.put("/:idSolicitud", actualizarSolicitudes);

export default solicitudRouter;
