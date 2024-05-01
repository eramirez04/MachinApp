import { check } from "express-validator"

export const validar_detalle = [
    check('detFkFicha', 'Es necesario indicarle a que ficha pertenece').not().isEmpty().isInt(),
    check('detFkVariable', 'Es necesario indicarle a que variable pertenece').not().isEmpty().isInt(),
    check('detValor', 'Es necesario darle un valor a la variable').not().isEmpty().isLength({min:3, max:255}),
]

