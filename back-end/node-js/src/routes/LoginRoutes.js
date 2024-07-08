import { Router } from "express";
import { Login } from "../controllers/Login.js";

const LoginRouter = Router();

LoginRouter.post("/login", Login);

export default LoginRouter;
