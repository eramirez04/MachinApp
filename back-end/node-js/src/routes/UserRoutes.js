import { Router } from "express";
import { EliminarUsuario, ListarTecnicos, ListarUsuarioId, ListarUsuarios, Store, actualizarUsuario } from "../controllers/UserController.js";

const RutaUsuario = Router()

RutaUsuario.post('/registrar', Store)
RutaUsuario.get('/listar', ListarUsuarios)
RutaUsuario.put('/actualizar/:id', actualizarUsuario)
RutaUsuario.delete('/eliminar/:id', EliminarUsuario)
RutaUsuario.get('/listar/:id', ListarUsuarioId)
RutaUsuario.get('/tecnico', ListarTecnicos)

export default RutaUsuario