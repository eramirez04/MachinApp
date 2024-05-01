import { check } from "express-validator"

export const validar_variable = [
    check('varNombre', 'Es obligatorio ingresar el nombre de la variable').not().isEmpty().isLength({max:255, min:2}),
    check('varDescripcion', 'Es obligatorio ingresar la descripcion de la variable').not().isEmpty(),
    check('fkTipoFicha', 'Es necesario indicarle a que tipo de ficha pertenece').not().isEmpty().isInt(),
]