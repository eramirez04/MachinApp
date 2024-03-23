import { Router } from "express"
import { listarSede, registrarSede, eliminarSede, editarSede } from "../controllers/sedesController.js"

const rutaSede = Router()

rutaSede.get('/listarsede', listarSede)
rutaSede.post('/registrarsede', registrarSede)
rutaSede.delete('/eliminarsede/:id_sede', eliminarSede)
rutaSede.put('/editarsede/:id_sede', editarSede)

export default rutaSede