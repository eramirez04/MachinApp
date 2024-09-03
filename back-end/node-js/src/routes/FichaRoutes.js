import {Router} from 'express'
import { registrarFicha, eliminarFicha, actualizarFicha, listarFichas, listarFichaUnica, listarFichaPorAmbiente, listarInfoEspecifica, cargarImagenFicha} from '../controllers/FichaController.js'

import {validar_ficha} from '../../validar/fichas/validationFicha.js'

import {  verificar } from '../middlewares/LoginMidleware.js'


const rutaFicha = Router()


rutaFicha.post('/registrar', /* verificar, */ cargarImagenFicha, /* validar_ficha, */ registrarFicha)
rutaFicha.get('/listar',  /* verificar, */ listarFichas)



rutaFicha.delete('/eliminar/:idFicha',  verificar, eliminarFicha)
rutaFicha.put('/actualizar/:idFicha',  verificar, validar_ficha, actualizarFicha)
rutaFicha.get('/listarUnica/:idFicha', /*  verificar, */ listarFichaUnica)
rutaFicha.get('/listarPorAmbiente/:idAmbiente',  /* verificar, */ listarFichaPorAmbiente)
rutaFicha.get('/listarInfoEspecifica/:idFicha',  /* verificar, */ listarInfoEspecifica )


export default rutaFicha