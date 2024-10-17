import { check } from "express-validator"

export const validar_ficha = [
    check('placaSena','Es obligatorio ingresar la placa SENA').not().isEmpty().isLength({min:3, max:255}),
    check('fiEstado','Es obligatorio ingresar el estado').isIn(['operacion', 'fuera_de_servicio', 'en_reparacion']),
    check('fk_sitio','Es obligatorio indicarle el sitio').not().isEmpty().isInt(),
    check('fk_tipo_ficha','Es obligatorio indicarle el tipo de ficha').not().isEmpty().isInt(),
]

