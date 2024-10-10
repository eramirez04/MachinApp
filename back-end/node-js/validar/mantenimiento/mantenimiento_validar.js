import { check } from "express-validator";

export const VerificarMantenimiento = [
    check('mant_codigo_mantenimiento', 'El código de mantenimiento es obligatorio').notEmpty().isLength({min: 1, max: 250}),
    check('mant_estado', 'El estado es obligatorio y debe ser uno de los valores permitidos').notEmpty().isIn(['Pendiente', 'En Proceso', 'Completado', 'En Espera']),
    check('mant_fecha_proxima', 'La fecha próxima es obligatoria y debe ser válida').notEmpty().isISO8601().toDate(),
    check('man_fecha_realizacion', 'La fecha de realización es obligatoria y debe ser válida').notEmpty().isISO8601().toDate(),
    check('mant_descripcion', 'La descripción es obligatoria').notEmpty(),
    check('mant_ficha_soporte', 'La ficha de soporte debe ser una cadena de texto').optional().isString(),
    check('mant_costo_final', 'El costo final debe ser un número válido').optional().isNumeric(),
    check('fk_tipo_mantenimiento', 'El tipo de mantenimiento es obligatorio y debe ser un número positivo').notEmpty().isInt({min: 1}),
    check('fk_solicitud_mantenimiento', 'La solicitud de mantenimiento es obligatoria y debe ser un número positivo').notEmpty().isInt({min: 1}),
    check('tecnico', 'El técnico es obligatorio y debe ser un número positivo').notEmpty().isInt({min: 1}),
];