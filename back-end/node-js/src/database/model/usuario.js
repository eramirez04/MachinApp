import { conexion } from "../database.js";

//encriptacion de contraseña, registro de usuarios
import { encriptarContra } from "../../config/bcryptjs.js";

// clase que actuara como modelo en el sistema
export class UsuarioModel {
  getAll = async () => {
    return await conexion.query("select * from usuarios");
  };

  async getId(id) {
    const Id = id.toLowerCase();
    return await conexion.query(
      `SELECT 
      idUsuarios, us_nombre,us_apellidos,us_correo, us_imagen,us_tipo_documento, us_numero_documento, us_contrasenia ,us_especialidad ,us_empresa,rol_nombre 
      FROM usuarios 
      INNER JOIN roles ON fk_roles = idRoles where idUsuarios = ? ;`,
      [Id]
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
      us_nombre,
      us_apellidos,
      us_correo,
      us_numero_documento,
      us_tipo_documento,
      us_empresa,
      us_especialidad,
    } = dataUser;

    /* console.log(us_nombre, us_apellidos, us_correo, file); */

    const Id = idUser.toLowerCase();

    const response = await conexion.query(
      `
      update usuarios
      set
      us_nombre = ?,us_apellidos= ?,us_correo= ? , us_numero_documento = ?,  us_tipo_documento = ?,
      us_empresa= ?,
      us_especialidad = ?,
      us_imagen = '${file}'
      where idUsuarios = ? ;`,
      [
        us_nombre,
        us_apellidos,
        us_correo,
        us_numero_documento,
        us_tipo_documento,
        us_empresa,
        us_especialidad,
        Id,
      ]
    );
    return response;
  }
}
