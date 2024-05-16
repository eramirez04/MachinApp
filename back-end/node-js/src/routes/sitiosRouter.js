import { Router } from "express"
import { listarSitio, editarSitio, eliminarSitio, registrarSitio, cargarImagenSitio } from "../controllers/sitiosController.js"
import { verificarSitio } from "../../validar/sitiosValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaSitio = Router()

rutaSitio.get('/listarsitio', verificar, listarSitio)
rutaSitio.post('/registrarsitio', verificar, verificarSitio, cargarImagenSitio, registrarSitio)
rutaSitio.delete('/eliminarsitio/:id_sitio', verificar, eliminarSitio)
rutaSitio.put('/editarsitio/:id_sitio', verificar, verificarSitio, editarSitio)

export default rutaSitio