import { Router } from "express";
import listarRoles, { RegistraRol, actualizarRol, eliminarRol, listarRolId } from "../controllers/RolUserController.js";

const RutaRol = Router()

RutaRol.post('/registrar', RegistraRol)
RutaRol.get('/listar', listarRoles)
RutaRol.delete('/eliminar/:id', eliminarRol)
RutaRol.put('/actualizar/:id', actualizarRol)
RutaRol.get('/listar/:id', listarRolId)


export default RutaRol