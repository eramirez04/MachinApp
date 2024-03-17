import {Router} from 'express'

import {registrarDetalle,  listarDetalle, actualizarDetalle, eliminarDetalle} from "../controllers/DetalleController.js"

const rutaDetalle = Router()

rutaDetalle.post('/registrar', registrarDetalle)
rutaDetalle.get('/listar', listarDetalle)
rutaDetalle.put('/actualizar/:idDetalle', actualizarDetalle)
rutaDetalle.delete('/eliminar/:idDetalle', eliminarDetalle)


export default rutaDetalle