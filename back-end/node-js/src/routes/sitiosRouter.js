import { Router } from "express"
import { listarSitio, editarSitio, eliminarSitio, registrarSitio, cargarImagenSitio, listarSitioPorId, listarSitiosPorArea } from "../controllers/sitiosController.js"
import { verificarSitio } from "../../validar/sitiosValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaSitio = Router()

rutaSitio.get('/listarsitio', verificar, listarSitio)
rutaSitio.get('/listarsitioporid/:id_sitio', verificar, listarSitioPorId)
rutaSitio.post('/registrarsitio', verificar, verificarSitio, cargarImagenSitio, registrarSitio)
rutaSitio.delete('/eliminarsitio/:id_sitio', verificar, eliminarSitio)
rutaSitio.put('/editarsitio/:id_sitio', verificar, verificarSitio, cargarImagenSitio, editarSitio)
rutaSitio.get('/listarporarea/:id_area', verificar, listarSitiosPorArea)

export default rutaSitio