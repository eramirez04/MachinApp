import {check} from "express-validator"


export const middlewareRolRegistro = [
    check('nombre', 'Campo Nombre requerido').not().isEmpty().isLength({ max: 45, min: 5 }),
    check('descripcion', 'Campo Nombre requerido').not().isEmpty().isLength({ min: 5 })
]