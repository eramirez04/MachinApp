import { conexion } from "../database/database.js"

export const RegistraRol = async (req, res) => {

  try {
    const { nombre, descripcion } = req.body

    let sqlRol = `insert into roles (rol_nombre,rol_descripcion) values('${nombre}','${descripcion}')`
    const [resultado] = await conexion.query(sqlRol)

    if (resultado.affectedRows > 0) {
      res.status(200).json({ 'mensaje': resultado })
    } else {
      res.status = 404
      res.json({ 'Mensaje': 'Usuario no registrado' })
    }
  } catch (error) {
    return res.status(500).json({ 'Mensaje': error.menssage })
  }
}

const listarRoles = async (req, res) => {
  try {
    let sqlListar = 'select * from roles'
    const [rolesResultado] = await conexion.query(sqlListar)
    res.status = 200
    res.json({
      "Mensaje": "se ",
      "Roles": rolesResultado
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const eliminarRol = async (req, res) => {
  try {
    let idRol = req.params.id

    let sqlEliminar = `delete from roles where idRoles = '${idRol}'`

    const [resultadoEl] = await conexion.query(sqlEliminar)

    if (resultadoEl.affectedRows > 0) {
      return res.status(200).json({
        'Mensaje': 'Rol eliminado con exito',
        'database': resultadoEl
      })
    } else {
      return res.status(404).json({
        'Mensaje': 'Rol no encontrado'
      })
    }
  } catch (e) {
    res.status = 500
    res.json({
      "Mensaje": e.menssage
    })
  }
}

export const actualizarRol = async (req, res) => {
  try {
    let id = req.params.id
    const { nombre, descripcion } = req.body
    let sql = `update roles set rol_nombre = '${nombre}', rol_descripcion = '${descripcion}' where idRoles = '${id}'`

    const [resultado] = await conexion.query(sql)

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        "mensaje": "Rol actualizado con exito"
      })
    } else {
      return res.status(404).json("No se encontro Rol")
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const listarRolId = async (req, res) => {
  try {
    let id = req.params.id
    let sql = 'select * from roles where idRoles =' + id
    const [rolId] = await conexion.query(sql)
    if (rolId.length > 0) {
      res.status = 200
      res.json({
        "Rol": rolId
      })
    } else {
      res.status(404).json({ "Mensaje": "No se encontro el rol" })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default listarRoles