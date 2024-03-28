import { Router } from "express"
import { listarSitio, editarSitio, eliminarSitio, registrarSitio } from "../controllers/sitiosController.js"

const rutaSitio = Router()

rutaSitio.get('/listarsitio', listarSitio)
rutaSitio.post('/registrarsitio', registrarSitio)
rutaSitio.delete('/eliminarsitio/:id_sitio', eliminarSitio)
rutaSitio.put('/editarsitio/:id_sitio', editarSitio)

export default rutaSitio