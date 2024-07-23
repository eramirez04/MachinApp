import { Router } from "express"
import { listarArea, registrarArea, editarArea, eliminarArea, cargarImagenArea, listarAreaPorId, listarAreasPorSede } from "../controllers/areasController.js"
import { verificarArea } from "../../validar/areasValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaArea = Router()

rutaArea.get('/listararea', verificar, listarArea)
rutaArea.post('/registrararea', verificar, verificarArea, cargarImagenArea, registrarArea)
rutaArea.delete('/eliminararea/:id_area', verificar, eliminarArea)
rutaArea.put('/editararea/:id_area', verificar, verificarArea, cargarImagenArea, editarArea)
rutaArea.get('/listararea/:id_area', verificar, listarAreaPorId)
rutaArea.get('/listarporsede/:id_sede', verificar, listarAreasPorSede)

export default rutaArea