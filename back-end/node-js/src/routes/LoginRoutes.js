import { Router } from "express";
import { Login } from "../controllers/Login.js";
import { verificar } from "../middlewares/LoginMidleware.js";

import { LoginMiddleware } from "../../validar/middlewareUsuarios/LoginMiddleware.js";

const LoginRouter = Router()

LoginRouter.post('/login', LoginMiddleware, Login)

export default LoginRouter