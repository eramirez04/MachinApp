import { check } from "express-validator";

export const validar_actividad=[
    check('acti_nombre','el nombre es necesario').not().isEmpty().isLength({max:200,min:3}),
    check('acti_descripcion','la descripcion es necesaria').not().isEmpty(),
    check('acti_fecha_realizacion','la fecha es necesario').not().isEmpty(),
    check('acti_estado','el estado es necesario').not().isEmpty().isLength({max:45,min:3}),
]