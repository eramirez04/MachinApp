import { check } from "express-validator"

export const validar_tipoFicha = [
    check('tipoFicha','Es obligatorio ingresar el nombre del tipo de ficha').not().isEmpty().isLength({min:3, max:245}),
    check('tipo_ficha','Es obligatorio ingresar la clase de la ficha').isIn(['equipo', 'ambiente']),
]
