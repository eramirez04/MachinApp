import { conexion } from "../database/database.js"
export const Store = async (req, res) => {
  try {
    const { nombre, apellidos, correo, numero_documento, tipo_documento, contrasenia, especialidad, empresa, rol } = req.body
    let sql = `
    INSERT INTO usuarios
     (fk_roles, us_nombre, us_apellidos, us_correo, us_numero_documento, us_tipo_documento, us_contrasenia, us_especialidad, us_empresa)
      VALUES 
     ( '${rol}','${nombre}','${apellidos}','${correo}','${numero_documento}','${tipo_documento}','${contrasenia}','${especialidad}','${empresa}'
     )
    `
    const [resultadoUser] = await conexion.query(sql)

    if (resultadoUser.affectedRows > 0) {
      res.status(200).json({
        "Mensaje": "Registro de usuario exitoso",
        resultadoUser
      })
    } else {
      return res.status(404).json({
        "Mensaje": "No se pudo registrar usuario"
      })
    }
  } catch (error) {
    return res.status(500).json({
      "Mensaje": "n", error
    })
  }
}


export const ListarUsuarios = async (req, res) => {
  try {
    let sql = "SELECT idUsuarios, us_nombre,us_apellidos,us_correo, us_tipo_documento, us_numero_documento, rol_nombre FROM usuarios INNER JOIN roles ON fk_roles = idRoles"

    const [resultadoUser] = await conexion.query(sql)

    if (resultadoUser.length > 0) {
      res.status(200).json({
        "Mensaje": "Usuarios encontrado",
        resultadoUser
      })
    }
    else {
      return res.status(404).json(
        { "Mensaje": "No se encontraron usuarios" }
      )
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const actualizarUsuario = async (req, res) => {
  try {
    let id = req.params.id
    const { nombre, apellidos, correo, numero_documento, tipo_documento, contrasenia, especialidad, empresa, rol } = req.body
    let sql = `
    update usuarios set
    fk_roles = '${rol}', us_nombre = '${nombre}', us_apellidos= '${apellidos}', us_correo= '${correo}',
    us_numero_documento= '${numero_documento}', us_tipo_documento= '${tipo_documento}', us_contrasenia= '${contrasenia}',
    us_especialidad= '${especialidad}', us_empresa = '${empresa}' where idUsuarios = '${id}' 
    `
    const [reActualizar] = await conexion.query(sql)

    if (reActualizar.affectedRows > 0) {
      res.status(200).json({
        "Mensaje": "Usuario Actualizado",
        reActualizar
      })
    }
    else {
      return res.status(404).json({
        "Mensaje": "No se encontro usuario para actulizar"
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const EliminarUsuario = async (req, res) => {
  try {
    let id = req.params.id
    let sqlDelete = `delete from usuarios where idUsuarios = ${id}`
    console.log(sqlDelete)

    const [eliminarUs] = await conexion.query(sqlDelete)
    if (eliminarUs.affectedRows > 0) {
      res.status(200).json({
        "Mensaje": "Usuario Eliminado",
        eliminarUs
      })
    } else {
      return res.status(404).json({
        "Mensaje": "Usuarios no Econtrado"
      })
    }
  } catch (error) {
    return res.status(500).json(error.menssage)
  }
}

export const ListarUsuarioId = async (req, res) => {
  try {
    let id = req.params.id
    let sqlListarId = `SELECT idUsuarios, us_nombre,us_apellidos,us_correo, us_tipo_documento, us_numero_documento, rol_nombre FROM usuarios INNER JOIN roles ON fk_roles = idRoles where idUsuarios = ${id} `

    const [resultado] = await conexion.query(sqlListarId)
    if (resultado.length > 0) {
      res.status(200).json(resultado)
    } else {
      return res.status(200).json({
        "Mensaje": "Usuario no encontrado"
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}


export const ListarTecnicos = async (req, res) => {
  try {
    let sqlListarIdT = `
    SELECT idUsuarios,us_nombre, rol_nombre FROM usuarios JOIN roles ON idRoles = fk_roles WHERE rol_nombre = 'tecnico'`

    const [resultado] = await conexion.query(sqlListarIdT)
    if (resultado.length > 0) {
      res.status(200).json(resultado)
    } else {
      return res.status(404).json({
        "Mensaje": "Usuario no encontrado"
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}