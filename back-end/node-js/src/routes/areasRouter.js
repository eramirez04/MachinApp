import { Router } from "express"
import { listarArea, registrarArea, editarArea, eliminarArea } from "../controllers/areasController.js"

const rutaArea = Router()

rutaArea.get('/listararea', listarArea)
rutaArea.post('/registrararea', registrarArea)
rutaArea.delete('/eliminararea/:id_area', eliminarArea)
rutaArea.put('/editararea/:id_area', editarArea)

export default rutaArea