import { check } from "express-validator"

export const verificarTipoSitio = [
    check('tipo_sitio','Datos inválidos').not().isEmpty().isLength({max:255,min:2})
]