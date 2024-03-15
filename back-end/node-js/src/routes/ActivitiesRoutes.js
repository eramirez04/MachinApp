import { Router } from "express"; 

import {listarUsuarios, registrarUsuarios,eliminarUsuarios,actualizarUsuarios} from "../controllers/activitiesController.js";

const ActivitiesRoutes = Router()


ActivitiesRoutes.get('/listar', listarUsuarios )

ActivitiesRoutes.post('/registrar', registrarUsuarios)

ActivitiesRoutes.delete('/eliminar/:idActividades', eliminarUsuarios)
ActivitiesRoutes.put('/actualizar/:id_actividades', actualizarUsuarios)



export default ActivitiesRoutes