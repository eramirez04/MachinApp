import { check } from "express-validator"

export const verificarSitio = [
    check('sit_nombre','Datos inválidos').not().isEmpty().isLength({max:100,min:2}),
    check('sit_fk_areas','Datos inválidos').not().isEmpty().isInt(),
    check('sit_fk_tipo_sitio','Datos inválidos').not().isEmpty().isInt()
]