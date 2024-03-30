import { Router } from "express"; 

import {listarActividades, registrarActividades,eliminarActividades,actualizarActividades} from "../controllers/activitiesController.js";

const ActivitiesRoutes = Router()


ActivitiesRoutes.get('/listar', listarActividades )

ActivitiesRoutes.post('/registrar', registrarActividades)

ActivitiesRoutes.delete('/eliminar/:idActividades', eliminarActividades)
ActivitiesRoutes.put('/actualizar/:id_actividades', actualizarActividades)



export default ActivitiesRoutes