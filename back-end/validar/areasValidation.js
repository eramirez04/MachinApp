import { check } from "express-validator"

export const verificarArea = [
    check('area_nombre','Datos inválidos').not().isEmpty().isLength({max:255,min:1}),
    check('area_fk_sedes','Datos inválidos').not().isEmpty().isInt()
]