import { check } from "express-validator"

export const validar_variable = [
    check('varNombre', 'Es obligatorio ingresar el nombre de la variable').not().isEmpty().isLength({max:255, min:2}),
    check('varDescripcion', 'Es obligatorio ingresar la descripcion de la variable').not().isEmpty()
]

export const validar_varias_variables = [
    check("variablesFicha.*.var_nombre", "Ingresar correctamente el nombre de la variable").not().isEmpty(),
    check("variablesFicha.*.var_clase","Es obligatorio ingresar la clase de la variable").isIn(['obligatoria', 'especificacionesTecnicas', 'seccion', 'especifica']),
    check("variablesFicha.*.var_tipoDato","Es obligatorio ingresar el tipo de dato. ").isIn(['number', 'text', 'date', 'file'])
]


export const validar_varias_variables_put = [
    check("variablesFicha.*.var_nombre", "Ingresar correctamente el nombre de la variable").not().isEmpty(),
    check("variablesFicha.*.var_estado","Es obligatorio ingresar el estado").isIn(['activo', 'inactivo'])
]
