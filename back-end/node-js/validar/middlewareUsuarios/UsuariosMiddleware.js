import {check} from "express-validator"

export const middlewareUsuario = [
    check('nombre', 'Campo Nombre requerido').not().isEmpty().isLength({ max: 255, min: 5 }),
    check('apellidos', 'Campo apellidos es requirido').not().isEmpty().isLength({ max: 100, min: 5 }),
    check('correo', 'Correo es obligatorio').not().isEmpty().isEmail().isLength({ max: 150, min: 5 }),
    check('numero_documento', 'Número de documento es obligatorio').not().isEmpty().isLength({ max: 50, min: 8 }),
    check('tipo_documento', 'Seleccione tipo de documento').not().isEmpty().isIn(['cedula de ciudadania','tarjeta identidad','cedula extranjeria']),
    check('contrasenia', 'Campo requirido').not().isEmpty().isLength({ max: 50, min: 4 }),
    check('rol', 'Campo requirido').not().isEmpty().isLength({ max: 50, min: 1 }),
]


export const middlewareUsuarioActualizar = [
    check('nombre', 'Campo Nombre requerido').not().isEmpty().isLength({ max: 255, min: 5 }),
    check('apellidos', 'Campo apellidos es requirido').not().isEmpty().isLength({ max: 100, min: 5 }),
    check('correo', 'Correo es obligatorio').not().isEmpty().isEmail().isLength({ max: 150, min: 5 }),
    check('tipo_documento', 'Seleccione tipo de documento').not().isEmpty().isIn(['cedula de ciudadania','tarjeta identidad','cedula extranjeria']),
    check('contrasenia', 'Campo requirido').not().isEmpty().isLength({ max: 50, min: 4 }),
    check('rol', 'Campo requirido').not().isEmpty().isLength({ max: 50, min: 1 }),
]


export const middlewareUsuarioActualizarTec = [
    check('especialidad', 'Campo requirido').not().isEmpty().isLength({ max: 50, min: 4 }),
    check('empresa', 'Campo requirido').not().isEmpty().isLength({ max: 50, min: 4 }),
]