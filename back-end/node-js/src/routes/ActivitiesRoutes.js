import { Router } from "express"; 

import{ validar_actividad} from '../../validations/Actividades/validationActividades.js'

import {listarActividades, registrarActividades,eliminarActividades,actualizarActividades} from "../controllers/activitiesController.js";

import {verificar} from "../middlewares/LoginMidleware.js";

const ActivitiesRoutes = Router()


ActivitiesRoutes.get('/listar', listarActividades )

ActivitiesRoutes.post('/registrar',verificar,validar_actividad, registrarActividades)

ActivitiesRoutes.delete('/eliminar/:idActividades', eliminarActividades)
ActivitiesRoutes.put('/actualizar/:id_actividades', actualizarActividades)



export default ActivitiesRoutes