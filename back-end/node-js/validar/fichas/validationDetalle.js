import { check } from "express-validator"

export const validar_detalle = [
    check('detFkFicha', 'Es necesario indicarle a que ficha pertenece').not().isEmpty().isInt(),
    check('detFkVariable', 'Es necesario indicarle a que variable pertenece').not().isEmpty().isInt(),
    check('detValor', 'Es ingresar el campo, asi este basio').exists(),
]