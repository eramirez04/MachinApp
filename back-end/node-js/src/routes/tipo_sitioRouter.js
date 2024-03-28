import { Router } from "express"
import { listarTipoSitio, registrarTipoSitio, editarTipoSitio, eliminarTipoSitio } from "../controllers/tipo_sitioController.js"

const rutaTipoSitio = Router()

rutaTipoSitio.get('/listartipositio', listarTipoSitio)
rutaTipoSitio.post('/registrartipositio', registrarTipoSitio)
rutaTipoSitio.delete('/eliminartipositio/:id_tipo_sitio', eliminarTipoSitio)
rutaTipoSitio.put('/editartipositio/:id_tipo_sitio', editarTipoSitio)

export default rutaTipoSitio