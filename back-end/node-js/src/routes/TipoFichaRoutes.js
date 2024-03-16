import { Router } from "express"
import {registrarTipoFicha, listarTipoFicha, actualizarTipoFicha, eliminarTipoFicha} from "../controllers/TipoFichaController.js"


const rutaTipoFicha = Router()

rutaTipoFicha.get('/registrar', registrarTipoFicha )
rutaTipoFicha.post('/listar', listarTipoFicha )
rutaTipoFicha.put('/actualizar/:idTipoFicha',actualizarTipoFicha)
rutaTipoFicha.delete('/eliminar/:idTipoFicha', eliminarTipoFicha)



export default rutaTipoFicha