import { Router } from "express"
import {registrarTipoFicha, listarTipoFicha, actualizarTipoFicha, eliminarTipoFicha} from "../controllers/TipoFichaController.js"
import {validar_tipoFicha} from "../../validar/fichas/validationTipoFicha.js"

import { verificar } from "../middlewares/LoginMidleware.js"



const rutaTipoFicha = Router()

rutaTipoFicha.post('/registrar',verificar, validar_tipoFicha, registrarTipoFicha )
rutaTipoFicha.get('/listar', verificar, listarTipoFicha )
rutaTipoFicha.put('/actualizar/:idTipoFicha',verificar,validar_tipoFicha, actualizarTipoFicha)
rutaTipoFicha.delete('/eliminar/:idTipoFicha',verificar,  eliminarTipoFicha)


export default rutaTipoFicha