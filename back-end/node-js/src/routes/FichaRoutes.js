import {Router} from 'express'
import { registrarFicha, eliminarFicha, actualizarFicha, listarFicha, listarFichaUnica, listarFichaPorAmbiente, listarInfoEspecifica} from '../controllers/FichaController.js'

const rutaFicha = Router()


rutaFicha.post('/registrar', registrarFicha)
rutaFicha.get('/listar', listarFicha)

rutaFicha.delete('/eliminar/:idFicha', eliminarFicha)
rutaFicha.put('/actualizar/:idFicha', actualizarFicha)
rutaFicha.get('/listarUnica/:idFicha', listarFichaUnica)

rutaFicha.get('/listarPorAmbiente/:idAmbiente', listarFichaPorAmbiente)


rutaFicha.get('/listarInfoEspecifica/:idFicha', listarInfoEspecifica )





export default rutaFicha
