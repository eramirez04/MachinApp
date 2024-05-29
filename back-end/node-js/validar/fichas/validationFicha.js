import { check } from "express-validator"

export const validar_ficha = [
    check('fiFecha','Es obligatorio ingresar la fecha').not().isEmpty(),
    check('placaSena','Es obligatorio ingresar la placa SENA').not().isEmpty().isLength({min:3, max:255}),
    check('serial','Es obligatorio ingresar el serial').not().isEmpty().isLength({min:3, max:50}),
    check('fechaAdquisicion','Es obligatorio ingresar la fecha de adquisicion').not().isEmpty(),
    check('fechaInicioGarantia','Es obligatorio ingresar la fehca de inicio de garantia').not().isEmpty(),
    check('fechaFinGarantia','Es obligatorio ingresar la fehca fin de garantia').not().isEmpty(),
    check('descipcionGarantia','La descripcion de la garantia es obligatoria').not().isEmpty().isLength({min:3}),
    /* check('fiImagen','Es obligatorio ingresar la imagen').not().isEmpty(), */
    check('fiEstado','Es obligatorio ingresar el estado').isIn(['operacion', 'fuera_de_servicio', 'en_reparacion']),
    check('fk_sitio','Es obligatorio indicarle el sitio').not().isEmpty().isInt(),
    check('fk_tipo_ficha','Es obligatorio indicarle el tipo de ficha').not().isEmpty().isInt(),
]

