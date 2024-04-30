import { Router } from "express";
import { EliminarUsuario, ListarTecnicos, ListarUsuarioId, ListarUsuarios, Store, actualizarUsuario } from "../controllers/UserController.js";

// verificacion de campos
import { middlewareUsuario, middlewareUsuarioActualizar } from "../../validar/middlewareUsuarios/UsuariosMiddleware.js";

// validar token 
import { verificar } from "../middlewares/LoginMidleware.js";


import { recuperaraContra } from "../controllers/UserController.js";

const RutaUsuario = Router()

RutaUsuario.post('/registrar', middlewareUsuario,Store)
RutaUsuario.get('/listar', verificar,ListarUsuarios)
RutaUsuario.put('/actualizar/:id',middlewareUsuarioActualizar, verificar,actualizarUsuario)
RutaUsuario.delete('/eliminar/:id', verificar, EliminarUsuario)
RutaUsuario.get('/listar/:id', verificar, ListarUsuarioId)
RutaUsuario.get('/tecnico', verificar, ListarTecnicos)

RutaUsuario.post('/recuperar',recuperaraContra)

export default RutaUsuario