import { check } from "express-validator"

export const validar_detalles = [
    check('detalles.*.detFkVariable', 'Es necesario indicarle a que variable pertenece').not().isEmpty().isInt(),
    check('detalles.*.detValor', 'Es necesario ingresar el valor').not().isEmpty()
]


export const validar_detalles_put = [
    check('detalles.*.detValor', 'Es necesario ingresar el valor').not().isEmpty()
]