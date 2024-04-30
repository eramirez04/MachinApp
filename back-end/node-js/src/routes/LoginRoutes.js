import { Router } from "express";
import { Login } from "../controllers/Login.js";
import { verificar } from "../middlewares/LoginMidleware.js";

const LoginRouter = Router()

LoginRouter.post('/login', Login)

export default LoginRouter