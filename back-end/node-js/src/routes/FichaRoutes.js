import {Router} from 'express'
import { registrarFicha, eliminarFicha, actualizarFicha, listarFicha, listarFichaUnica} from '../controllers/FichaController.js'

const rutaFicha = Router()


rutaFicha.get('/registrar', registrarFicha)
rutaFicha.post('/listar', listarFicha)

rutaFicha.delete('/eliminar/:idFicha', eliminarFicha)
rutaFicha.put('/actualizar/:idFicha', actualizarFicha)
rutaFicha.post('/listarUnica/:idFicha', listarFichaUnica)



export default rutaFicha
