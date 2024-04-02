import {Router} from 'express'
import { registrarFicha, eliminarFicha, actualizarFicha, listarFicha, listarFichaUnica, listarFichaPorAmbiente} from '../controllers/FichaController.js'

const rutaFicha = Router()


rutaFicha.post('/registrar', registrarFicha)
rutaFicha.get('/listar', listarFicha)

rutaFicha.delete('/eliminar/:idFicha', eliminarFicha)
rutaFicha.put('/actualizar/:idFicha', actualizarFicha)
rutaFicha.get('/listarUnica/:idFicha', listarFichaUnica)

rutaFicha.get('/listarPorAmbiente/:idAmbiente', listarFichaPorAmbiente)



export default rutaFicha
