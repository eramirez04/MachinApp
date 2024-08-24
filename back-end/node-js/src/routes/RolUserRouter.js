import { Router } from "express";
import listarRoles, {
  RegistraRol,
  actualizarRol,
  eliminarRol,
  listarRolId,
} from "../controllers/RolUserController.js";

//verificar token
import { verificar } from "../middlewares/LoginMidleware.js";

// verificar si es administrador
import { isAdmin, adminAndInstructor } from "../middlewares/isAdministrador.js";

//verificar campos
import { middlewareRolRegistro } from "../../validar/usuariosValidaciones/RolRequest.js";

const RutaRol = Router();

RutaRol.post("/registrar", verificar, middlewareRolRegistro, RegistraRol);
RutaRol.get("/listar", verificar, listarRoles);
RutaRol.delete("/eliminar/:id", verificar, eliminarRol);
RutaRol.put("/actualizar/:id", verificar, actualizarRol);
RutaRol.get("/listar/:id", verificar, listarRolId);

export default RutaRol;
