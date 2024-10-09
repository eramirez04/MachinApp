import { check } from "express-validator";

export const validar_actividad=[
    check('acti_nombre','el nombre es necesario').not().isEmpty().isLength({max:200,min:3}),
    check('acti_descripcion','la descripcion es necesaria').not().isEmpty(),
    check('acti_fk_solicitud','Datos inválidos').not().isEmpty().isInt(),
]