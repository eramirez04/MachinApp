import { Router } from "express"
import { registrarCentro, listarCentro, eliminarCentro, editarCentro } from "../controllers/centrosController.js"

const rutaCentro = Router()

rutaCentro.get('/listarcentro', listarCentro)
rutaCentro.post('/registrarcentro', registrarCentro)
rutaCentro.delete('/eliminarcentro/:id_centro', eliminarCentro)
rutaCentro.put('/editarcentro/:id_centro', editarCentro)

export default rutaCentro