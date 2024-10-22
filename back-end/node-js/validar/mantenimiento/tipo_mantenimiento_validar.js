import { check } from "express-validator";

export const VerificarTipoMantenimiento =[
        check('tipo_mantenimiento','El codigo de mantenimiento es obligatorio u incorrecto').not().isEmpty().isLength({max:250,min:5}),

    ]