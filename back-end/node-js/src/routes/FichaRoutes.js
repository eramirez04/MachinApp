import {Router} from 'express'
import { registrarFicha, eliminarFicha, actualizarFicha, listarFicha, listarFichaUnica} from '../controllers/FichaController.js'

const rutaFicha = Router()


rutaFicha.post('/registrar', registrarFicha)
rutaFicha.get('/listar', listarFicha)

rutaFicha.delete('/eliminar/:idFicha', eliminarFicha)
rutaFicha.put('/actualizar/:idFicha', actualizarFicha)
rutaFicha.get('/listarUnica/:idFicha', listarFichaUnica)



export default rutaFicha
