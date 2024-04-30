import { Router } from "express"
import { listarSede, registrarSede, eliminarSede, editarSede } from "../controllers/sedesController.js"
import { verificarSede } from "../../../validar/sedesValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaSede = Router()

rutaSede.get('/listarsede', verificar, listarSede)
rutaSede.post('/registrarsede', verificar, verificarSede, registrarSede)
rutaSede.delete('/eliminarsede/:id_sede', verificar, eliminarSede)
rutaSede.put('/editarsede/:id_sede', verificar, verificarSede, editarSede)

export default rutaSede