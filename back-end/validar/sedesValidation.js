import { check } from "express-validator"

export const verificarSede = [
    check('sede_nombre','Datos inválidos').not().isEmpty().isLength({max:255,min:5}),
    check('sede_descripcion','Datos inválidos').not().isEmpty().isLength({max:255,min:10}),
    check('sede_direccion','Datos inválidos').not().isEmpty().isLength({max:250,min:3}),
    check('sede_fk_centros','Datos inválidos').not().isEmpty().isInt()
]