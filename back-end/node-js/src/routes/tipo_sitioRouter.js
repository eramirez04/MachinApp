import { Router } from "express"
import { listarTipoSitio, registrarTipoSitio, editarTipoSitio, eliminarTipoSitio } from "../controllers/tipo_sitioController.js"
import { verificarTipoSitio } from "../../validar/tipositioValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaTipoSitio = Router()

rutaTipoSitio.get('/listartipositio', verificar, listarTipoSitio)
rutaTipoSitio.post('/registrartipositio', verificar, verificarTipoSitio, registrarTipoSitio)
rutaTipoSitio.delete('/eliminartipositio/:id_tipo_sitio', verificar, eliminarTipoSitio)
rutaTipoSitio.put('/editartipositio/:id_tipo_sitio', verificar, verificarTipoSitio, editarTipoSitio)

export default rutaTipoSitio