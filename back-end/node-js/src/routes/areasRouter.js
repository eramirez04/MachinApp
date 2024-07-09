import { Router } from "express"
import { listarArea, registrarArea, editarArea, eliminarArea, cargarImagenArea } from "../controllers/areasController.js"
import { verificarArea } from "../../validar/areasValidation.js"
import { verificar } from "../middlewares/LoginMidleware.js"

const rutaArea = Router()

rutaArea.get('/listararea', listarArea)
rutaArea.post('/registrararea', verificar, verificarArea, cargarImagenArea, registrarArea)
rutaArea.delete('/eliminararea/:id_area', verificar, eliminarArea)
rutaArea.put('/editararea/:id_area', verificar, verificarArea, editarArea)

export default rutaArea