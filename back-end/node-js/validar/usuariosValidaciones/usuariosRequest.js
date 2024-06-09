import zod from "zod";

const requestUsuariosZod = zod.object({
  nombre: zod
    .string({ required_error: "El nombre es requerido" })
    .min(1, { message: "El nombre es requerido" }),
  apellidos: zod.string().min(1, { message: "El apellido es requerido" }),
  correo: zod
    .string({ required_error: "El correo es requerido" })
    .email({ message: "Dirección de correo electrónico inválida" })
    .min(5, { message: "El Correo debe tener 5 o más caracteres" }),
  numero_documento: zod
    .string()
    .min(0, { message: "el numero de documento debe de ser mayor  a 0" }),
  tipo_documento: zod
    .enum(
      ["cedula de ciudadania", "tarjeta identidad", "cedula extranjeria"],
      {
        required_error: "Seleccione alguno de los tres tipos de documento",
        invalid_type_error: "Tipo de documento inválido",
      },
      { message: "Seleccione un tipo de documento" }
    )
    .optional(),
  contrasenia: zod
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "no",
    })
    .min(8, { message: "contraseña debe de ser minimo de 8 caracteres" }),
  rol: zod.string().min(1, { message: "rol invalido" }),
  empresa: zod.string().optional(),
  especialidad: zod.string().optional(),
});

export const validarUsuarios = (usuario) => {
  return requestUsuariosZod.safeParse(usuario);
};

const RequestUpdate = zod.object({
  us_nombre: zod
    .string({ required_error: "El nombre es requerido" })
    .min(1, { message: "El nombre es requerido" }),
  us_apellidos: zod.string().min(1, { message: "El apellido es requerido" }),
  us_correo: zod
    .string({ required_error: "El correo es requerido" })
    .email({ message: "Dirección de correo electrónico inválida" })
    .min(5, { message: "El Correo debe tener 5 o más caracteres" }),
  us_numero_documento: zod
    .string()
    .min(0, { message: "el numero de documento debe de ser mayor  a 0" }),
  us_tipo_documento: zod
    .enum(
      ["cedula de ciudadania", "tarjeta identidad", "cedula extranjeria"],
      {
        required_error: "Seleccione alguno de los tres tipos de documento",
        invalid_type_error: "Tipo de documento inválido",
      },
      { message: "Seleccione un tipo de documento" }
    )
    .optional(),
  rol_nombre: zod.string().min(1, { message: "rol invalido" }),
  us_empresa: zod.string().optional(),
  us_especialidad: zod.string().optional(),
});

export const validarUsuariosActualizar = (data) => {
  return RequestUpdate.safeParse(data);
};
