import { Router } from "express"
import {registrarTipoFicha, listarTipoFicha, actualizarTipoFicha, eliminarTipoFicha} from "../controllers/TipoFichaController.js"


const rutaTipoFicha = Router()

rutaTipoFicha.post('/registrar', registrarTipoFicha )
rutaTipoFicha.get('/listar', listarTipoFicha )
rutaTipoFicha.put('/actualizar/:idTipoFicha',actualizarTipoFicha)
rutaTipoFicha.delete('/eliminar/:idTipoFicha', eliminarTipoFicha)



export default rutaTipoFicha