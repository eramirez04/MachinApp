import zod from "zod";
const requestLoginZod = zod.object({
  correo: zod.string({ required_error: "El correo es obligatorio" }),
  contrasenia: zod
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "no",
    })
    .min(8, { message: "contraseña debe de ser minimo de 8 caracteres" }),
});

export const LoginRequest = (data) => {
  return requestLoginZod.safeParse(data);
};
