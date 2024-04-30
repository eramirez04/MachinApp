import { Router } from "express"
import { registrarCentro, listarCentro, eliminarCentro, editarCentro } from "../controllers/centrosController.js"
import { verificarCentro } from "../../../validar/centrosValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaCentro = Router()

rutaCentro.get('/listarcentro', verificar, listarCentro)
rutaCentro.post('/registrarcentro', verificar, verificarCentro, registrarCentro)
rutaCentro.delete('/eliminarcentro/:id_centro', verificar, eliminarCentro)
rutaCentro.put('/editarcentro/:id_centro', verificar, verificarCentro, editarCentro)

export default rutaCentro