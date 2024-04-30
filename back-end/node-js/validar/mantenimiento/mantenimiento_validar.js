import { check } from "express-validator";

export const VerificarMantenimiento =[
        check('mant_codigo_mantenimiento','El codigo de mantenimiento es obligatorio u incorrecto').not().isEmpty().isLength({max:250,min:5}),

        check('mant_fecha_realizacion', 'La fecha de realizacion es obligatoria y debe ser válida').not().isEmpty(),

        check('mant_fecha_proxima', 'La fecha proxima es obligatoria y debe ser válida').not().isEmpty(),

        check('mant_fk_fichas', 'La ficha relacionada es incorrecta').not().isEmpty(),

        check('fk_tipo_mantenimiento', 'El mantenimiento relacionado es incorrecto').not().isEmpty(),

        check('mant_descripcion','La descripcion es obligatorio u incorrecto').not().isEmpty().isLength({max:250,min:5}),

    ]