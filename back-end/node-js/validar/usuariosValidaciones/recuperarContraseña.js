import zod from "zod";

const requestPasswordUserzod = zod.object({
  numero_identificacion: zod
    .string({
      required_error: "El campo es obligatorio",
      message: "El campo es obligatorio",
    })
    .min(5, { message: "El campo debe tener 5 caracteres" })
    .max(11, { message: "El campo debe de tener 11 caracteres como maximo" }),
});

export const validarNumeroDocumento = (numeroDocumento) => {
  return requestPasswordUserzod.safeParse(numeroDocumento);
};
