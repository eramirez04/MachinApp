import { check } from "express-validator"

export const verificarCentro = [
    check('cen_nombre','Datos inválidos').not().isEmpty().isLength({max:200,min:5}),
    check('cen_descripcion','Datos inválidos').not().isEmpty().isLength({max:255,min:10}),
    check('cen_regional','Datos inválidos').not().isEmpty().isLength({max:100,min:3}),
    check('cen_municipio','Datos inválidos').not().isEmpty().isLength({max:100,min:3}),
    check('cen_subdirector','Datos inválidos').not().isEmpty().isLength({max:100,min:5})
]