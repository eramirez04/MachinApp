import { Router } from "express";
import { registrar,actualizar,listarFichas_has_Solicitudes } from "../controllers/solicitud_has_fichasController.js";

const solicitud_has_fichas = Router();

solicitud_has_fichas.post("/", registrar);
solicitud_has_fichas.put("/:id_solicitud_has_fichas", actualizar);
solicitud_has_fichas.get("/listarSolicitud/:idSolicitud", listarFichas_has_Solicitudes);


export default solicitud_has_fichas;
