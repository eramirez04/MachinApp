import { check } from "express-validator"

export const validar_tipoFicha = [
    check('tipoFicha', 'Es obligatorio ingresar el nombre del tipo de ficha').not().isEmpty().isLength({min:3, max:245}), 
]

