import { Router } from "express"
import { registrarCentro } from "../controllers/centrosController.js"

const rutaCentro = Router()

rutaCentro.post('/registrar', registrarCentro)

export default rutaCentro