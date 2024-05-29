import { check } from "express-validator";

export const LoginMiddleware = [
    check('correo', 'Campo Correo es requerido').not().isEmpty().isEmail().isLength({ max: 45, min: 5 }),
    check('contrasenia', 'La contraseña es requerida').not().isEmpty().isLength({ min: 5 })
]