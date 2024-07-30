import { Router } from "express";
import { registrar } from "../controllers/solicitud_has_fichasController.js";

const solicitud_has_fichas = Router();

solicitud_has_fichas.post("/", registrar);

export default solicitud_has_fichas;
