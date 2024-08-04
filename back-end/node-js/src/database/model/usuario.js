import { conexion } from "../database.js";

//encriptacion de contraseña, registro de usuarios
import { encriptarContra } from "../../config/bcryptjs.js";

// clase que actuara como modelo en el sistema
export class UsuarioModel {
  getAll = async () => {
    return await conexion.query("select * from usuarios");
  };

  async getId(id) {
    return await conexion.query(
      `SELECT 
      idUsuarios, us_nombre,us_apellidos,us_correo, us_imagen,us_tipo_documento, us_numero_documento, us_contrasenia ,us_especialidad ,us_empresa,rol_nombre 
      FROM usuarios 
      INNER JOIN roles ON fk_roles = idRoles where idUsuarios = ? ;`,
      [id]
    );
  }

  static async registroUsuario(input) {
    const {
      nombre,
      apellidos,
      correo,
      numero_documento,
      tipo_documento,
      contrasenia,
      especialidad,
      empresa,
      rol,
    } = input;

    // contaseña para encriptar
    const passwordCrypt = await encriptarContra(contrasenia);

    // conexion a la base de datos
    return await conexion.query(
      `INSERT INTO usuarios
      (fk_roles, us_nombre, us_apellidos, us_correo, us_numero_documento, us_tipo_documento, us_contrasenia, us_especialidad, us_empresa)
       VALUES (?,?,?,?,?,?,?,?,?);`,
      [
        rol,
        nombre,
        apellidos,
        correo,
        numero_documento,
        tipo_documento,
        passwordCrypt,
        especialidad,
        empresa,
      ]
    );
  }

  static async actualizarUser(dataUser, idUser, file) {
    const {
      nombre,
      apellidos,
      correo,
      numero_documento,
      contrasenia,
      tipo_documento,
      empresa,
      especialidad,
      rol,
    } = dataUser;
    console.log(contrasenia);

    // contaseña para encriptar
    const passwordCrypt = await encriptarContra(contrasenia);

    const Id = idUser.toLowerCase();

    const response = await conexion.query(
      `
      UPDATE usuarios
      SET
      us_nombre = ?,us_apellidos= ?,us_correo= ? , us_numero_documento = ?,
      us_contrasenia = ?,
      us_tipo_documento = ?,
      us_empresa= ?,
      us_especialidad = ?,
      us_imagen = '${file}',
      fk_roles = ?
      where idUsuarios = ? ;`,
      [
        nombre,
        apellidos,
        correo,
        numero_documento,
        passwordCrypt,
        tipo_documento,
        empresa,
        especialidad,
        rol,
        Id,
      ]
    );
    return response;
  }
}
