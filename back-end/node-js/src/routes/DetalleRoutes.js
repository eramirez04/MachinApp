import {Router} from 'express'

import {registrarDetalle,  listarDetalle, actualizarDetalle, eliminarDetalle} from "../controllers/DetalleController.js"

const rutaDetalle = Router()

rutaDetalle.get('/registrar', registrarDetalle)
rutaDetalle.post('/listar', listarDetalle)
rutaDetalle.put('/actualizar/:idDetalle', actualizarDetalle)
rutaDetalle.delete('/eliminar/:idDetalle', eliminarDetalle)


export default rutaDetalle